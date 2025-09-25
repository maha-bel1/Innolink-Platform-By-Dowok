// src/components/sections/Features.jsx
import React from 'react';
import meetingImg from '../../assets/img/img7.jpg';

const Features = () => {
  const steps = [
    {
      step: 1,
      title: 'Create a Detailed Profile',
      desc: 'Researchers and companies complete comprehensive profiles with skills, publications, and specific needs.',
    },
    {
      step: 2,
      title: 'AI Intelligent Matching',
      desc: 'Our algorithm analyzes skills and needs in real-time to suggest ideal partners.',
    },
    {
      step: 3,
      title: 'Real-time Collaboration',
      desc: 'Use secure project spaces to co-create and track collaboration progress.',
    },
    {
      step: 4,
      title: 'Results Valorization',
      desc: 'Transform your research into concrete impacts with personalized support.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-c-5 mb-16 text-center relative pb-2">
          How InnoLink Works
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-c-3"></span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Column - Enhanced Image with White Corner */}
          <div className="md:w-1/2 relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src={meetingImg} 
                alt="InnoLink collaboration process" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
                  transform: 'translateZ(0)' // GPU acceleration for smoother rendering
                }}
              />
              {/* White bottom corner effect */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-c-3 opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-c-4 opacity-10 rounded-full"></div>
          </div>
          
          {/* Right Column - Steps */}
          <div className="md:w-1/2">
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.step} className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 bg-c-3 text-white rounded-full flex items-center justify-center text-lg font-bold mr-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-c-4">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-c-5 mb-2 group-hover:text-c-4 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional information box */}
            <div className="mt-10 p-6 bg-gradient-to-r from-c-1 to-c-2 rounded-lg border-l-4 border-c-3">
              <h4 className="font-bold text-c-5 mb-2 text-lg">Our Advanced Technology</h4>
              <p className="text-c-5 text-sm">
                Our intelligent matching algorithm uses AI and machine learning to analyze 
                skills, needs, and market trends in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Stats section below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-10 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-c-3 mb-2">500+</div>
            <div className="text-gray-600">Active Collaborations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-c-3 mb-2">92%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-c-3 mb-2">24h</div>
            <div className="text-gray-600">Average Matching Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;