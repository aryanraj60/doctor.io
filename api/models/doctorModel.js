import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email id is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    speciality: {
      type: String,
      required: [true, "Specialty is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    feePerConsult: {
      type: Number,
      required: [true, "Fee per consultancy is required"],
    },
    timing: {
      type: Object,
      required: [true, "Work time is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
