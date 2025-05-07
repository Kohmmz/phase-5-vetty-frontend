import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import { Input } from '../../ui/Input';
import Modal from '../../ui/Modal';

const AdminServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Vaccination', price: 100, description: 'Pet vaccinations', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Grooming', price: 50, description: 'Basic grooming service', image: 'https://via.placeholder.com/150' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

  const openModal = (service = null) => {
    setEditingService(service);
    setFormData(service || { name: '', price: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (editingService) {
      // Update existing service
      setServices(prev =>
        prev.map(service =>
          service.id === editingService.id ? { ...editingService, ...formData } : service
        )
      );
    } else {
      // Add new service
      const newService = { ...formData, id: Date.now() };
      setServices(prev => [...prev, newService]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Manage Services</h2>
        <Button onClick={() => openModal()}>Add Service</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-800 font-medium">Price: ${service.price}</p>
              <div className="flex justify-between mt-3">
                <Button size="sm" onClick={() => openModal(service)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>Delete</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingService ? 'Edit Service' : 'Add Service'}
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <Input
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>{editingService ? 'Update' : 'Add'}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminServices;