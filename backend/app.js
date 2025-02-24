const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const appError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

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

app.use(globalErrorHandler);

module.exports = app;
