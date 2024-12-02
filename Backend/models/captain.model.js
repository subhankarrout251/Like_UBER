const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name Length most be more then 3 "],
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Password Length must be more then 8"],
  },
  SocketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,

      require: true,
    },
    plate: {
      type: String,
      require: true,
    },
    capacity: {
      type: Number,
      require: true,
    },
    vehicleType: {
      type: String,
      require: true,
      enum: ["car", "bike", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    longi: {
      type: Number,
    },
  },
});

//Generate token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

//Compare password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Hash password
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
