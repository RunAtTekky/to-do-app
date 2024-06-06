import { User } from "../models/user.js";

export const GET_ALL_USERS = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};

export const NEW_USER = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
  });
};

export const GET_DATA_BY_ID = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
};
