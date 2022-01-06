const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("connected to mongodb"))
  .catch((error) => console.log(error));

app.listen("5000", () => {
  console.log("Servier is up on port 5000");
});
