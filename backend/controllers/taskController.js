const taskModel = require("../models/taskModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const allTasks = await taskModel.find({});
  res.status(200).json({ status: "Success", data: { allTasks } });
  // res
  //   .status(400)
  //   .json({ status: "Failed", message: "Unable to get all tasks!" });
});
exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = await taskModel.create(req.body);
  if (!newTask) {
    return next("Unable to create the task!!", 400);
  }
  res.status(201).json({ status: "Success", data: { newTask } });
  // res.status(400).json({ status: "Failed", message: err });
});
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await taskModel.findById(req.params.id);
  if (!task) {
    return next(new appError("No task found with that ID!!", 404));
  }
  res.status(200).json({ status: "Success", data: { task } });
  // res.status(400).json({ status: "Failed", message: "Invalid task id!" });
});
exports.updateTask = catchAsync(async (req, res, next) => {
  const updatedTask = await taskModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!updatedTask) {
    return next(new appError("No task found with that ID!!", 404));
  }
  res.status(200).json({ status: "Success", data: { updatedTask } });
  // res.status(404).json({ status: "Failed", message: err });
});
exports.deleteTask = catchAsync(async (req, res, next) => {
  const deleteTask = await taskModel.findByIdAndDelete(req.params.id);
  if (!deleteTask) {
    return next(new appError("No task found with that ID!!", 404));
  }
  res.status(204).json({
    status: "Success",
    message: null,
  });
  // res.status(404).json({ status: "Failed", message: err });
});
