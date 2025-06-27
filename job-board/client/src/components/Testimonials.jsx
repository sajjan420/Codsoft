import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "JobVik made the search way faster and easier and told me when companies would view my applications. Eventually I got a call for the position I wanted with a great company close to where I live!",
    name: "– Sajjan Choudhary",
  },
  {
    id: 2,
    quote:
      "JobVik got me my first real job after I graduated from college. Thanks to them, I am now able to be in this world as a functional, working adult. Hooray for salary! No more clocking in!",
    name: "– Rohit",
  },
  {
    id: 3,
    quote:
      "I was able to get a great full time position even before finishing my last semester of college. I couldn’t have asked for a better entry level position and I love my job. Thank you JobVik!",
    name: "– Nikhil Singh",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-blue-100 py-12" id="reviews">
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          What Our Users Say
        </h2>

        <div className="space-y-8 h-64 relative">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              } flex flex-col justify-center items-center`}
            >
              <div className="bg-white shadow-md rounded-lg p-6 border border-blue-200 max-w-prose">
                <p className="text-gray-700 italic mb-4">“{item.quote}”</p>
                <p className="text-gray-900 font-semibold">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation (optional) */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition ${
                idx === activeIndex
                  ? "bg-blue-600"
                  : "bg-gray-400"
              }`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
