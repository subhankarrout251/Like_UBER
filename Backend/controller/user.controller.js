const blacklisttokenModel = require("../models/blacklisttoken.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullname, email, password } = req.body;
  const userExit = await userModel.findOne({ email });
  if (userExit) {
    return res.status(400).json({ error: "User already exist" });
  }

  const hashPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //
  });

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ message: "No user data found" });
  }
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklisttokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
};
