const express = require("express");
const profRouter = require("./routes/profRoutes");
const studRouter = require("./routes/studRoutes");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

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
