import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/Navbar';
import './ServicesList.css';
import Service from '../../User/Services/Service';

const API_URL = ''; // Adjust backend URL as needed

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Navbar />
      <div className="services-list-container">
        <h1>Services</h1>
        <div className="services-list-grid">
          {services.map(service => (
            <Service key={service.id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesList;
