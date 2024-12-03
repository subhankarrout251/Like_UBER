const blacklisttokenModel = require("../models/blacklisttoken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      message: "Invalid request",
      error: error.array(),
    });
  }

  const { fullname, email, password, vehicle, location } = req.body;

  try {
    // Check if captain with the same email already exists
    const isCaptainAlreadyPresent = await captainModel.findOne({ email });
    if (isCaptainAlreadyPresent) {
      return res.status(400).json({ message: "Captain already present" });
    }

    // Hash password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a captain using the service layer
    const captain = await captainService.createCaptain({
      firstName: fullname.firstName,
      lastName: fullname.lastName,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
      lat: location.lat,
      longi: location.longi,
    });

    // Generate an auth token for the captain
    const token = captain.generateAuthToken(); // Make sure this method is defined in your model

    // Return the response with the token and captain details
    res.status(201).json({ token, captain });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isValidPassword = await captain.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //
  });
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  if (!req.captain) {
    return res.status(401).json({ message: "no data Found" });
  }
  res.status(200).json(req.captain);
};

module.exports.getLogout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklisttokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
