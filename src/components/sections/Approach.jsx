// src/components/sections/Approach.jsxs
import React from 'react';
import approachImg1 from '../../assets/img/img13.jpg';
import approachImg2 from '../../assets/img/img6.jpg';

const Approach = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Content - Left Side */}
          <div className="md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold text-c-5 mb-6 relative pb-2">
              Our Approach
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-c-3"></span>
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl">
              We enable researchers, companies, and investors to co-create the future. 
              Through AI-powered matching, end-to-end collaboration tools, and tailored 
              funding pathways, InnoLink transforms cutting-edge research into concrete 
              solutions faster than ever before.
            </p>
          </div>

          {/* Images - Right Side */}
          <div className="md:w-2/5 relative">
            <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-6">
              <img 
                src={approachImg1} 
                alt="Innovation expert" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto -mt-24 ml-16">
              <img 
                src={approachImg2} 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;