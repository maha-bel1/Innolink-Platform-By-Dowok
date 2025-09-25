import React, { useState } from 'react';
import TrendsTab from './components/TrendsTab';
import AlertsTab from './components/AlertsTab';
import SourcesTab from './components/SourcesTab';
import Card from '../../../../components/common/Card';

const TechnologyTrends = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [savedTrends, setSavedTrends] = useState(new Set());
  
  // Sample trends data (same as in TrendsTab)
  const allTrends = [
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

  // Function to handle saving/unsaving trends
  const handleSaveTrend = (trendId, isSaved) => {
    const newSavedTrends = new Set(savedTrends);
    if (isSaved) {
      newSavedTrends.add(trendId);
    } else {
      newSavedTrends.delete(trendId);
    }
    setSavedTrends(newSavedTrends);
  };

  // Function to export all saved trends
  const handleExportAll = () => {
    if (savedTrends.size === 0) {
      alert('No trends to export!');
      return;
    }

    const savedTrendsData = allTrends.filter(trend => savedTrends.has(trend.id));
    
    // Create CSV content
    const csvContent = [
      ['Title', 'Category', 'Impact', 'Date', 'Description', 'Tags', 'Source', 'Relevance'],
      ...savedTrendsData.map(trend => [
        trend.title,
        trend.category,
        trend.impact,
        trend.date,
        trend.description,
        trend.tags.join(', '),
        trend.source,
        trend.relevance + '%'
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'saved_trends_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Exported ${savedTrends.size} trends successfully!`);
  };

  // Get the actual saved trend objects
  const savedTrendsData = allTrends.filter(trend => savedTrends.has(trend.id));

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">Technology Trends</h1>
        <p className="text-textsecondary">Stay updated with the latest developments in your field</p>
      </div>

      <div className="space-y-6">
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i>Trends & Insights
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'alerts'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-bell mr-2"></i>My Alerts
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sources'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-rss mr-2"></i>Sources
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'saved'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-bookmark mr-2"></i>Saved Trends ({savedTrends.size})
            </button>
          </nav>
        </div>

        {activeTab === 'trends' && <TrendsTab savedTrends={savedTrends} onSaveTrend={handleSaveTrend} />}
        {activeTab === 'alerts' && <AlertsTab />}
        {activeTab === 'sources' && <SourcesTab />}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-textprimary">Your Saved Trends</h2>
              {savedTrends.size > 0 && (
                <button 
                  onClick={handleExportAll}
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <i className="fas fa-download mr-2"></i>Export All
                </button>
              )}
            </div>
            
            {savedTrends.size > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTrendsData.map(trend => (
                  <TrendCard 
                    key={trend.id} 
                    trend={trend} 
                    isInitiallySaved={true}
                    onSaveChange={(isSaved) => handleSaveTrend(trend.id, isSaved)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <i className="fas fa-bookmark text-4xl text-textlight mb-4"></i>
                <h3 className="text-lg font-medium text-textprimary mb-2">No trends saved yet</h3>
                <p className="text-textsecondary mb-4">Click the save button on any trend to add it to your collection</p>
                <button 
                  onClick={() => setActiveTab('trends')}
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Browse Trends
                </button>
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TechnologyTrends;