
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());              // allow frontend VM requests
app.use(express.json());      // parse JSON bodies
app.options("*", cors());    // handle CORS preflight (OPTIONS)


mongoose.connect("mongodb://192.168.64.130:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

/* =====================
   Server
   ===================== */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

