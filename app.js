import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_FIRST, process.env.FRONTEND_URL_SECOND],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

console.log(`I am using ${process.env.FRONTEND_URL}`);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("WoW");
});

app.use(errorMiddleware);
