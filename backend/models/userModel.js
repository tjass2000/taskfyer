const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: ["Email address is required", true],
    unique: true,
  },
  password: {
    type: String,
    required: ["Password is required", true],
  },
});

const User = mongoose.model("users", userModel);

module.exports = User;
