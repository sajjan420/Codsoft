// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  company: String,
  contact: String,
  dob: String,
  qualification: String,
  postedBy: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
