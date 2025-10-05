// src/components/ui/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-c-5">{title}</h2>
      <p className="text-c-4 mt-2 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;