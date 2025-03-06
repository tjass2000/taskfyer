const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const sendToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = sendToken(user._id);
  res.status(statusCode).json({ status: "success", token, data: { user } });
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
  createSendToken(newUser, 201, res);
  // const token = sendToken(newUser._id);
  // res.status(201).json({ status: "Success", token, data: { newUser } });
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
  // const token = sendToken(user.id);
  if (!user || !isPassCorrect) {
    return next(new appError("Incorrect Email or Password!!", 400));
  }
  createSendToken(user, 200, res);
  // res.status(200).json({ status: "success", token });
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return next(new appError("User does not exist!", 404));
  }
  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Send it to user's email
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Please submit the reset password request with your new password to: ${resetPasswordUrl}.\n 
  If you didn't forget your password, please ignore this email! `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token! (Expires in 10 minutes)",
      message,
    });
    res
      .status(200)
      .json({ status: "success", message: "Token send to mail!!" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExp = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new appError(
        "There was an error sending the email. Please try after later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get the user based on the token
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await Users.findOne({
    passwordResetToken: token,
    passwordResetTokenExp: { $gt: Date.now() },
  });
  //Set new password if user exits and token is not expired
  if (!user) {
    return next(new appError("The token is invalid or has expired!!", 400));
  }
  //Update changePasswordAt property for the user
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  await user.save();
  //Log the user in, send the JWT
  const loginToken = sendToken(user._id);
  res.status(200).json({ status: "success", loginToken });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get user from collection
  const user = await Users.findById(req.user.id).select("+password");
  //Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new appError("Your current password is incorrect!!", 401));
  }
  //If so, update password
  user.password = req.body.password;
  await user.save();
  //Log user in, send jwt
  createSendToken(user, 200, res);
});
