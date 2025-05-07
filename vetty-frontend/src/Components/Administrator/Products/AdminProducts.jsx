import React, { useState } from 'react';
import { Button } from '../../ui/buttons';
import { Input } from '../../ui/Input';
import Modal from '../../ui/Modal';
import { motion } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Dog Food', price: 20, description: 'Premium dog food', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cat Toy', price: 10, description: 'Fun toy for cats', image: 'https://via.placeholder.com/150' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

  const openModal = (product = null) => {
    setEditingProduct(product);
    setFormData(product || { name: '', price: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (editingProduct) {
      // Update product
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
        )
      );
    } else {
      // Add new product
      const newProduct = { ...formData, id: Date.now() };
      setProducts(prev => [...prev, newProduct]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Manage Products</h2>
        <Button onClick={() => openModal()}>Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-800 font-medium">Price: ${product.price}</p>
              <div className="flex justify-between mt-3">
                <Button size="sm" onClick={() => openModal(product)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
          <Button onClick={handleSubmit}>{editingProduct ? 'Update' : 'Add'}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;