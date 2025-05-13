import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaPaw, FaStethoscope, FaCut, FaPills, FaHeart, FaSearch } from 'react-icons/fa';
import Navbar from '../../../layouts/Navbar';
import Hero from './Hero';

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
      icon: <FaStethoscope className="service-icon" />
    },
    {
      id: 2,
      title: 'Pet Grooming',
      description: 'Professional grooming services',
      duration: '60 mins',
      price: '$40',
      icon: <FaCut className="service-icon" />
    },
    {
      id: 3,
      title: 'Vaccination',
      description: 'Essential pet vaccines',
      duration: '15 mins',
      price: '$35',
      icon: <FaPills className="service-icon" />
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
    <div className="home-page-container">
      <Navbar />
      <Hero />
      {/* Featured Categories */}
      <section className="featured-categories">
        {/* Content of the section */}
      </section>
        <div className="container mx-auto">
          <div className="categories-grid">
            {
            [
              petFoodImg, healthWellnessImg, groomingServicesImg, vaccinationServicesImg, 
 birdFoodImg, 
 chewDogBallImg, 
 dogFeedImg, 
 multiVitaminImg, 
 petSupplementsImg, 
 petShampooImg,
 petWashImg,
 dentalCareImg, 
 emergencyKitImg, 
 surgicalImg, 
 coolFloorPadImg, 
 luxuryBedImg,
 petDispenserImg, 
 petLeashImg, 
 petMicrochipImg, 
 petTrainingImg, 
 petTravelCarrierImg, 

 petHouseImg, 
 petSwimmingImg, 
 petFountainImg 
 ].map((img, index) => {
             const titles = [
        'Bird Food', 'Chew Dog Ball', 'Dog Feed', 'Multivitamin', 'Pet Supplements',
        'Pet Shampoo', 'Pet Wash', 'Dental Care', 'Emergency Kit', 'Surgical',
        'Cool Floor Pad', 'Luxury Bed', 'Pet Dispenser', 'Pet Leash', 'Pet Microchip',
        'Pet Training', 'Pet Travel Carrier', 'Pet House', 'Pet Swimming', 'Pet Fountain'
          ];
            const descriptions = [
          'Nutritious food for birds.', 'Durable chew ball for dogs.', 'High-quality dog feed.', 'Essential multivitamins for pets.', 'Boost pet health with supplements.',
          'Keep pets clean and fresh.', 'Gentle and effective pet wash.', 'Take care of your pet’s dental hygiene.', 'Emergency care essentials for pets.', 'Surgical needs for pets.',
          'Cooling comfort for your pet.', 'Luxury bedding for a cozy pet sleep.', 'Convenient pet food dispenser.', 'Strong and reliable pet leash.', 'Microchip for pet identification.',
          'Effective pet training tools.', 'Safe travel carriers for pets.', 'Comfortable pet housing.', 'Fun swimming accessories for pets.', 'Fresh flowing water for pets.'
            ];
             
              const links = [
                '/products?category=food',
                '/products?category=health',
                '/services?type=grooming',
                '/services?type=vaccination'
              ];
                return (
                <div key={index} className="category-card star-border">
                  <Link to={links[index]}>
                  <div className="star-wrapper"></div>
                      <img src={img} alt={titles[index]} />
                      <div className="star-icon-top-left">★</div>
                      <div className="star-icon-top-right">★</div>
                      <div className="star-icon-bottom-left">★</div>
                      <div className="star-icon-bottom-right">★</div>
                    <div className="category-info">
                      <h3>{titles[index]}</h3>
                      <p>{descriptions[index]}</p>
                      <div className="star-icon-below">★</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

           
          </div>
        </div>

  );
};

export default HomePage;
