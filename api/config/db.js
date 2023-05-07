import mongoose from "mongoose";

const connectDB = () => {
  const url = process.env.MONGODB_URL;
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((e) => {
      console.log("Error connecting to Mongo", e);
    });
};

export default connectDB;
