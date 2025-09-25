import React, { useState } from 'react';
import SourceCard from './SourceCard';
import Card from "../../../../../components/common/Card";

const SourcesTab = () => {
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'journal',
    url: '',
    category: ''
  });

  const journalSources = [
    { name: 'Nature Journal', status: 'Active', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-20', articles: 15 },
    { name: 'Science Magazine', status: 'Active', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-18', articles: 8 },
    { name: 'IEEE Transactions', status: 'Expiring Soon', statusColor: 'bg-yellow-100 text-yellow-800', lastUpdate: '2023-10-15', articles: 12 },
    { name: 'Cell Press', status: 'Active', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-22', articles: 6 }
  ];

  const patentSources = [
    { name: 'USPTO', status: 'Connected', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-21', patents: 23 },
    { name: 'EPO', status: 'Connected', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-19', patents: 17 },
    { name: 'WIPO', status: 'Connected', statusColor: 'bg-green-100 text-green-800', lastUpdate: '2023-10-17', patents: 31 }
  ];

  const conferenceSources = [
    { name: 'IEEE Conferences', status: 'Tracking', statusColor: 'bg-green-100 text-green-800', nextEvent: '2023-11-15', events: 5 },
    { name: 'ACM Events', status: 'Tracking', statusColor: 'bg-green-100 text-green-800', nextEvent: '2023-12-01', events: 3 },
    { name: 'BioTech Summit', status: 'Tracking', statusColor: 'bg-green-100 text-green-800', nextEvent: '2024-01-20', events: 2 }
  ];

  const handleAddSource = () => {
    // In a real application, this would connect to an API
    console.log('Adding new source:', newSource);
    alert(`Source "${newSource.name}" added successfully!`);
    setShowAddSourceModal(false);
    setNewSource({ name: '', type: 'journal', url: '', category: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSource(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-textprimary">Knowledge Sources</h2>
          <p className="text-textsecondary">Manage your research and information sources</p>
        </div>
        <button 
          onClick={() => setShowAddSourceModal(true)}
          className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          <i className="fas fa-plus mr-2"></i>Add New Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SourceCard 
          title="Journal Subscriptions" 
          sources={journalSources}
          type="journal"
        />
        
        <SourceCard 
          title="Patent Databases" 
          sources={patentSources}
          type="patent"
        />
        
        <SourceCard 
          title="Conference Trackers" 
          sources={conferenceSources}
          type="conference"
        />
        
        <Card className="p-5 card-hover">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-accentblue mb-4"></i>
            <h3 className="text-lg font-semibold text-textprimary mb-2">Source Analytics</h3>
            <p className="text-textsecondary mb-4">
              Track performance and engagement across your knowledge sources
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-accentblue">42</div>
                <div className="text-xs text-textsecondary">Total Sources</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-accentgreen">38</div>
                <div className="text-xs text-textsecondary">Active Sources</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Source Modal */}
      {showAddSourceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 card-hover">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-textprimary">Connect New Source</h3>
              <button 
                onClick={() => setShowAddSourceModal(false)}
                className="text-textsecondary hover:text-textprimary"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">Source Name</label>
                <input
                  type="text"
                  name="name"
                  value={newSource.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent"
                  placeholder="e.g., Nature Journal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">Source Type</label>
                <select
                  name="type"
                  value={newSource.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent"
                >
                  <option value="journal">Journal/Publication</option>
                  <option value="patent">Patent Database</option>
                  <option value="conference">Conference Tracker</option>
                  <option value="rss">RSS Feed</option>
                  <option value="api">API Connection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">URL/Endpoint</label>
                <input
                  type="url"
                  name="url"
                  value={newSource.url}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent"
                  placeholder="https://example.com/rss or API endpoint"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">Category/Tags</label>
                <input
                  type="text"
                  name="category"
                  value={newSource.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent"
                  placeholder="e.g., AI, Biotechnology, Healthcare"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddSourceModal(false)}
                  className="px-4 py-2 border border-border text-textsecondary rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSource}
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600"
                >
                  Connect Source
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SourcesTab;