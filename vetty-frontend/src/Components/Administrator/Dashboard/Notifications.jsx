import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import { Button } from '../../ui/buttons';

const Notifications = () => {
  const mockNotifications = [
    {
      id: 1,
      title: "New appointment request from John",
      details: "John has requested an appointment for a checkup on May 5th, 2025.",
    },
    {
      id: 2,
      title: "Order #1234 has been placed",
      details: "The user has placed an order for a product. Payment status: Pending.",
    },
    {
      id: 3,
      title: "Product restocked",
      details: "Product 'Flea Collar' has been restocked and is now available for purchase.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Notifications</h2>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleNotificationClick(notification)}
          >
            <h3 className="text-lg font-semibold text-blue-800">{notification.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{notification.details}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedNotification && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Notification Details">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">{selectedNotification.title}</h3>
            <p className="mt-2 text-gray-700">{selectedNotification.details}</p>
          </div>
          <Button onClick={handleModalClose} variant="primary" size="md" className="mt-4">
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default Notifications;