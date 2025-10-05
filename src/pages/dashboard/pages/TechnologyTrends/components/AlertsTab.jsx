import React, { useState } from 'react';
import AlertCard from './AlertCard';
import CreateAlertModal from './CreateAlertModal';


const AlertsTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'New Funding: Biomedical AI Research',
      type: 'funding',
      priority: 'high',
      date: '2023-10-16',
      description: 'New grant opportunity for AI applications in biomedical research. Deadline: Nov 30, 2023.',
      read: false
    },
    {
      id: 2,
      title: 'Conference: Biotech Innovations 2023',
      type: 'event',
      priority: 'medium',
      date: '2023-10-14',
      description: 'Early bird registration ends this week for the premier biotech conference.',
      read: true
    },
    {
      id: 3,
      title: 'Patent Filed: Novel Drug Delivery System',
      type: 'patent',
      priority: 'high',
      date: '2023-10-10',
      description: 'Competitor has filed a patent for a drug delivery technology in your research area.',
      read: false
    },
    {
      id: 4,
      title: 'Journal Special Issue: Sustainable MedTech',
      type: 'publication',
      priority: 'low',
      date: '2023-10-05',
      description: 'Call for papers for special issue on sustainable medical technology.',
      read: true
    }
  ]);

  // Function to mark an alert as read
  const handleMarkAsRead = (alertId) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  // Function to handle alert settings (parameter icon)
  const handleAlertSettings = (alertId) => {
    // This function is no longer needed as the navigation is handled in AlertCard
    // Keeping it for backward compatibility if needed elsewhere
    console.log(`Alert settings for ID: ${alertId}`);
  };

  // Function to create a new alert
  const handleCreateAlert = (newAlertData) => {
    const newAlert = {
      ...newAlertData,
      id: Math.max(...alerts.map(a => a.id), 0) + 1, // Ensure unique ID
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    setShowCreateModal(false);
    
    // Show success dialog instead of alert
    setSuccessMessage(`Alert "${newAlert.title}" created successfully!`);
    setShowSuccessDialog(true);
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    setSuccessMessage('');
  };

  // Filter alerts based on active filters
  const filteredAlerts = alerts.filter(alert => {
    // Read status filter
    if (activeFilter === 'unread' && alert.read) {
      return false;
    }
    
    // Priority filter
    if (priorityFilter && alert.priority !== priorityFilter) {
      return false;
    }
    
    return true;
  });

  const handleFilterClick = (filterType) => {
    if (filterType === 'all') {
      setActiveFilter('all');
      setPriorityFilter(null);
    } else if (filterType === 'unread') {
      setActiveFilter('unread');
      setPriorityFilter(null);
    }
  };

  const handlePriorityFilterClick = (priority) => {
    if (priorityFilter === priority) {
      setPriorityFilter(null); // Toggle off if already selected
    } else {
      setPriorityFilter(priority);
      setActiveFilter('all'); // Reset read filter when priority is selected
    }
  };

  return (
    <div className="space-y-4">
      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={handleDialogClose}
                className="w-full bg-accentblue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-textprimary">Personalized Alerts</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          <i className="fas fa-plus mr-2"></i>Create New Alert
        </button>
      </div>

      {/* Alert Filters */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => handleFilterClick('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeFilter === 'all' && !priorityFilter
              ? 'bg-accentblue text-white'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          All Alerts
        </button>
        <button 
          onClick={() => handleFilterClick('unread')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            activeFilter === 'unread'
              ? 'bg-accentblue text-white'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          Unread Only
        </button>
        <button 
          onClick={() => handlePriorityFilterClick('high')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            priorityFilter === 'high'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          High Priority
        </button>
        <button 
          onClick={() => handlePriorityFilterClick('medium')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            priorityFilter === 'medium'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          Medium Priority
        </button>
        <button 
          onClick={() => handlePriorityFilterClick('low')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            priorityFilter === 'low'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          Low Priority
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            onMarkAsRead={handleMarkAsRead}
            onSettingsClick={handleAlertSettings}
          />
        ))}
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-bell-slash text-3xl text-textlight mb-3"></i>
            <p className="text-textsecondary">No alerts match your current filters</p>
          </div>
        )}
      </div>

      {/* Create Alert Modal */}
      <CreateAlertModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateAlert={handleCreateAlert}
      />
    </div>
  );
};

export default AlertsTab;