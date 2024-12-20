const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controller/user.controller");
const authmiddlewares = require("../middlewares/auth.middleware");

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
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character"),
  ],
  userController.loginUser
);

router.get("/profile", authmiddlewares.authUser, userController.getUserProfile);

router.get("/logout", authmiddlewares.authUser, userController.logoutUser);
module.exports = router; //export the router
