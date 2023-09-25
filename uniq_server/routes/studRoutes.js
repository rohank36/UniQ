const express = require("express");
const router = express.Router();
const studController = require("../controllers/studController");

router.post("/joinQueue", studController.joinQueue1, studController.joinQueue2);
router.post("/leaveQueue", studController.leaveQueue);

module.exports = router;
