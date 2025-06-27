import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-3">JobVik</h2>
          <p className="text-sm text-gray-300">
            Your trusted platform for finding great job opportunities and hiring talent.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/jobs" className="hover:text-white">Jobs</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/register" className="hover:text-white">Register</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@jobvik.com</p>
          <p className="text-sm text-gray-300">Phone: +91-9588925150</p>
          <p className="text-sm text-gray-300">Location: Jaipur, Rajasthan, India</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-4 bg-gray-800">
         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 text-xl">
           <i className="fab fa-facebook"></i>
         </a>
         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 text-xl">
           <i className="fab fa-twitter"></i>
         </a>
         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 text-xl">
           <i className="fab fa-instagram"></i>
         </a>
         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 text-xl">
           <i className="fab fa-linkedin"></i>
         </a>
         <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 text-xl">
           <i className="fab fa-github"></i>
         </a>
      </div>

      

      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} JobVik. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
