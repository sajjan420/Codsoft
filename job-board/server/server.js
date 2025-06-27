const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require("./routes/applications");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", authRoutes);       // /api/register, /api/login
app.use("/api/jobs", jobRoutes);   // /api/jobs
app.use("/api", applicationRoutes); // Includes /api/apply and /api/applications

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
