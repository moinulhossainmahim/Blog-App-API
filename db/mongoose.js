const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("connected to mongodb"))
  .catch((error) => console.log(error));
