const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app");

const DB = process.env.DB.replace("<password>", process.env.DB_PW);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection Successful");
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
