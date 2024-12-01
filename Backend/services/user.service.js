const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all the fields");
  }
  const user = userModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
  });
  return user;
};
