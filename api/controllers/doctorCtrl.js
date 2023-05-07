import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

//Get Doctor Info
const getDoctorDetailsController = async (req, res) => {
  const { userId } = req.body;

  try {
    const doctorDoc = await doctorModel.findOne({ userId });
    if (doctorDoc) {
      res
        .status(200)
        .json({ message: "Doctor found", data: doctorDoc, success: true });
    } else {
      res.status(200).send({ message: "Doctor not found", success: false });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Error gettingDoctor", error: err, success: false });
  }
};

//Update Doctor Details

const updateDoctorDetailsController = async (req, res) => {
  try {
    const { userId, doctorDetail } = req.body;

    const updateDoctorDoc = await doctorModel.findOneAndUpdate(
      { userId },
      doctorDetail
    );
    res.status(200).send({
      message: "Doctor details updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error updating DoctorDetails",
      success: false,
      error: err,
    });
  }
};

const updateAppointmentStatusController = async (req, res) => {
  const { appointmentId, status } = req.body;
  try {
    const appointmentDoc = await appointmentModel.findById({
      _id: appointmentId,
    });
    appointmentDoc.status = status;
    const userDoc = await userModel.findById({ _id: appointmentDoc.userId });
    const notifications = userDoc.notifications;
    notifications.push({
      type: "appointment-status-update",
      message: `${appointmentDoc.doctorInfo.firstName} ${
        appointmentDoc.doctorInfo.lastName
      } has ${
        status === "approved" ? "approved" : "rejected"
      } your appointment request.`,
      data: {
        doctorId: appointmentDoc.doctorInfo.doctorId,
        name: `${appointmentDoc.doctorInfo.firstName} ${appointmentDoc.doctorInfo.lastName}`,
        onClickPath: "/appointments",
      },
    });
    await userDoc.save();
    await appointmentDoc.save();
    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error updating AppointmentStatus",
      error: err,
      success: false,
    });
  }
};

//Get Doctor Appointments

const getDoctorAppointmentsByIdController = async (req, res) => {
  const { userId } = req.body;
  try {
    const doctorAppointments = await appointmentModel.find({
      doctorId: userId,
    });
    res.status(200).send({
      message: "Doctor Appointments fetched successfully",
      success: true,
      data: doctorAppointments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error gettingDoctorAppointments",
      error: err,
      success: false,
    });
  }
};

export {
  getDoctorDetailsController,
  updateDoctorDetailsController,
  updateAppointmentStatusController,
  getDoctorAppointmentsByIdController,
};
