const { json } = require("express");
const Stud = require("../models/studModel");
const Prof = require("../models/profModel");
const dbEventEmitter = require("../dbEventEmitter");

exports.joinQueue1 = async (req, res, next) => {
  try {
    const prof = await Prof.findOne({ joinCode: req.body.joinCode });
    if (prof) {
      if (prof.ohStarted === false) {
        res.status(404).json({
          status: "error",
          message: "Prof has not started their office hours yet",
        });
      }
      const newStud = await Stud.create(req.body);
      if (newStud) {
        req.prof = prof;
        req.stud = newStud;
        next();
      } else {
        res.status(404).json({
          status: "error",
          message: "Error creating student",
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "Invalid Join Code",
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

exports.joinQueue2 = async (req, res) => {
  const stud = req.stud;
  const prof = req.prof;

  try {
    prof.queue.push(stud.id);

    const join = await Prof.findOneAndUpdate(
      { profAccessCode: prof.profAccessCode },
      { queue: prof.queue },
      { new: true }
    );

    if (join) {
      dbEventEmitter.emit("queueChanged", join.queue);
      res.status(200).json({
        status: "success",
        stud,
        prof,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Error joining queue",
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

exports.leaveQueue = async (req, res) => {
  try {
    const stud = await Stud.findOne({ name: req.body.name });
    const prof = await Prof.findOne({ joinCode: stud.joinCode });
    if (stud && prof) {
      const studID = stud.id;
      const isStud = (element) => element === studID;
      const index = prof.queue.findIndex(isStud);
      prof.queue.splice(index, 1);

      const updateQueue = await Prof.findOneAndUpdate(
        { profAccessCode: prof.profAccessCode },
        { queue: prof.queue },
        { new: true }
      );

      const del = await Stud.findByIdAndDelete(stud.id);

      if (updateQueue && del) {
        dbEventEmitter.emit("queueChanged", updateQueue.queue);
        res.status(200).json({
          status: "success",
          prof,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Error updating queue",
        });
      }
    } else {
      res.status(404).json({
        status: "error",
        message: "Stud or Prof not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
