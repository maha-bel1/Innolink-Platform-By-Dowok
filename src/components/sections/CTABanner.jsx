// src/components/sections/CTABanner.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CTABanner = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle contact navigation
  const handleContactClick = () => {
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to contact section
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the homepage, just scroll to contact section
      const element = document.getElementById('contact');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  // Function to handle sign up navigation
  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <section id="cta" className="relative py-20 bg-c-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-c-3/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-c-2/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Innovation?
          </h2>
          <p className="text-xl text-c-1 mb-8 leading-relaxed">
            Join hundreds of leading researchers and forward-thinking companies 
            on InnoLink's AI-powered collaboration platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleSignUpClick}
              className="px-8 py-4 bg-white text-c-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2 min-w-[200px]"
            >
              <span>Start Your Journey</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            
            <button 
              onClick={handleContactClick}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2 min-w-[200px]"
            >
              <span>Schedule a Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-c-3/30">
            <p className="text-c-2 text-sm font-medium mb-4">Trusted by industry leaders</p>
            <div className="flex justify-center items-center space-x-8 opacity-80">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">500+</span>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">92%</span>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;