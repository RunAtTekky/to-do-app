import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const GET_ALL_USERS = async (req, res) => {};

export const LOGIN = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  sendCookie(user, res, `Welcome Back, ${user.name}, `, 200);
};

export const REGISTER = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered Successfully", 201);
};

export const GET_MY_PROFILE = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const LOGOUT = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out",
    });
};
