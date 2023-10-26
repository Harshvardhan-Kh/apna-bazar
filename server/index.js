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

app.post("/signup", async (req, res) => {
  try {
    const { name, password, email, mobile, address, gender } = req.body;
    const newUser = new User({
      name,
      password,
      email,
      mobile,
      address,
      gender,
    });

    const saveUser = await newUser.save();
    return res.json({
      sucsess: true,
      message: "signup successed ",
      data: saveUser,
    });
  } catch (e) {
    return res.json({
      sucsess: false,
      message: e.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const loginFind = await User.findOne({ email, password }).select(
    "name email gender mobile"
  );

  if (!loginFind) {
    return res.json({
      sucsess: false,
      message: "invalid credentials",
    });
  }

  return res.json({
    sucsess: true,
    message: "Login successful",
    data: loginFind,
  });
});

app.listen(
  process.env.PORT || 5000,
  console.log(`server is listening on port 5000`)
);
connectDb();
