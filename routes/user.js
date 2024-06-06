import express from "express";
import {
  GET_ALL_USERS,
  NEW_USER,
  GET_DATA_BY_ID,
  UPDATE_USER,
  DELETE_USER,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", GET_ALL_USERS);

router.post("/new", NEW_USER);

router
  .route("/userId/:id")
  .get(GET_DATA_BY_ID)
  .put(UPDATE_USER)
  .delete(DELETE_USER);

export default router;
