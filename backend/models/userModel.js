const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
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
      validate: [validator.isEmail, "Please enter a valid email!!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
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
    passwordChangedAt: Date,
  },
  { timestamps: true, minimize: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async (userPassword, correctPassword) => {
  return await bcrypt.compare(userPassword, correctPassword);
};

userSchema.methods.checkResetPassword = function (JwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JwtTimestamp;
  }
  return false;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
