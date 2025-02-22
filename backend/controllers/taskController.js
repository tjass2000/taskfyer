const taskModel = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
exports.getAllTasks = catchAsync(async (req, res) => {
  const allTasks = await taskModel.find({});
  res.status(200).json({ status: "Success", data: { allTasks } });
  res
    .status(400)
    .json({ status: "Failed", message: "Unable to get all tasks!" });
});
exports.createTask = catchAsync(async (req, res) => {
  if (req.body) {
    const newTask = await taskModel.create(req.body);
    res.status(201).json({ status: "Success", data: { newTask } });
  }
  // res.status(400).json({ status: "Failed", message: err });
});
exports.getTask = catchAsync(async (req, res) => {
  const user = await taskModel.findById(req.params.id);
  res.status(200).json({ status: "Success", data: { user } });
  // res.status(400).json({ status: "Failed", message: "Invalid task id!" });
});
exports.updateTask = catchAsync(async (req, res) => {
  const updatedTask = await taskModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json({ status: "Success", data: { updatedTask } });
  // res.status(404).json({ status: "Failed", message: err });
});
exports.deleteTask = catchAsync(async (req, res) => {
  const deleteTask = await taskModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "Success",
    message: null,
  });
  // res.status(404).json({ status: "Failed", message: err });
});
