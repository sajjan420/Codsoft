const mongoose = require("mongoose");
const Job = require("./models/Job");

mongoose
  .connect("mongodb://localhost:27017/jobboard")
  .then(async () => {
    console.log("🌐 Connected to MongoDB");

    // Clear old jobs
    await Job.deleteMany();

    // Insert sample jobs
    await Job.insertMany([
      {
        title: "Full Stack Developer",
        company: "CodeMasters Inc.",
        location: "Bangalore",
        type: "Full-Time",
        description: "Looking for a MERN stack developer with 2+ years experience.",
      },
      {
        title: "Backend Engineer",
        company: "DataHive",
        location: "Remote",
        type: "Part-Time",
        description: "Build APIs using Node.js and MongoDB.",
      },
    ]);

    console.log("✅ Sample jobs inserted!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ DB error", err));
