import React, { useState } from 'react';
import Card from '../../../../../components/common/Card'; // Updated path

const CreateAlertModal = ({ isOpen, onClose, onCreateAlert }) => {
  const [alertData, setAlertData] = useState({
    title: '',
    type: 'funding',
    priority: 'medium',
    description: '',
    keywords: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!alertData.title.trim() || !alertData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    onCreateAlert({
      ...alertData,
      id: Date.now(), // Generate a unique ID
      date: new Date().toISOString().split('T')[0],
      read: false
    });
    
    // Reset form
    setAlertData({
      title: '',
      type: 'funding',
      priority: 'medium',
      description: '',
      keywords: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 card-hover">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-textprimary">Create New Alert</h2>
          <button 
            onClick={onClose}
            className="text-textsecondary hover:text-textprimary text-lg transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Alert Title *
            </label>
            <input
              type="text"
              name="title"
              value={alertData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
              placeholder="Enter alert title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Alert Type
              </label>
              <select
                name="type"
                value={alertData.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
              >
                <option value="funding">Funding Opportunity</option>
                <option value="event">Event</option>
                <option value="patent">Patent</option>
                <option value="publication">Publication</option>
                <option value="trend">Technology Trend</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Priority Level
              </label>
              <select
                name="priority"
                value={alertData.priority}
                onChange={handleInputChange}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={alertData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
              placeholder="Enter alert description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              name="keywords"
              value={alertData.keywords}
              onChange={handleInputChange}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
              placeholder="e.g., AI, healthcare, diagnostics"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-border text-textsecondary rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Create Alert
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateAlertModal;