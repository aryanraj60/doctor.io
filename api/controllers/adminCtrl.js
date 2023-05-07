import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//Notfication Controller

const getAllNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotifications = user.seenNotifications;
    const notifications = user.notifications;
    seenNotifications.push(...notifications);
    user.notifications = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications are marked as read.",
      data: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "An error occurred while getting the notification",
      error: e,
    });
  }
};

//Delete Notifications Controller

const deleteNotificationsController = async (req, res) => {
  try {
    const admin = await userModel.findById({ _id: req.body.userId });
    admin.seenNotifications = [];
    await admin.save();
    admin.password = null;

    res.status(200).send({
      message: "All notifications are deleted.",
      success: true,
      data: admin,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error deleting notifications",
      error: e,
      success: false,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find({ isAdmin: false });
    if (allUsers) {
      res
        .status(200)
        .json({ message: "All Users List", data: allUsers, success: true });
    } else {
      res.status(200).send({ message: "No users found", success: false });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Error while getting users", error: e, success: false });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const allDoctors = await doctorModel.find({});
    if (allDoctors) {
      res
        .status(200)
        .json({ message: "All Users List", data: allDoctors, success: true });
    } else {
      res.status(200).send({ message: "No users found", success: false });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Error while getting users", error: e, success: false });
  }
};

const approveDoctorController = async (req, res) => {
  const { doctorId } = req.body;

  try {
    const doctorDoc = await doctorModel.findOne({ userId: doctorId });
    doctorDoc.status = "approved";
    const userDoc = await userModel.findOne({ _id: doctorId });
    const notifications = userDoc.notifications;
    notifications.push({
      type: "doctor-account-approved",
      message: "Your doctor account has been approved",
      onClickPath: "/notifications",
    });
    userDoc.isDoctor = true;
    await doctorDoc.save();
    await userDoc.save();
    res
      .status(200)
      .send({ success: true, message: "Doctor is approved successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while approving doctor",
      error: e,
    });
  }
};

//Disapporve Doctor

const disapproveDoctorController = async (req, res) => {
  const { doctorId } = req.body;
  try {
    const doctorDoc = await doctorModel.findOne({ userId: doctorId });
    doctorDoc.status = "rejected";
    const userDoc = await userModel.findOne({ _id: doctorId });
    const notifications = userDoc.notifications;
    notifications.push({
      type: "doctor-account-disapproved",
      message: "Your request for doctor account has been rejected",
      onClickPath: "/notifications",
    });
    userDoc.isDoctor = false;
    await doctorDoc.save();
    await userDoc.save();
    res
      .status(200)
      .send({ success: true, message: "Doctor is disapporved successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while disapproving doctor",
      error: e,
    });
  }
};

export {
  getAllUsersController,
  getAllNotificationsController,
  deleteNotificationsController,
  getAllDoctorsController,
  approveDoctorController,
  disapproveDoctorController,
};
