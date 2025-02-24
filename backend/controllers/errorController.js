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

const sendErrorDev = (err, res) => {
  res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message, stack: err.stack });
};

const sendErrorProd = (error, res) => {
  res
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
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
    sendErrorProd(error, res);
  }
};
