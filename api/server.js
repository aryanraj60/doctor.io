import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { doctorRouter } from "./routes/doctorRoutes.js";

dotenv.config();

//rest object

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//MongoDB Connection

//apis Routes

app.get("/api/v1/test", (req, res) => {
  res.status(200).send({ message: "Everything is good!" });
});

app.use("/api/v1/users", userRouter);

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/doctor", doctorRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(
    `Server started in ${process.env.NODE_MODE} and listening on port ${process.env.PORT}`
      .red
  );
});
