const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
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
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("this type not allowed"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);
router.get("/logout", authMiddleware.authCaptain, captainController.getLogout);

module.exports = router;
