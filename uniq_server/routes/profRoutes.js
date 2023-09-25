const express = require("express");
const router = express.Router();
const profController = require("../controllers/profController");

router.post("/login", profController.getProf);
router.post("/addProf", profController.addProf);
router.put("/startOH", profController.startOH);
router.put("/dequeue", profController.dequeue);

module.exports = router;
