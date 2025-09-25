// src/components/sections/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
    alert('Thank you for your message! We will contact you shortly.');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-c-5 mb-4 text-center relative pb-2">
          Contact Us
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-c-3"></span>
        </h2>
        
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have questions about InnoLink? Our team is here to help you 
          connect research to innovation.
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Information */}
          <div className="md:w-1/3">
            <div className="bg-c-1 p-8 rounded-lg border border-c-2">
              <h3 className="text-xl font-bold text-c-5 mb-6 text-center">Our Contact Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-c-3 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-c-5 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">+216 24 675 155</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-c-3 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-c-5 mb-1">Address</h4>
                    <p className="text-gray-600 text-sm">InnoLink by Dowok</p>
                    <p className="text-gray-600 text-sm">Sousse, Tunisia</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-c-5 mb-3 text-center">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  {/* LinkedIn Link */}
                  <a 
                    href="https://www.linkedin.com/company/dowok" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-c-3 text-white rounded-full flex items-center justify-center hover:bg-c-4 transition-colors transform hover:scale-110"
                    aria-label="Visit our LinkedIn page"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* Facebook Link */}
                  <a 
                    href="https://www.facebook.com/profile.php?id=100089348551605" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-c-3 text-white rounded-full flex items-center justify-center hover:bg-c-4 transition-colors transform hover:scale-110"
                    aria-label="Visit our Facebook page"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-c-5 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-c-3 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-c-5 mb-2">
                    Professional Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-c-3 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-c-5 mb-2">
                  Organization *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-c-3 focus:border-transparent transition-colors"
                  placeholder="Your university or company name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-c-5 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-c-3 focus:border-transparent transition-colors"
                  placeholder="Describe your research project or innovation needs..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="rounded border-gray-300 text-c-3 focus:ring-c-3 mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    I accept the terms of use and privacy policy
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-c-3 text-white py-3 px-6 rounded-lg font-semibold hover:bg-c-4 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;