const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const sendToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await Users.find({});
  res.status(200).json({ status: "Success", data: { allUsers } });
  // res
  //   .status(400)
  //   .json({ status: "Failed", message: "Unable to get all users!" });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  res.status(200).json({ status: "Success", data: { user } });
  // res.status(400).json({ status: "Failed", message: "Invalid user id!" });
});

exports.createUser = catchAsync(async (req, res, next) => {
  if (req.body) {
    const newUser = await Users.create(req.body);
    const token = sendToken(newUser._id);
    res.status(201).json({ status: "Success", token, data: { newUser } });
  }
  // res.status(400).json({ status: "Failed", message: err });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ status: "Success", data: { updatedUser } });
  // res.status(404).json({ status: "Failed", message: err });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "Success",
    message: null,
  });
  // res.status(404).json({ status: "Failed", message: err });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new appError("Please provide an email and password!!", 400);
  }
  const user = await Users.findOne({ email }).select("+password");
  const isPassCorrect = await user.correctPassword(password, user.password);
  const token = sendToken(user.id);
  if (!user || !isPassCorrect) {
    return appError("Incorrect Email or Password!!", 400);
  }
  res.status(200).json({ status: "success", token });
  // res
  //   .status(400)
  //   .json({ status: "error", message: "Unable to login the user!!" });
});
