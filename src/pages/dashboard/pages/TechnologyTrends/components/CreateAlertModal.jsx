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
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (!alertData.title.trim()) {
      setErrorMessage('Please enter an alert title');
      setShowErrorDialog(true);
      return;
    }
    
    if (!alertData.description.trim()) {
      setErrorMessage('Please enter an alert description');
      setShowErrorDialog(true);
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

  const handleErrorDialogClose = () => {
    setShowErrorDialog(false);
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Error Dialog */}
      {showErrorDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Validation Error</h3>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <button
                onClick={handleErrorDialogClose}
                className="w-full bg-accentblue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

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