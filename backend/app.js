const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const appError = require("./utils/appError");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || "error";
  return res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message });
});

module.exports = app;
