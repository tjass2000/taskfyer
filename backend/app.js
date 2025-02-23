const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const appError = require("./utils/appError");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);

app.all("*", (req, res, next) => {
  const err = new appError(
    `Can't find original url ${req.originalUrl} on this server!!`
  );
  err.status = "failed";
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || "error";
  return res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message });
});

module.exports = app;
