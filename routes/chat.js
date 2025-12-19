const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(20);
    res.json(messages.reverse());  // Reverse so the newest message is at the bottom
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

router.post("/", async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ message: "Username and message are required" });
  }

  try {
    const newMessage = new Message({
      username,
      message
    });
    await newMessage.save();  // Save the message to MongoDB
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error saving message" });
  }
});

module.exports = router;
