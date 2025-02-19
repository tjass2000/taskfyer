const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      time: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    photo: {
      type: String,
    },
    bio: {
      type: "String",
      default: "Hi, I'm a new user.",
    },
    role: {
      type: "String",
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: true }
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("users", userModel);

module.exports = User;
