const taskModel = require("../models/taskModel");
exports.getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskModel.find({});
    res.status(200).json({ status: "Success", data: { allTasks } });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Failed", message: "Unable to get all tasks!" });
  }
};
exports.createTask = async (req, res) => {
  try {
    if (req.body) {
      const newTask = await taskModel.create(req.body);
      res.status(201).json({ status: "Success", data: { newTask } });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};
exports.getTask = async (req, res) => {
  try {
    const user = await taskModel.findById(req.params.id);
    res.status(200).json({ status: "Success", data: { user } });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: "Invalid task id!" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: "Success", data: { updatedTask } });
  } catch (err) {
    res.status(404).json({ status: "Failed", message: err });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const deleteTask = await taskModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      message: null,
    });
  } catch (err) {
    res.status(404).json({ status: "Failed", message: err });
  }
};
