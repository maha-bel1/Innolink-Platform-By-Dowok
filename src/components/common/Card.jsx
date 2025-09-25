// src/components/common/Card.jsx
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 card-hover ${className}`}>
      {children}
    </div>
  );
};

export default Card;



