import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaPaw, FaStethoscope, FaCut, FaPills, FaHeart, FaSearch } from "react-icons/fa";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    {
      id: 1,
      title: "Veterinary Checkup",
      description: "Complete pet health examination",
      duration: "30 mins",
      price: "$50",
      icon: <FaStethoscope className="text-4xl text-blue-600" />
    },
    {
      id: 2,
      title: "Pet Grooming",
      description: "Professional grooming services",
      duration: "60 mins",
      price: "$40",
      icon: <FaCut className="text-4xl text-blue-600" />
    },
    {
      id: 3,
      title: "Vaccination",
      description: "Essential pet vaccines",
      duration: "15 mins",
      price: "$35",
      icon: <FaPills className="text-4xl text-blue-600" />
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Pet Food",
      description: "High-quality nutrition for your pet",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Pet Vitamins",
      description: "Essential supplements for pet health",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1582638272090-52c2832b1e64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Grooming Kit",
      description: "Complete grooming set for pets",
      price: "$45.99",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Updated Navigation with Search Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        {/* Updated Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-0 py-2">
              <input
                type="text"
                placeholder="Search products or services..."
                className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="px-0 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Products</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Services</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Updated Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-0">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-0 sm:mt-12 sm:px-0 lg:mt-16 lg:px-0 xl:mt-28">
              <div className="sm:text-center lg:text-left px-0 sm:px-0 lg:px-0">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Pet's Health</span>
                  <span className="block text-blue-600">Our Priority</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Quick access to veterinary services and premium pet products. Order now and get same-day delivery on selected items.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <button className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors md:py-4 md:text-lg md:px-10">
                    Shop Now
                  </button>
                  <button className="mt-3 sm:mt-0 w-full sm:w-auto px-8 py-3 text-base font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors md:py-4 md:text-lg md:px-10">
                    Book Service
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-l-3xl shadow-2xl"
            src="https://images.unsplash.com/photo-1587764379873-97837921fd44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Veterinary care"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-0">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-xl text-gray-500">High-quality products for your pets</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="mt-2 text-gray-500">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-0">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-500">Professional care for your pets</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-center text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-500 text-center">{service.description}</p>
                <p className="mt-2 text-sm text-gray-400 text-center">Duration: {service.duration}</p>
                <p className="mt-2 text-lg font-bold text-blue-600 text-center">{service.price}</p>
                <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;