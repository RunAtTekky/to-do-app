import express from "express";
import {
  GET_ALL_USERS,
  NEW_USER,
  GET_DATA_BY_ID,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", GET_ALL_USERS);

router.post("/new", NEW_USER);

router.get("/userId/:id", GET_DATA_BY_ID);

export default router;
