const { promisify } = require("util");
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
  if (!user) {
    return next(new appError("No user found with that ID!!", 404));
  }
  res.status(200).json({ status: "Success", data: { user } });
  // res.status(400).json({ status: "Failed", message: "Invalid user id!" });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await Users.create(req.body);
  const token = sendToken(newUser._id);
  res.status(201).json({ status: "Success", token, data: { newUser } });
  // res.status(400).json({ status: "Failed", message: err });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
  if (!updatedUser) {
    return next(new appError("No user found with that ID!!", 404));
  }
  res.status(200).json({ status: "Success", data: { updatedUser } });
  // res.status(404).json({ status: "Failed", message: err });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await Users.findByIdAndDelete(req.params.id);
  if (!deleteUser) {
    return next(new appError("No user found with that ID!!", 404));
  }
  res.status(204).json({
    status: "Success",
    message: null,
  });
  // res.status(404).json({ status: "Failed", message: err });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("Please provide an email and password!!", 400));
  }
  const user = await Users.findOne({ email }).select("+password");
  const isPassCorrect = await user.correctPassword(password, user.password);
  const token = sendToken(user.id);
  if (!user || !isPassCorrect) {
    return next(new appError("Incorrect Email or Password!!", 400));
  }
  res.status(200).json({ status: "success", token });
  // res
  //   .status(400)
  //   .json({ status: "error", message: "Unable to login the user!!" });
});

exports.protect = catchAsync(async (req, res, next) => {
  //Fetching token and verifying if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new appError("You are not logged in!! Please log in to get access.", 401)
    );
  }
  //Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //Check if user still exists
  const user = await Users.findById(decoded.id);
  if (!user) {
    return next(
      new appError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (user.checkResetPassword(decoded.iat)) {
    return next(
      new appError(
        "User has recently changed password! Please login again.",
        401
      )
    );
  }
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError("You are not authorized to access this route!!", 403)
      );
    }
    next();
  };
};
