const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// ✅ Create new application
router.post("/apply", async (req, res) => {
  try {
    const { name, email, resume, coverLetter, jobId } = req.body;

    if (!name || !email || !resume || !jobId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newApplication = new Application({
      name,
      email,
      resume,
      coverLetter,
      jobId,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("❌ Error submitting application:", err);
    res.status(500).json({ message: "Server error during application submission" });
  }
});

// ✅ Get all applications (with optional filter by email)
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email } : {};
    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error("❌ Error fetching applications:", err);
    res.status(500).json({ message: "Server error while fetching applications" });
  }
});

module.exports = router;
