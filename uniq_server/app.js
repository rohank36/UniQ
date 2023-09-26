const express = require("express");
const profRouter = require("./routes/profRoutes");
const studRouter = require("./routes/studRoutes");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

//SSE Setup
let clients = [];
app.get("/events", (req, res) => {
  console.log("Received request for /events");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const heartbeatInterval = setInterval(() => {
    res.write(":heartbeat\n\n"); // a comment message
  }, 60000);

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

// This is a placeholder. You'd typically have some event or watcher on your database.
// For demonstration purposes, let's assume you have an event emitter for database changes.
const dbEventEmitter = require("./dbEventEmitter"); // This is just a placeholder. You'd need to implement this.

dbEventEmitter.on("queueChanged", (updatedQueue) => {
  clients.forEach((client) =>
    client.write(`data: ${JSON.stringify(updatedQueue)}\n\n`)
  );
});

//Routes
app.use("/api/profs", profRouter);
app.use("/api/studs", studRouter);

app.get("/", (req, res) => {
  res.status(200).send("UniQ Server");
});

app.all("*", (req, res) => {
  res.status(404).send(`Can't find ${req.url} on this server`);
});

module.exports = app;
