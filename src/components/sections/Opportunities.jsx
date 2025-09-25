// src/components/sections/Opportunities.jsx
import React from 'react';
import opportunityImg1 from '../../assets/img/img12.jpg';
import opportunityImg2 from '../../assets/img/img9.jpg';

const Opportunities = () => {
  return (
    <section id="opportunities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-c-5 mb-16 text-center relative pb-2">
          Opportunities
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-c-3"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-yellow-100 rounded-lg overflow-hidden shadow-md">
            <img 
              src={opportunityImg1} 
              alt="Collaboration opportunities" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-c-5 mb-3">Innovative Project Calls</h3>
              <p className="text-gray-600">
                Discover the latest funding opportunities for your research projects.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg overflow-hidden shadow-md">
            <img 
              src={opportunityImg2} 
              alt="Strategic partnerships" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-c-5 mb-3">Industrial Partnerships</h3>
              <p className="text-gray-600">
                Connect with companies seeking specific expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;