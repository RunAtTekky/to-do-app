import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend_api",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
  res.send("WoW");
});

app.get("/users/all", async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
});

app.post("/users/new", async (req, res) => {
  await User.create({
    name: "Annu",
    email: "Annu@google.com",
    password: "RunAt",
  });

  res.json({
    success: true,
    message: "Registered Successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
