const Users = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.status(200).json({ status: "Success", data: { allUsers } });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Failed", message: "Unable to get all users!" });
  }
};

exports.createUser = async (req, res) => {
  try {
    if (req.body) {
      const newUser = await Users.create(req.body);
      res.status(201).json({ status: "Success", data: { newUser } });
    }
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "Success", data: { updatedUser } });
  } catch (err) {
    res.status(404).json({ status: "Failed", message: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      message: null,
    });
  } catch (err) {
    res.status(404).json({ status: "Failed", message: err });
  }
};
