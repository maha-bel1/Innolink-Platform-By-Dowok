// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import innolinkLogo from '../../assets/img/innolinklogo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle navigation - works on both home and other pages
  const handleNavigation = (sectionId) => {
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  // Function to handle logo click - navigates to home
  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Don't render header on auth pages
  if (['/login', '/register', '/forgot-password', '/admin-login'].includes(location.pathname)) {
    return null;
  }

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-c-5 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo with hover effect */}
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img 
            src={innolinkLogo} 
            alt="InnoLink by Dowok" 
            className="h-12 w-auto rounded-lg shadow-md border-2 border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-white/40"
          />
          <span className="ml-3 text-white font-bold text-lg hidden sm:block">
            InnoLink
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-white">
          <button 
            onClick={() => handleNavigation('features')}
            className="hover:text-c-2 transition-colors font-medium relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-c-2 transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('testimonials')}
            className="hover:text-c-2 transition-colors font-medium relative group"
          >
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-c-2 transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('opportunities')}
            className="hover:text-c-2 transition-colors font-medium relative group"
          >
            Opportunities
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-c-2 transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('contact')}
            className="hover:text-c-2 transition-colors font-medium relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-c-2 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="px-4 py-2 text-white font-semibold hover:text-c-2 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register"
            className="px-6 py-2 bg-c-4 text-white rounded-lg font-semibold hover:bg-c-5 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;