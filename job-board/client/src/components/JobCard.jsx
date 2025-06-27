import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location} · {job.type}</p>
      <Link to={`/job/${job.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;
