import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
});

router.post("/new", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
  });
});

router.get("/userId/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
});

export default router;
