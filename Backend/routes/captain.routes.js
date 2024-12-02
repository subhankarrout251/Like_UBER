const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 character"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color name most be 3"),
    body("vehicle.vechileType")
      .isIn(["car", "bike", "auto"])
      .withMessage("this type not allowed"),
  ],
  captainController.registerCaptain
);

module.exports = router;
