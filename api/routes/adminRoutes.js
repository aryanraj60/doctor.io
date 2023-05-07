import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getAllUsersController,
  getAllNotificationsController,
  deleteNotificationsController,
  getAllDoctorsController,
  approveDoctorController,
  disapproveDoctorController,
} from "../controllers/adminCtrl.js";

const adminRouter = express.Router();

//Notifications Doctor || POST

adminRouter.post(
  "/get-all-notifications",
  authMiddleware,
  getAllNotificationsController
);

//Delete Notifications Doctor || POST
adminRouter.post(
  "/delete-notifications",
  authMiddleware,
  deleteNotificationsController
);

//Get Method || Get Users

adminRouter.get("/getAllUsers", authMiddleware, getAllUsersController);

//Get Method || Get Doctors
adminRouter.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST Method || Approve Doctor

adminRouter.post("/approveDoctor", authMiddleware, approveDoctorController);

//POST Method || DisapproveDoctor

adminRouter.post(
  "/disapproveDoctor",
  authMiddleware,
  disapproveDoctorController
);

export { adminRouter };
