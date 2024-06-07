import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { sendCookie } from "../utils/features.js";

export const LOGIN = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, `Welcome Back, ${user.name}, `, 200);
  } catch (error) {
    next(error);
  }
};

export const REGISTER = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 404));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
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
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "User Logged Out",
    });
};
