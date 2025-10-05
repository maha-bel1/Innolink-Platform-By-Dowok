// src/components/sections/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  const steps = [
    { step: 1, title: 'Create a Profile', desc: 'Researchers and companies complete detailed profiles with expertise and needs.' },
    { step: 2, title: 'AI Matching', desc: 'Our algorithm recommends ideal partners based on your requirements.' },
    { step: 3, title: 'Collaborate', desc: 'Use project spaces to co-create and track progress together.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-c-5 uppercase">How InnoLink Works</h2>
          <p className="text-c-4 mt-2 max-w-2xl mx-auto">Three simple steps to accelerate innovation.</p>
        </div>
        
        {/* Colored section with opacity */}
        <div className="relative mb-16 rounded-lg overflow-hidden bg-gradient-to-r from-c-3/70 to-c-4/70 p-8 text-center">
          <div className="absolute inset-0 bg-white opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-c-5 mb-4">Streamlined Innovation Process</h3>
            <p className="text-c-5 max-w-2xl mx-auto">
              Our platform connects researchers and businesses through an intuitive, AI-powered matching system.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-around items-start gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-16 h-16 bg-c-3 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {step.step}
              </div>
              <h4 className="font-bold text-lg text-c-5 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;