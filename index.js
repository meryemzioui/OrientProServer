const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const studentRoute = require("./routes/studentRoute");
const createStudentRoute = require("./routes/createStudentRoute");
var cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/students", studentRoute);
app.use("/student", createStudentRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port:", process.env.PORT);
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));
