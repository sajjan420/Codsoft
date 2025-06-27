import React from "react";
import tvPhoneImag from "../assets/tv-phone-overlay.png";

const JobAlertBanner = () => {
  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
        {/* Left Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Sign Up to Get Job Alerts</h2>
          <p className="text-lg text-gray-600 mt-2">
            Our powerful matching technology will send job matches right to your inbox.
          </p>
          <a
            href="/jobs"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Find Your Future Job
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={tvPhoneImag}
            alt="Job Alerts on TV and Mobile"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default JobAlertBanner;
