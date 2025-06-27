const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔐 Register Route
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    company,
    contact,
    dob,
    qualification
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      company: role === "employer" ? company : "", // ✅ Only save if employer
      contact,
      dob,
      qualification,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// 🔑 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      role: user.role,
      name: user.name,
      email: user.email,
      company: user.company || null, // include company for employer
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Candidate/Employer Profile by Email
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
