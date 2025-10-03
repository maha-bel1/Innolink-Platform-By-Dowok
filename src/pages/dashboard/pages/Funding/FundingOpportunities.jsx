// src/pages/dashboard/pages/Funding/FundingOpportunities.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const FundingOpportunities = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample funding opportunities data
  const fundingData = [
    {
      id: 1,
      title: 'Research Innovation Grant',
      organization: 'National Science Foundation',
      amount: '€1,500,000',
      deadline: '2023-12-15',
      category: 'research',
      fields: ['Medical Research', 'Biotechnology', 'Healthcare'],
      description: 'Funding for innovative research projects in medical and healthcare technologies that address critical challenges in public health.',
      eligibility: 'Research institutions, universities, and private research labs with proven track record.',
      applicationProcess: 'Two-stage application with initial proposal and final detailed submission.',
      status: 'open'
    },
    {
      id: 2,
      title: 'Green Technology Development Fund',
      organization: 'European Commission',
      amount: '€2,000,000',
      deadline: '2023-11-30',
      category: 'development',
      fields: ['Renewable Energy', 'Sustainability', 'Climate Tech'],
      description: 'Supporting the development of innovative green technologies that contribute to climate change mitigation and environmental sustainability.',
      eligibility: 'SMEs, research institutions, and startups working on sustainable technology solutions.',
      applicationProcess: 'Single-stage application with detailed project plan and budget.',
      status: 'open'
    },
    {
      id: 3,
      title: 'AI for Social Good',
      organization: 'Tech for Humanity Foundation',
      amount: '€800,000',
      deadline: '2023-10-15',
      category: 'innovation',
      fields: ['Artificial Intelligence', 'Social Impact', 'Education'],
      description: 'Funding for AI projects that address social challenges and improve quality of life for underserved communities.',
      eligibility: 'Non-profits, social enterprises, and research teams with AI expertise.',
      applicationProcess: 'Rolling application with quarterly reviews.',
      status: 'closed'
    },
    {
      id: 4,
      title: 'Advanced Materials Research Grant',
      organization: 'Materials Science Institute',
      amount: '€1,200,000',
      deadline: '2024-01-20',
      category: 'research',
      fields: ['Materials Science', 'Nanotechnology', 'Manufacturing'],
      description: 'Supporting research in advanced materials with applications in manufacturing, construction, and consumer products.',
      eligibility: 'Academic institutions and research labs with specialized equipment and expertise.',
      applicationProcess: 'Two-stage application with preliminary and full proposal phases.',
      status: 'open'
    },
    {
      id: 5,
      title: 'Digital Health Innovation Fund',
      organization: 'Health Technology Association',
      amount: '€950,000',
      deadline: '2023-12-05',
      category: 'innovation',
      fields: ['Digital Health', 'Telemedicine', 'Health Informatics'],
      description: 'Funding for innovative digital health solutions that improve healthcare delivery, patient outcomes, and medical data management.',
      eligibility: 'Health tech startups, research institutions, and healthcare providers.',
      applicationProcess: 'Single-stage application with pitch presentation to selection committee.',
      status: 'open'
    }
  ];

  const filteredFunding = fundingData
    .filter(item => {
      if (filter === 'all') return true;
      if (filter === 'open') return item.status === 'open';
      if (filter === 'closed') return item.status === 'closed';
      return item.category === filter;
    })
    .filter(item => {
      if (!searchTerm) return true;
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

  const handleViewDetails = (id) => {
    navigate(`/dashboard/funding/details/${id}`);
  };

  const handleApply = (id) => {
    navigate(`/dashboard/funding/apply/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-textprimary">Funding Opportunities</h1>
          <p className="text-textsecondary">Discover grants and funding options for your research</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/funding/saved')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <i className="fas fa-bookmark mr-2"></i>
          Saved Opportunities
        </button>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search by title, organization, or field..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'open' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setFilter('research')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'research' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Research
              </button>
              <button
                onClick={() => setFilter('development')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'development' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Development
              </button>
              <button
                onClick={() => setFilter('innovation')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'innovation' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Innovation
              </button>
              <button
                onClick={() => setFilter('closed')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'closed' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Closed
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Funding Opportunities List */}
      <div className="space-y-4">
        {filteredFunding.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl text-gray-300 mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-500">No funding opportunities found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredFunding.map(funding => (
            <Card key={funding.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-primary">{funding.title}</h3>
                      <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                        funding.status === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {funding.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{funding.organization}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {funding.fields.map((field, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {field}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4">{funding.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500 uppercase">Amount</p>
                        <p className="font-semibold">{funding.amount}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500 uppercase">Deadline</p>
                        <p className="font-semibold">
                          {new Date(funding.deadline).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500 uppercase">Category</p>
                        <p className="font-semibold capitalize">{funding.category}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 md:ml-6 mt-4 md:mt-0">
                    <button
                      onClick={() => handleViewDetails(funding.id)}
                      className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded transition duration-300"
                    >
                      View Details
                    </button>
                    {funding.status === 'open' && (
                      <button
                        onClick={() => handleApply(funding.id)}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
                      >
                        Apply Now
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-primary py-2 px-4 rounded transition duration-300 flex items-center justify-center">
                      <i className="fas fa-bookmark mr-2"></i>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FundingOpportunities;