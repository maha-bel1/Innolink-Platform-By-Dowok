import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../../../components/common/Card'; // Updated path

const AlertSettingsPage = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [settings, setSettings] = useState({
    frequency: 'daily',
    notificationTypes: ['email'],
    priorityThreshold: 'medium'
  });

  // Sample alert data (in a real app, this would come from an API)
  const sampleAlerts = [
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
  ];

  useEffect(() => {
    // Find the alert by ID
    const foundAlert = sampleAlerts.find(a => a.id === parseInt(alertId));
    if (foundAlert) {
      setAlert(foundAlert);
    } else {
      // Handle case where alert is not found
      console.error(`Alert with ID ${alertId} not found`);
    }
  }, [alertId]);

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Saving settings:', settings);
    setShowSuccessDialog(true);
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    navigate(-1); // Go back to previous page
  };

  const handleNotificationTypeChange = (type) => {
    setSettings(prev => {
      const newTypes = prev.notificationTypes.includes(type)
        ? prev.notificationTypes.filter(t => t !== type)
        : [...prev.notificationTypes, type];
      
      return { ...prev, notificationTypes: newTypes };
    });
  };

  if (!alert) {
    return (
      <div className="p-8 text-center">
        <p>Loading alert settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Saved!</h3>
              <p className="text-gray-600 mb-6">Your alert settings have been updated successfully.</p>
              <button
                onClick={handleDialogClose}
                className="w-full bg-accentblue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Back to Alerts
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-accentblue hover:text-blue-600 mb-4 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Alerts
        </button>
        <h1 className="text-2xl font-bold text-textprimary">Alert Settings</h1>
        <p className="text-textsecondary">Configure preferences for: {alert.title}</p>
      </div>

      <Card className="p-6 card-hover">
        <h2 className="text-lg font-semibold text-textprimary mb-4">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">Frequency</label>
            <select 
              value={settings.frequency}
              onChange={(e) => setSettings({...settings, frequency: e.target.value})}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">Notification Methods</label>
            <div className="space-y-2">
              {['email', 'browser', 'mobile'].map(type => (
                <label key={type} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.includes(type)}
                    onChange={() => handleNotificationTypeChange(type)}
                    className="rounded text-accentblue focus:ring-accentblue"
                  />
                  <span className="ml-2 text-textprimary capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">Priority Threshold</label>
            <select 
              value={settings.priorityThreshold}
              onChange={(e) => setSettings({...settings, priorityThreshold: e.target.value})}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue focus:border-transparent transition-colors"
            >
              <option value="low">Low and above</option>
              <option value="medium">Medium and above</option>
              <option value="high">High only</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border">
          <button 
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-border text-textsecondary rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveSettings}
            className="px-5 py-2.5 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AlertSettingsPage;