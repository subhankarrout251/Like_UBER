const mongoose = require("mongoose");
const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  // Optional: Basic email validation (regex)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email && !emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  try {
    // Create new captain entry
    const captain = await captainModel.create({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password, // Consider hashing the password before saving it
      vechile: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    return captain;
  } catch (error) {
    // Handle any errors during the create operation
    throw new Error(`Error creating captain: ${error.message}`);
  }
};
