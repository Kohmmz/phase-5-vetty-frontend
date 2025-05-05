import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: 120,
      color: 'bg-blue-500',
      icon: '📦',
    },
    {
      title: 'Total Services',
      value: 85,
      color: 'bg-green-500',
      icon: '🛠️',
    },
    {
      title: 'Pending Appointments',
      value: 5,
      color: 'bg-yellow-500',
      icon: '📅',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center">Welcome to Vetty Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg shadow-lg text-white ${stat.color} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-5xl opacity-50">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span className="text-gray-600">John placed an order for Dog Food</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600">Alice booked an appointment for Vaccination</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-600">New product added: Cat Toy</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
