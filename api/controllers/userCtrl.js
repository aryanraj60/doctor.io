import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import moment from "moment";

const salt = bcrypt.genSaltSync(10);

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await userModel.findOne({ email });

    if (userDoc) {
      const isCorrect = bcrypt.compareSync(password, userDoc.password);

      if (isCorrect) {
        const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res
          .status(200)
          .json({ success: true, message: "Login successful", token });
      } else {
        res.status(200).json({ success: false, message: "Wrong password" });
      }
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
};

const registerController = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const userDoc = await userModel.findOne({ email });
    if (userDoc) {
      return res
        .status(200)
        .json({ success: false, message: "user already registered" });
    }
    const hashedPass = bcrypt.hashSync(password, salt);
    await userModel.create({
      name,
      password: hashedPass,
      email,
    });
    res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });

    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        message: "User found",
        success: true,
        data: { ...user._doc, password: null },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "auth error", error: e, success: false });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const doctorDoc = await doctorModel.findOne({ userId: req.body.userId });
    if (doctorDoc) {
      return res
        .status(200)
        .send({ success: false, message: "You have already been applied." });
    }
    const newDoctor = await doctorModel.create({
      ...req.body,
      status: "pending",
    });
    const admin = await userModel.findOne({ isAdmin: true });
    const notifications = admin.notifications;
    notifications.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has been applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(admin._id, { notifications });
    res.status(201).send({
      success: true,
      message: "Applied to doctor account successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error While Applying Doctor",
      error: e,
      success: false,
    });
  }
};

const getApprovedDoctorsController = async (req, res) => {
  try {
    const approvedDoctors = await doctorModel.find({ status: "approved" });
    if (approvedDoctors) {
      res.status(200).json({
        message: "Approved Doctors List",
        success: true,
        data: approvedDoctors,
      });
    } else {
      res
        .status(200)
        .send({ message: "No Approved Doctor Found", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error getting approved Doctors",
      success: false,
      error: err,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  const { doctorId } = req.body;
  try {
    const doctorDoc = await doctorModel.findOne({ userId: doctorId });
    if (doctorDoc) {
      res.status(200).json({
        message: "Doctor Fetched Successfully",
        success: true,
        data: doctorDoc,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error gettingdoctor by id",
      error: err,
      success: false,
    });
  }
};

const bookDoctorAppointmentController = async (req, res) => {
  const { appointmentDetails } = req.body;

  try {
    const { userId, doctorId } = appointmentDetails;

    const userDetail = await userModel.findOne({ _id: userId });
    if (userDetail.isDoctor) {
      return res.status(200).send({
        message: "Sorry! Doctor can not book appointments.",
        success: false,
      });
    }
    const userAppointment = await appointmentModel.findOne({
      userId,
      doctorId,
    });
    if (userAppointment) {
      return res.status(200).send({
        message: "You already have a appointment with the doctor",
        success: false,
      });
    }
    appointmentDetails.status = "pending";
    appointmentDetails.date = moment(
      appointmentDetails.date,
      "YYYY-MM-DD"
    ).toISOString();
    appointmentDetails.time = moment(
      appointmentDetails.time,
      "HH:mm"
    ).toISOString();
    const appointmentDoc = await appointmentModel.create(appointmentDetails);
    const userDoc = await userModel.findOne({
      _id: appointmentDetails.doctorId,
    });
    userDoc.notifications.push({
      type: "new-appointment-request",
      message: `New Appointment Request from ${appointmentDetails.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await userDoc.save();
    res
      .status(200)
      .send({ message: "Appointments booked successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error while booking appointment",
      success: false,
      error: err,
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "YYYY-MM-DD").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId: doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    console.log("Appointments", appointments);
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointment is not available at this time.",
        success: false,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Appointment is available", success: true });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error while checking availability",
      error: err,
      success: false,
    });
  }
};

const getUserAppointmentsController = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId: userId });
    res.status(200).json({
      message: "User Appointments List",
      success: true,
      data: appointments,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Error getting user Appointments", success: false });
  }
};

export {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getApprovedDoctorsController,
  getDoctorByIdController,
  bookDoctorAppointmentController,
  bookingAvailabilityController,
  getUserAppointmentsController,
};
