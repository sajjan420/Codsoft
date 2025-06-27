import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer"; // ✅ Import Footer (adjust path if needed)

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  // Fetch jobs on initial load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error("❌ Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let results = jobs;

    if (search.trim() !== "") {
      results = results.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location.trim() !== "") {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type !== "") {
      results = results.filter((job) => job.type === type);
    }

    setFilteredJobs(results);
  }, [search, location, type, jobs]);

  // Apply button logic
  const handleApply = (jobId) => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate(`/apply/${jobId}`);
    } else {
      toast.warn("🚫 Please register or log in to apply for a job.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: "colored",
      });

      setTimeout(() => navigate("/register"), 3000);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Toast Container */}
        <ToastContainer />

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🔍 Job Listings
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-blue-800">
                  {job.title}
                </h3>
                <p className="text-gray-600">
                  {job.company} · {job.location}
                </p>
                <p className="text-gray-500 text-sm">{job.type}</p>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/job/${job._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details →
                  </Link>
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
};

export default Jobs;
