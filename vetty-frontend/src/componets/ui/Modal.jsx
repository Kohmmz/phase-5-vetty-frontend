import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fade-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;