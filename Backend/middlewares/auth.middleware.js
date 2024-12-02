const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackList = await userModel.findOne({ token: token });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Decoded Token:", decoded);
    const user = await userModel.findOne(decoded._id);
    // console.log("User fetched:", user);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
