const { models } = require("mongoose");
const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vechileType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vechileType
  ) {
    throw new Error("All finds are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
    vechile: {
      color,
      plate,
      capacity,
      vechileType,
    },
  });
  return captain;
};
