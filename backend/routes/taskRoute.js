const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.protect, taskController.getAllTasks)
  .post(userController.protect, taskController.createTask);

router
  .route("/:id")
  .get(userController.protect, taskController.getTask)
  .put(userController.protect, taskController.updateTask)
  .delete(userController.protect, taskController.deleteTask);

module.exports = router;
