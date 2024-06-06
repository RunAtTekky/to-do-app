import mongoose from "mongoose";

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

export const User = mongoose.model("User", schema);
