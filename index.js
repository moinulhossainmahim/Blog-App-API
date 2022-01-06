const express = require("express");
require("./db/mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.status(200).send("File has been uploaded");
  } catch (error) {
    res.send(error);
  }
});

app.use(express.json());
app.use(authRoute);
app.use(userRoute);
app.use(postRoute);
app.use(categoryRoute);

app.listen("5000", () => {
  console.log("Servier is up on port 5000");
});
