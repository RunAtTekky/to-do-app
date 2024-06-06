import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/users", userRouter);

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend_api",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("WoW");
});

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
