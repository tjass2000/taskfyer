const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  messsage: "Too many requests from this IP, please try in an hour!!",
});

//Rate limiter
app.use("/api", limiter);

//Set security HTTP headers
app.use(helmet());

app.use(express.json({ limit: "10kb" }));

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
