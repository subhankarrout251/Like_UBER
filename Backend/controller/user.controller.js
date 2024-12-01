const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullname, email, password } = req.body;
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
