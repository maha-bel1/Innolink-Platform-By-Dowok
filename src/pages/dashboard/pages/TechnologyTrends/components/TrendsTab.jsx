import React, { useState } from 'react';
import Card from '../../../../../components/common/Card';
import FiltersSection from './FiltersSection';
import TrendCard from './TrendCard';

const TrendsTab = ({ savedTrends, onSaveTrend, allTrends }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the allTrends prop instead of local trends data
  const trends = allTrends || [
    {
      id: 1,
      title: 'AI in Medical Diagnostics',
      category: 'artificial-intelligence',
      impact: 'high',
      date: '2023-10-15',
      description: 'Advanced AI algorithms are revolutionizing medical imaging and diagnostics with unprecedented accuracy.',
      tags: ['AI', 'Healthcare', 'Diagnostics'],
      source: 'Journal of Medical AI',
      relevance: 95
    },
    {
      id: 2,
      title: 'Quantum Computing in Drug Discovery',
      category: 'quantum-computing',
      impact: 'medium',
      date: '2023-10-12',
      description: 'Quantum computing is accelerating molecular simulations for drug discovery by orders of magnitude.',
      tags: ['Quantum', 'Pharma', 'Simulation'],
      source: 'Nature Biotechnology',
      relevance: 88
    },
    {
      id: 3,
      title: 'Biodegradable Electronics',
      category: 'sustainability',
      impact: 'high',
      date: '2023-10-08',
      description: 'New developments in biodegradable electronic components are reducing e-waste in medical devices.',
      tags: ['Sustainability', 'Electronics', 'Medical Devices'],
      source: 'Science Advances',
      relevance: 92
    },
    {
      id: 4,
      title: 'CRISPR-Based Therapeutics',
      category: 'biotech',
      impact: 'very-high',
      date: '2023-10-05',
      description: 'Next-generation CRISPR technologies are enabling precise gene therapies for previously untreatable conditions.',
      tags: ['Biotech', 'Genetics', 'Therapeutics'],
      source: 'Cell Journal',
      relevance: 97
    },
    {
      id: 5,
      title: 'IoT in Remote Patient Monitoring',
      category: 'iot',
      impact: 'medium',
      date: '2023-10-01',
      description: 'Internet of Things devices are transforming remote patient monitoring with real-time health data collection.',
      tags: ['IoT', 'Healthcare', 'Monitoring'],
      source: 'IEEE IoT Journal',
      relevance: 85
    },
    {
      id: 6,
      title: 'Nanomaterials for Targeted Drug Delivery',
      category: 'nanotechnology',
      impact: 'high',
      date: '2023-09-28',
      description: 'Novel nanomaterials are enabling precise targeting of therapeutics to specific cells and tissues.',
      tags: ['Nanotech', 'Drug Delivery', 'Materials'],
      source: 'Nature Nanotechnology',
      relevance: 90
    }
  ];

  const filteredTrends = trends.filter(trend => {
    if (filter !== 'all' && trend.category !== filter) return false;
    if (searchTerm && !trend.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !trend.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !trend.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <FiltersSection 
        filter={filter} 
        setFilter={setFilter} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map(trend => (
          <TrendCard 
            key={trend.id} 
            trend={trend} 
            isInitiallySaved={savedTrends.has(trend.id)}
            onSaveChange={(isSaved) => onSaveTrend(trend.id, isSaved)}
          />
        ))}
      </div>

      {filteredTrends.length === 0 && (
        <Card className="p-8 text-center">
          <i className="fas fa-search text-4xl text-textlight mb-4"></i>
          <h3 className="text-lg font-medium text-textprimary mb-2">No trends found</h3>
          <p className="text-textsecondary">Try adjusting your filters or search term</p>
        </Card>
      )}
    </div>
  );
};

export default TrendsTab;