const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST /api/jobs
router.post("/", async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.body.postedBy });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Failed to post job" });
  }
});

// PUT /api/jobs/:id
router.put("/:id", async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// GET job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET all jobs or by postedBy
router.get("/", async (req, res) => {
  try {
    const { postedBy } = req.query;
    const jobs = postedBy
      ? await Job.find({ postedBy })
      : await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

module.exports = router;
