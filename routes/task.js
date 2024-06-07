import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASK,
} from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, NEW_TASK);

router.get("/my", isAuthenticated, GET_TASK);

router
  .route("/:id")
  .put(isAuthenticated, UPDATE_TASK)
  .delete(isAuthenticated, DELETE_TASK);

export default router;
