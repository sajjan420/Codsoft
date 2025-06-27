import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer"; // ✅ Adjust path as needed

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch job", err);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate(`/apply/${id}`);
    } else {
      toast.warn("🚫 Please register or log in to apply.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "colored",
      });

      setTimeout(() => navigate("/register"), 3000);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  if (!job)
    return <div className="text-center text-red-500">❌ Job not found</div>;

  return (
    <>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-blue-800 mb-4">{job.title}</h2>
        <p className="text-lg text-gray-700 font-semibold">{job.company}</p>
        <p className="text-gray-500">
          {job.location} · {job.type}
        </p>

        <div className="mt-6 text-gray-800">
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p>{job.description}</p>
        </div>

        <button
          onClick={handleApply}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Apply Now
        </button>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
};

export default JobDetail;
