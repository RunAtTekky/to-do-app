import { Task } from "../models/task.js";

export const NEW_TASK = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const UPDATE_TASK = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Message Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const DELETE_TASK = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const GET_TASK = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
