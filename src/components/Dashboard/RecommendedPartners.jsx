import React from 'react';
import Card from '../common/Card';

const RecommendedPartners = () => {
  const partners = [
    { name: 'TechMed Solutions', field: 'Medical Robotics', match: 92, color: 'accentblue' },
    { name: 'BioLab Innovations', field: 'Biotechnology', match: 87, color: 'accentpurple' },
    { name: 'NeuroTech Analytics', field: 'Medical AI', match: 84, color: 'accentgreen' },
  ];

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Recommended Partners</h3>
        <button className="text-xs text-accentblue hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full bg-${partner.color} flex items-center justify-center mr-3`}>
                <span className="text-white font-semibold">
                  {partner.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-textprimary font-medium">{partner.name}</p>
                <p className="text-xs text-textsecondary">{partner.field}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 bg-${partner.color} bg-opacity-10 text-${partner.color} rounded-full`}>
              {partner.match}% match
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedPartners;