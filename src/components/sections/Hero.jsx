// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/img/img5.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with blue overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Blue overlay with decreased opacity */}
        <div className="absolute inset-0 bg-blue-900 opacity-45"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 pt-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
          InnoLink by Dowok
        </h1>
        <h2 className="text-xl text-c-2 mb-6">
          Connecting Research to Innovation, Transforming Ideas into Impact
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          InnoLink by Dowok accelerates deep-tech collaborations between researchers,
          companies, and investors through AI-powered matching.
        </p>
        
      </div>
    </section>
  );
};

export default Hero;