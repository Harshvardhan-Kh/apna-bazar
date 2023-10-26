import express from "express";
import dotenv from "dotenv";
import mongoose, { model } from "mongoose";
import userSchema from "./models/User.js";

dotenv.config();

const app = express();

app.use(express.json());

const connectDb = () => {
  const conn = mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("mongoDB connection susccesfull");
  }
};

const User = model("User", userSchema);



app.listen(
  process.env.PORT || 5000,
  console.log(`server is listening on port 5000`)
);
connectDb();
