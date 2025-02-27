const appError = require("../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new appError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let fieldVal = err.errmsg.match(/(["'])(\\?.)*\1/);
  const message = `Duplicate field value: ${fieldVal[0]}. Please use another value!!`;
  return new appError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new appError(message, 400);
};

const handleJWTError = (err) => {
  const message = "Invalid jwt token!! Please login again.";
  return new appError(message, 401);
};

const handleTokenExpError = (err) => {
  const message = "Token expired!! Please login again.";
  return new appError(message, 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res
      .status(error.statusCode)
      .json({ status: error.status, message: error.message });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Something went wrong!!" });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = err;
    if (error.name === "CastError") {
      error = handleCastError(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationError(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleTokenExpError(error);
    }
    sendErrorProd(error, res);
  }
};
