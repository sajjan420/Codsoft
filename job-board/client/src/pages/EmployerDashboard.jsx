import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-Time",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${email}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, [email]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs?postedBy=${user.email}`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    };
    fetchJobs();
  }, [user?.email]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("❌ User email missing. Please log in again.");

    const url = editingId
      ? `http://localhost:5000/api/jobs/${editingId}`
      : "http://localhost:5000/api/jobs";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company: user.company,
          postedBy: user.email,
        }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      if (editingId) {
        setJobs((prev) =>
          prev.map((job) => (job._id === editingId ? data : job))
        );
        toast.success("✏️ Job updated!");
      } else {
        setJobs((prev) => [...prev, data]);
        toast.success("✅ Job posted!");
      }

      setFormData({ title: "", location: "", type: "Full-Time", description: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Submit failed", err);
      toast.error("❌ Failed to submit job");
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      description: job.description,
    });
    setEditingId(job._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("🗑️ Job deleted!");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("❌ Failed to delete job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ToastContainer />

      {/* Profile Section */}
      <aside className="w-full md:w-1/3 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-blue-700">{user?.name}</h2>
        </div>
        <hr className="my-4" />
        {user && (
          <ul className="text-sm space-y-2 text-gray-700">
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Company:</strong> {user.company}</li>
            <li><strong>Role:</strong> {user.role}</li>
          </ul>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <main className="w-full md:w-2/3 p-6 space-y-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">
            {editingId ? "✏️ Edit Job" : "Post a Job"}
          </h3>
          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
          </select>
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Update Job" : "Post Job"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ title: "", location: "", type: "Full-Time", description: "" });
                  setEditingId(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Job List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Your Job Posts</h3>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-bold text-blue-800">{job.title}</h4>
                <p className="text-sm text-gray-600">
                  {job.company} · {job.location} · {job.type}
                </p>
                <p className="mt-2 text-gray-700">{job.description}</p>
                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
