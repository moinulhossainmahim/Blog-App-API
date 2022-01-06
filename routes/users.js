const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./../models/User");
const Post = require("./../models/Post");

router.put("/users/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      await bcrypt.hash(req.body.password, 8);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("You can update only your account");
  }
});

router.delete("/users/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("user not found");
      }
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("user has been deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("You can delete only your account");
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).send("It's not a valid user");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
