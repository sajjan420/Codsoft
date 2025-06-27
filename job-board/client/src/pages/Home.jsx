import React from "react";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import HeroBanner from "../components/HeroBanner";
import JobAlertBanner from "../components/HeroBanner";
import tvPhoneImage from "../assets/tv-phone-overlay.png";



const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Techify Inc.",
    location: "Remote",
    type: "Full-Time",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataWave",
    location: "Bangalore",
    type: "Part-Time",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Delhi",
    type: "Contract",
  },
];

const Home = () => {
  return (
    <>
      
    <div>
      
      {/*Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-lg mb-6">Explore thousands of job opportunities tailored for you.</p>
        <a
          href="/jobs"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Browse Jobs
        </a>
      </section>
      
      
      <JobAlertBanner/>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          🌟 Featured Jobs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
      
    </div>
    <Testimonials />
    <Footer/>
   </> 
  );
};

export default Home;
