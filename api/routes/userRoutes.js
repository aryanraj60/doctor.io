import expresss from "express";
import {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getApprovedDoctorsController,
  getDoctorByIdController,
  bookDoctorAppointmentController,
  bookingAvailabilityController,
  getUserAppointmentsController,
} from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

//Router Object

const userRouter = expresss.Router();

//Routes

//Login || POST

userRouter.post("/login", loginController);

//Register || POST

userRouter.post("/register", registerController);

//Get User's Data || POST

userRouter.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST

userRouter.post("/apply-doctor", authMiddleware, applyDoctorController);

//Get Approved Doctor || GET

userRouter.get(
  "/getApprovedDoctors",
  authMiddleware,
  getApprovedDoctorsController
);

// Get Doctor By ID || POST

userRouter.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// Book Doctor Appointment || POST

userRouter.post(
  "/book-doctor-appointment",
  authMiddleware,
  bookDoctorAppointmentController
);

// Check Booking Availability || POST

userRouter.post(
  "/check-booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

// Get User Appointments || GET

userRouter.get(
  "/getUserAppointments",
  authMiddleware,
  getUserAppointmentsController
);

export { userRouter };
