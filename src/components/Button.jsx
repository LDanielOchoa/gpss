// src/components/Button.jsx
import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" bg-green-500 px-6 py-2 bg-gren-500 text-gray-200 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      {children}
    </button>
  );
};

export default Button;
