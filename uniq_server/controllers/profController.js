const { json } = require("express");
const Prof = require("../models/profModel");
const Stud = require("../models/studModel");

const dbEventEmitter = require("../dbEventEmitter");

exports.getProf = async (req, res) => {
  try {
    const prof = await Prof.findOne({ profAccessCode: req.body.accessCode });

    if (prof) {
      res.status(200).json({
        status: "success",
        prof,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Prof not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.addProf = async (req, res) => {
  try {
    const newProf = await Prof.create(req.body);
    if (newProf) {
      res.status(200).json({
        status: "success",
        newProf,
      });
    } else {
      res.status(404).json({
        status: "error",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      e,
    });
  }
};

exports.startOH = async (req, res) => {
  try {
    const prof = await Prof.findOneAndUpdate(
      { profAccessCode: req.body.accessCode },
      { ohStarted: req.body.start },
      { new: true }
    );
    if (prof) {
      res.status(200).json({
        status: "success",
        prof,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Prof not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      e,
    });
  }
};

exports.dequeue = async (req, res) => {
  try {
    const accessCode = req.body.accessCode;
    const prof = await Prof.findOne({ profAccessCode: accessCode });
    if (prof) {
      const stud = prof.queue.shift();
      const delStud = await Stud.findByIdAndDelete(stud);
      const updateQueue = await Prof.findOneAndUpdate(
        { profAccessCode: prof.profAccessCode },
        { queue: prof.queue },
        { new: true }
      );
      if (updateQueue && delStud) {
        dbEventEmitter.emit("queueChanged", updateQueue.queue);
        res.status(200).json({
          status: "success",
          prof,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "error updating queue",
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "error finding prof",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      e,
    });
  }
};
