const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");

const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid request", error: error.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isCaptinAlreadyPresent = await captainModel.findOne({ email });
  if (isCaptinAlreadyPresent) {
    return res.status(400).json({ message: "Captain already present" });
  }
  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vechileType: vehicle.vechileType,
  });
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};
