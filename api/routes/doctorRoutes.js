import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getDoctorDetailsController,
  updateDoctorDetailsController,
  updateAppointmentStatusController,
  getDoctorAppointmentsByIdController,
} from "../controllers/doctorCtrl.js";

const doctorRouter = express.Router();

//Get || Doc Details
doctorRouter.get(
  "/getDoctorDetails",
  authMiddleware,
  getDoctorDetailsController
);

//Post || Update Doc Details
doctorRouter.post(
  "/updateDoctorDetails",
  authMiddleware,
  updateDoctorDetailsController
);

doctorRouter.post(
  "/updateAppointmentStatus",
  authMiddleware,
  updateAppointmentStatusController
);

doctorRouter.get(
  "/getDoctorAppointmentsById",
  authMiddleware,
  getDoctorAppointmentsByIdController
);

export { doctorRouter };
