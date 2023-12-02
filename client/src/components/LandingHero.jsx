import React from "react";

import TypewriterComponent from "typewriter-effect";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div className="text-white font-bold py-28 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best Appointment System for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
          <TypewriterComponent
            options={{
              strings: ["Medical", "Professionals"],
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 40,
            }}
          />
        </div>
        <div>
          <Link className="bg-blue-600 rounded-lg text-white md:text-lg p-4 md:p-6 font-semibold">
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
