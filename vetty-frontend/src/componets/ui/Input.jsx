import React from 'react';

export const Input = ({ type = 'text', placeholder, value, onChange, name, className }) => {
  return (
    <input
      type={type}
      name={name} // Ensure the name prop is passed
      value={value}
      onChange={onChange} // Ensure the onChange handler is passed
      placeholder={placeholder}
      className={`border rounded-md p-2 w-full ${className}`}
    />
  );
};

export default Input;