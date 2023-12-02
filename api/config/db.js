import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log("DB_ERROR: " + err.message);
  }
};

export default connectDB;
