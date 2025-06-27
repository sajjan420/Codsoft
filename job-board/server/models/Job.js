// models/User.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      default: "Full-Time",
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String, // usually the email of the employer
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);
// ✅ Prevent "OverwriteModelError"
module.exports = mongoose.models.job || mongoose.model("job", jobSchema);
