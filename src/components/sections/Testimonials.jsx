// src/components/sections/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Amina Kader',
      role: 'CNRS Researcher',
      initials: 'AK',
      quote: 'InnoLink connected me with a deeptech startup in 48 hours. We secured a €1.2M grant together!',
    },
    {
      name: 'Lucas Bernard',
      role: 'R&D Director, GreenWave SAS',
      initials: 'LB',
      quote: 'The AI suggestions were perfect. We found the exact academic partner we needed for our battery recycling project.',
    },
    {
      name: 'Prof. Elena Rossi',
      role: 'Politecnico di Milano',
      initials: 'ER',
      quote: 'A transparent platform to manage collaborations and funding calls. Highly recommended!',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-c-5 mb-16 text-center relative pb-2">
          Trusted By Professionals
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-c-3"></span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full mr-4 bg-c-2 flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-c-5">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;