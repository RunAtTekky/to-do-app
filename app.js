import express from "express";
import userRouter from "./routes/user.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("WoW");
});

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
