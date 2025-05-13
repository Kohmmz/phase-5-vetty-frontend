import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Vetty</h1>
        <p className="hero-subtitle">Everything your pet needs, delivered fast</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => window.location.href = 'https://phase-5-vetty-frontend.vercel.app/products'}>
            Shop Now
          </button>
          <button className="btn-secondary" onClick={() => window.location.href = 'https://phase-5-vetty-frontend.vercel.app/services'}>
            Our Services
          </button>
        </div>
        <ul className="hero-features">
          <li>Wide range of pet products</li>
          <li>Fast and reliable delivery</li>
          <li>Expert pet care advice</li>
          <li>24/7 Customer Support</li>
          <li>Secure Payment Options</li>
        </ul>
        <div className="hero-testimonials">
          <h2>What Our Customers Say</h2>
          <blockquote>
            "Vetty has transformed how I care for my pets. The products are top-notch and delivery is always on time!"
            <cite>- Sarah K.</cite>
          </blockquote>
          <blockquote>
            "Excellent customer service and a great variety of products. Highly recommend Vetty for all pet owners."
            <cite>- Mike D.</cite>
          </blockquote>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"
          alt="Happy pet with owner"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
