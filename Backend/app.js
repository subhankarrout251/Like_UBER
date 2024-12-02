const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db");
const userRouts = require("./routes/user.routes");
const captainRouts = require("./routes/captain.routes");

const cookiParser = require("cookie-parser");
dotenv.config();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/users", userRouts);
app.use("/captain", captainRouts);

module.exports = app;
