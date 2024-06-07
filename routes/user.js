import express from "express";
import {
  REGISTER,
  LOGIN,
  GET_MY_PROFILE,
  LOGOUT,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", REGISTER);
router.post("/login", LOGIN);

router.get("/me", isAuthenticated, GET_MY_PROFILE);
router.get("/logout", LOGOUT);

export default router;
