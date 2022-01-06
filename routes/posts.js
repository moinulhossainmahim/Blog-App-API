const router = require("express").Router();
const Post = require("./../models/Post");

router.post("/posts", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).send(savePost);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).send(post);
      } catch (error) {
        res.status(401).send("you can update only your posts");
      }
    } else {
      res.status(401).send("you can update only your posts");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).send("post has been deleted");
      } catch (error) {
        res.status(401).send("you can delete only your posts");
      }
    } else {
      res.status(401).send("you can delete only your posts");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/posts", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let post;
    if (username) {
      post = await Post.find({ username });
    } else if (catName) {
      post = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      post = await Post.find();
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
