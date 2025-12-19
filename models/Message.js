const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },   // Username of the sender
  message: { type: String, required: true },    // Message content
  timestamp: { type: Date, default: Date.now }  // Automatically set the timestamp
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
