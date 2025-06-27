import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [jobs, setJobs] = useState([]);

  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${email}`);
        const data = await res.json();
        setUser(data);
        setEditForm(data);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchProfile();
    fetchApplications();
    fetchJobs();
  }, [email]);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setEditMode(false);
      }
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    return job ? job.title : "Unknown Job";
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.email === email &&
      app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">📋 Candidate Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded shadow col-span-1">
          <div className="flex flex-col items-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
              alt="Avatar"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="text-lg font-bold text-blue-700 mb-1">
              {user ? `Welcome, ${user.name}` : "Loading..."}
            </h2>
          </div>
          <hr className="my-3" />

          {user && !editMode ? (
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Contact:</strong> {user.contact}</li>
              <li><strong>DOB:</strong> {user.dob}</li>
              <li><strong>Qualification:</strong> {user.qualification}</li>
            </ul>
          ) : editMode ? (
            <div className="space-y-2 text-sm">
              <input
                name="contact"
                placeholder="Contact"
                value={editForm.contact || ""}
                onChange={handleEditChange}
                className="w-full p-1 border rounded"
              />
              <input
                name="dob"
                placeholder="DOB"
                value={editForm.dob || ""}
                onChange={handleEditChange}
                className="w-full p-1 border rounded"
              />
              <input
                name="qualification"
                placeholder="Qualification"
                value={editForm.qualification || ""}
                onChange={handleEditChange}
                className="w-full p-1 border rounded"
              />
            </div>
          ) : null}

          {/* Buttons */}
          <div className="mt-4 text-center">
            {editMode ? (
              <>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Applications Section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-green-700 mb-4">📄 Your Applications</h2>

          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          {filteredApplications.length === 0 ? (
            <p className="text-gray-500">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app, i) => (
                <div key={i} className="bg-white p-4 rounded shadow">
                  <p><strong>Job Title:</strong> {getJobTitle(app.jobId)}</p>
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Resume:</strong> {app.resume}</p>
                  <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                  <p className="text-xs text-gray-400">Job ID: {app.jobId}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Jobs to Apply */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">🧾 Available Jobs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold text-green-800">{job.title}</h3>
              <p className="text-gray-600">{job.company} · {job.location}</p>
              <p className="text-gray-500 text-sm mb-2">{job.type}</p>
              <p className="text-sm text-gray-700">{job.description?.substring(0, 100)}...</p>
              <Link to={`/apply/${job._id}`}>
                <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                  Apply Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
