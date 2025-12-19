const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/**
 * GET all posts
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

/**
 * CREATE a new post
 */
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const post = new Post({ title, content });
    await post.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save post" });
  }
});

module.exports = router;
