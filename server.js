const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://192.168.64.130:27017/blogdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const User = mongoose.model("User", {
  username: String,
  password: String
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) {
    return res.json({ success: false });
  }

  // Generate MFA code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Store MFA code in the database
  await mongoose.connection.collection("mfa_codes").insertOne({
    username,
    code,
    expiresAt: new Date(Date.now() + 5 * 60000)  // Code expires in 5 minutes
  });

  console.log(`MFA code for ${username}: ${code}`);

  res.json({ mfaRequired: true });
});

app.post("/verify-mfa", async (req, res) => {
  const { username, code } = req.body;

  const record = await mongoose.connection
    .collection("mfa_codes")
    .findOne({ username, code });

  if (!record || record.expiresAt < new Date()) {
    return res.json({ success: false });
  }

  await mongoose.connection.collection("mfa_codes").deleteMany({ username });

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
