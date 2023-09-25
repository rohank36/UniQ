const mongoose = require("mongoose");

const profSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email required"],
    lowercase: true,
  },
  profAccessCode: {
    type: String,
    unique: true,
    trim: true,
  },
  joinCode: {
    type: String,
    unique: true,
    trim: true,
  },
  ohStarted: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
  },
  courseCode: {
    type: String,
    unique: true,
    required: [true, "Course Code required"],
  },
  courseName: {
    type: String,
    unique: true,
    required: [true, "Course Name Required"],
  },
  queue: {
    type: [String],
    default: [],
  },
});

const Prof = mongoose.model("Prof", profSchema);
module.exports = Prof;
