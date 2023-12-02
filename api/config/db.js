import { MongoClient } from "mongodb";

const connectDB = () => {
  const url = process.env.MONGODB_URL;
  const client = new MongoClient(url);
  client
    .connect()
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((e) => {
      console.log("Error connecting to Mongo", e);
    });
};

export default connectDB;
