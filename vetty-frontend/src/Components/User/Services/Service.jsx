import React from 'react';
import './Service.css';

const Service = ({ service }) => {

  const handleBookService = () => {
    alert(`You have booked the service: ${service.name}`);
  };

  return (
    <div className="service-card">
      <img src={service.image_url} alt={service.name} className="service-image" />
      <h2 className="service-name">{service.name}</h2>
      <p className="service-description">{service.description}</p>
      <p className="service-price">${service.price}</p>
      <button className="book-service-button" onClick={handleBookService}>
        Book Service
      </button>
    </div>
  );
};

export default Service;
