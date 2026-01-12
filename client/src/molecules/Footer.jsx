import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-5">
      <div className="container mx-auto px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center">
   
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-black mb-4 md:mb-0"
        >
          E-Shop
        </Link>

      

        <p className="mt-4 md:mt-0 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
