const mongoose = require("mongoose");

const studSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    trim: true,
    unique: true,
  },
  joinCode: {
    type: String,
    required: [true, "Enter a valid join code"],
  },
  inQueue: {
    type: Boolean,
    default: false,
  },
  queuePosition: {
    type: Number,
    default: -1,
  },
});

const Stud = mongoose.model("Stud", studSchema);
module.exports = Stud;
