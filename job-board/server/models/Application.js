const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,
  coverLetter: String,
  jobId: String, // Can be ref: 'Job' if using Mongoose ref
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
