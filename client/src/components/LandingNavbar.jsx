import React from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link className="flex items-center">
        <h1 className="text-2xl font-bold text-white">Doctor.io</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <Link to="/register" className="p-2.5 bg-white rounded-md">
          Register
        </Link>
        <Link to="/login" className="p-2.5 bg-blue-500 text-white rounded-md">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
