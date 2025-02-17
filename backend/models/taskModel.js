const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be empty!"],
    },
    description: {
      type: String,
      default: "No description",
    },
    duedate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;
