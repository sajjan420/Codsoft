import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams(); // Job ID from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, jobId: id }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", resume: "", coverLetter: "" });
      } else {
        alert("❌ Failed to submit application.");
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("❌ Server error.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Apply for Job ID: {id}</h2>
      {success ? (
        <p className="text-green-600 font-semibold">✅ Application submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="resume"
            required
            placeholder="Paste resume URL or text"
            value={formData.resume}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <textarea
            name="coverLetter"
            rows="4"
            placeholder="Cover Letter (optional)"
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyJob;
