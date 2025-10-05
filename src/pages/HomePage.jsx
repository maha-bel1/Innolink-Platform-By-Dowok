// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import Approach from '../components/sections/Approach';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import Opportunities from '../components/sections/Opportunities';
import Contact from '../components/sections/Contact';
import CTABanner from '../components/sections/CTABanner';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Approach />
      <Features />
      <Testimonials />
      <Opportunities />
      <Contact />
      <CTABanner />
    </>
  );
};

export default HomePage;