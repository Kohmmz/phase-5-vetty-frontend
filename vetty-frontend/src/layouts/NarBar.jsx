import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Vetty
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>
            <Link to="/services" className="hover:text-gray-200">
              Services
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
            <Link to="/admin/dashboard" className="hover:text-gray-200">
              Admin
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/" className="block px-4 py-2 hover:bg-blue-800">
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-blue-800">
            Products
          </Link>
          <Link to="/services" className="block px-4 py-2 hover:bg-blue-800">
            Services
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-blue-800">
            About
          </Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-blue-800">
            Login
          </Link>
          <Link to="/register" className="block px-4 py-2 hover:bg-blue-800">
            Register
          </Link>
          <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-blue-800">
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;