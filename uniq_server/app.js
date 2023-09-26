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
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const heartbeatInterval = setInterval(() => {
    res.write(":heartbeat\n\n");
  }, 60000);

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

const dbEventEmitter = require("./dbEventEmitter");

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
