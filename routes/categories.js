const router = require("express").Router();
const Category = require("./../models/Category");

router.post("/categories", async (req, res) => {
  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    res.status(200).send(savedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).send(cats);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
