import React from 'react';
import Card from '../../../../../components/common/Card'; // Updated path

const FiltersSection = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  const categories = [
    { key: 'all', label: 'All Trends', icon: 'fas fa-star' },
    { key: 'artificial-intelligence', label: 'Artificial Intelligence', icon: 'fas fa-brain' },
    { key: 'biotech', label: 'Biotechnology', icon: 'fas fa-dna' },
    { key: 'nanotechnology', label: 'Nanotechnology', icon: 'fas fa-microscope' },
    { key: 'quantum-computing', label: 'Quantum Computing', icon: 'fas fa-atom' },
    { key: 'iot', label: 'Internet of Things', icon: 'fas fa-network-wired' },
    { key: 'sustainability', label: 'Sustainability', icon: 'fas fa-leaf' }
  ];

  return (
    <Card className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-accentblue text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              <i className={`${icon} mr-2`}></i>
              {label}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <i className="fas fa-search text-textlight absolute left-3 top-2.5"></i>
          <input
            type="text"
            placeholder="Search trends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accentblue w-64"
          />
        </div>
      </div>
    </Card>
  );
};

export default FiltersSection;