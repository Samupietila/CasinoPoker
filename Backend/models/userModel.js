// Model for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    funds: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
