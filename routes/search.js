// searchController.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { desc: { $regex: q, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
