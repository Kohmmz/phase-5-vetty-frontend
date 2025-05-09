import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaPaw, FaStethoscope, FaCut, FaPills, FaHeart, FaSearch } from 'react-icons/fa';
import './Home.css';

import petFoodImg from '../../../assets/dog-food.webp';
import healthWellnessImg from '../../../assets/pharma-hemp-complex-LvZqsx-vJL8-unsplash.jpg';
import groomingServicesImg from '../../../assets/pet-grooming.jpeg';
import vaccinationServicesImg from '../../../assets/vaccination.jpeg';

import birdFoodImg from '../../../assets/bird-food.jpg';
import chewDogBallImg from '../../../assets/chewdogball.jpg';
import dogFeedImg from '../../../assets/dog-feed.jpg';
import multiVitaminImg from '../../../assets/multi_vitamin.jpeg';
import petSupplementsImg from '../../../assets/pet-supplements.webp';
import petShampooImg from '../../../assets/pet-shampoo.webp';
import petWashImg from '../../../assets/pet-wash.webp';
import dentalCareImg from '../../../assets/dental-care.jpeg';
import emergencyKitImg from '../../../assets/emergency-kit.jpeg';
import surgicalImg from '../../../assets/surgical.jpeg';
import coolFloorPadImg from '../../../assets/cool-floorpad.jpeg';
import luxuryBedImg from '../../../assets/luxury_bed.jpeg';
import petDispenserImg from '../../../assets/pet-dispenser.jpeg';
import petLeashImg from '../../../assets/pet-leash.jpeg';
import petMicrochipImg from '../../../assets/pet-microchip.jpeg';
import petTrainingImg from '../../../assets/pet-training.jpeg';
import petTravelCarrierImg from '../../../assets/pet-travel-carrier.jpeg';

import petHouseImg from '../../../assets/pet-house.jpeg';
import petSwimmingImg from '../../../assets/pet-swimming.jpeg';
import petFountainImg from '../../../assets/pet-fountain.jpeg';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      title: 'Veterinary Checkup',
      description: 'Complete pet health examination',
      duration: '30 mins',
      price: '$50',
      icon: <FaStethoscope className="text-4xl text-blue-600" />
    },
    {
      id: 2,
      title: 'Pet Grooming',
      description: 'Professional grooming services',
      duration: '60 mins',
      price: '$40',
      icon: <FaCut className="text-4xl text-blue-600" />
    },
    {
      id: 3,
      title: 'Vaccination',
      description: 'Essential pet vaccines',
      duration: '15 mins',
      price: '$35',
      icon: <FaPills className="text-4xl text-blue-600" />
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Pet Food',
      description: 'High-quality nutrition for your pet',
      price: '$29.99',
      image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Pet Vitamins',
      description: 'Essential supplements for pet health',
      price: '$19.99',
      image: 'https://images.unsplash.com/photo-1582638272090-52c2832b1e64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Grooming Kit',
      description: 'Complete grooming set for pets',
      price: '$45.99',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="home-page-container min-h-screen bg-gray-50 mt-20">
      {/* Navigation with Search Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
              <FaPaw />
              <span>Vetty</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>
          <div className="hidden md:flex md:items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <FaSearch />
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <FaUser />
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <FaShoppingCart />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2">
            <input
              type="text"
              placeholder="Search products or services..."
              className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-y-1">
              <Link to="/products" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                Products
              </Link>
              <Link to="/services" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                Services
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                About
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto text-center">
          <h1>Your One-Stop Shop for Happy, Healthy Pets</h1>
          <p>Get quality veterinary products and services delivered right to your doorstep.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/products" className="btn btn-explore">
              Explore Products
            </Link>
            <Link to="/services" className="btn btn-book">
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container mx-auto">
          <h2>Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="category-card">
              <Link to="/products?category=food">
                <img src={petFoodImg} alt="Pet Food" />
                <div className="p-4">
                  <h3>Pet Food</h3>
                  <p>Keep your furry friends nourished and happy.</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/products?category=health">
                <img src={healthWellnessImg} alt="Health & Wellness" />
                <div className="p-4">
                  <h3>Health & Wellness</h3>
                  <p>Essential items for your pet's well-being.</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/services?type=grooming">
                <img src={groomingServicesImg} alt="Grooming Services" />
                <div className="p-4">
                  <h3>Grooming Services</h3>
                  <p>Pamper your pet with our professional grooming.</p>
                </div>
              </Link>
            </div>
            <div className="category-card">
              <Link to="/services?type=vaccination">
                <img src={vaccinationServicesImg} alt="Vaccination Services" />
                <div className="p-4">
                  <h3>Vaccination Services</h3>
                  <p>Protect your pet with our vaccination options.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=bird-food">
                <img src={birdFoodImg} alt="Bird Food" />
                <div className="p-4">
                  <h3>Bird Food</h3>
                  <p>Nutritious food options for your feathered friends.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=dog-toys">
                <img src={chewDogBallImg} alt="Dog Toys" />
                <div className="p-4">
                  <h3>Dog Toys</h3>
                  <p>Fun and engaging toys for your playful dogs.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=dog-feed">
                <img src={dogFeedImg} alt="Dog Feed" />
                <div className="p-4">
                  <h3>Dog Feed</h3>
                  <p>High-quality feed to keep your dogs healthy.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=pet-supplements">
                <img src={multiVitaminImg} alt="Pet Supplements" />
                <div className="p-4">
                  <h3>Vitamin Feed</h3>
                  <p>Vitamins and supplements for your pet's health.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=pet-supplements">
                <img src={petSupplementsImg} alt="Pet Supplements" />
                <div className="p-4">
                  <h3>Pet Supplements</h3>
                  <p>Extra Nutrition for your pet's health status.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=grooming-products">
                <img src={petShampooImg} alt="Grooming Products" />
                <div className="p-4">
                  <h3>Grooming Products</h3>
                  <p>Keep your pet clean and fresh with grooming essentials.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=grooming-products">
                <img src={petWashImg} alt="Grooming Products" />
                <div className="p-4">
                  <h3>Grooming Products</h3>
                  <p>Keep your pet clean and fresh with grooming essentials.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=health-care">
                <img src={dentalCareImg} alt="Health Care" />
                <div className="p-4">
                  <h3>Health Care</h3>
                  <p>Essential health care products for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=health-care">
                <img src={emergencyKitImg} alt="Health Care" />
                <div className="p-4">
                  <h3>Health Care</h3>
                  <p>Essential health care products for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=health-care">
                <img src={surgicalImg} alt="Health Care" />
                <div className="p-4">
                  <h3>Health Care</h3>
                  <p>Essential health care products for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={coolFloorPadImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={luxuryBedImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={petDispenserImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={petLeashImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={petMicrochipImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={petTrainingImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=accessories">
                <img src={petTravelCarrierImg} alt="Accessories" />
                <div className="p-4">
                  <h3>Accessories</h3>
                  <p>Comfort and convenience accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=pet-house">
                <img src={petHouseImg} alt="Pet House" />
                <div className="p-4">
                  <h3>Pet House</h3>
                  <p>Comfortable and cozy homes for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=pet-swimming">
                <img src={petSwimmingImg} alt="Pet Swimming" />
                <div className="p-4">
                  <h3>Pet Swimming</h3>
                  <p>Swimming gear and accessories for your pets.</p>
                </div>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=pet-fountain">
                <img src={petFountainImg} alt="Pet Fountain" />
                <div className="p-4">
                  <h3>Pet Fountain</h3>
                  <p>Keep your pets hydrated with our pet fountains.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vetty? */}
      <section className="why-choose-section">
        <div className="container mx-auto">
          <h2>Why Choose Vetty?</h2>
          <div className="why-choose-grid">
            <div>
              <svg className="icon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v-1m9-9h-1m-9 0h-1m-2.5 5l-.79.79m2.12-2.12l-.79-.79m0 4.46l-.79-.79m2.12-2.12l.79.79" />
              </svg>
              <h3>Convenience at Your Doorstep</h3>
              <p>Order products and book services from the comfort of your home.</p>
            </div>
            <div>
              <svg className="icon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2l7 7" />
              </svg>
              <h3>Wide Range of Products & Services</h3>
              <p>From essential food to specialized veterinary care.</p>
            </div>
            <div>
              <svg className="icon-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>Quality & Care You Can Trust</h3>
              <p>Dedicated to the health and happiness of your pets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <div className="container mx-auto text-center">
          <h2>Ready to Give Your Pet the Best?</h2>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn btn-create-account">
              Create an Account
            </Link>
            <Link to="/products" className="btn btn-browse-products">
              Browse Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
