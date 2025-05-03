import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaShoppingCart, FaUser, FaTimes, FaBars } from "react-icons/fa";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize menu state

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-50 h-15 "> {/* Reduced height */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full"> {/* Maintain consistent height */}
          <div className="flex items-center">
            <FaPaw className="text-3xl text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">Vetty</span>
          </div>

          {/* Desktop menu items */}
          <div className="hidden md:flex items-center space-x-8 ml-auto"> {/* Added ml-auto to push items to the right */}
             <Link to='/Home' className="text-gray-600 hover:text-blue-600">Home</Link>
             <Link to='/About' className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to='/productspage' className="text-gray-600 hover:text-blue-600">Products</Link>
            <Link to='/login' className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to='/register' className="text-gray-600 hover:text-blue-600">Sign up</Link>
            
            
            
          </div>

          {/* Desktop icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <FaShoppingCart className="text-2xl" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <FaUser className="text-2xl" />
            </button>
            <button
              className="md:hidden text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
