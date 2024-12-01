const mongoose = require("mongoose");
require("dotenv").config(); // Ensure to load environment variables

const mongoURL = process.env.MONGODB_URL;

function connectDB() {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));
}
module.exports = connectDB;
