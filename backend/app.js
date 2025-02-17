const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);

module.exports = app;
