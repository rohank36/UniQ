const EventEmitter = require("events");

class DbEventEmitter extends EventEmitter {}

const dbEventEmitter = new DbEventEmitter();

module.exports = dbEventEmitter;
