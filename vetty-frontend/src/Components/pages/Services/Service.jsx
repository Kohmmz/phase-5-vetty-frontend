import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSyringe, FaStethoscope, FaCut, FaTooth, FaHospitalUser } from 'react-icons/fa';
import api from '../../api/api';
const services = [
  {
    id: 1,
    name: 'General Checkup',
    description: 'Comprehensive health examination for your pet.',
    price: '$50',
    icon: <FaStethoscope className="text-blue-500 text-4xl mb-4" />,
  },
  {
    id: 2,
    name: 'Vaccination',
    description: 'Protect your pet from common diseases with vaccinations.',
    price: '$30',
    icon: <FaSyringe className="text-blue-500 text-4xl mb-4" />,
  },
  {
    id: 3,
    name: 'Grooming',
    description: 'Professional grooming services to keep your pet looking great.',
    price: '$40',
    icon: <FaCut className="text-blue-500 text-4xl mb-4" />,
  },
  {
    id: 4,
    name: 'Surgery',
    description: 'Expert surgical care for your pet’s health needs.',
    price: '$200',
    icon: <FaHospitalUser className="text-blue-500 text-4xl mb-4" />,
  },
  {
    id: 5,
    name: 'Boarding',
    description: 'Safe and comfortable boarding for your pets.',
    price: '$60',
    icon: <FaHospitalUser className="text-blue-500 text-4xl mb-4" />,
  },
  {
    id: 6,
    name: 'Dental Care',
    description: 'Comprehensive dental services to keep your pet’s smile healthy.',
    price: '$80',
    icon: <FaTooth className="text-blue-500 text-4xl mb-4" />,
  },
];

const fetchServices = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000'); // Replace with the correct API endpoint
    console.log('Fetched services:', response.data);
    // You can update the state here if needed
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

const ServicePage = () => {
  const [bookingService, setBookingService] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!date.trim()) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const closeModal = () => {
    setBookingService(null);
    setName('');
    setEmail('');
    setDate('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <div>{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-blue-500 mb-4">{service.price}</p>
            <button
              onClick={() => setBookingService(service)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {bookingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Book Appointment for {bookingService.name}</h2>
            {submitted ? (
              <div>
                <p className="text-green-600 mb-4">
                  Thank you, {name}! Your appointment for {bookingService.name} on {date} has been booked.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-left font-medium mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-left font-medium mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block text-left font-medium mb-1">Preferred Date</label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  >
                    Book
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;