import React, { useState } from 'react';
import Card from '../../../../components/common/Card';

const NotificationsTab = ({ notificationSettings, setNotificationSettings, onSave }) => {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const showMessage = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setShowMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const notificationOptions = [
    {
      name: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive important updates via email'
    },
    {
      name: 'projectUpdates',
      title: 'Project Updates',
      description: 'Get notified about project activities and changes'
    },
    {
      name: 'fundingOpportunities',
      title: 'Funding Opportunities',
      description: 'Receive alerts about new funding opportunities'
    },
    {
      name: 'eventReminders',
      title: 'Event Reminders',
      description: 'Get reminders about upcoming events and webinars'
    },
    {
      name: 'newsletter',
      title: 'Newsletter',
      description: 'Receive our monthly newsletter with industry insights'
    },
    {
      name: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Get notified about important security events'
    }
  ];

  return (
    <div className="relative">
      {/* Message Dialog */}
      {showMessageDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseMessageDialog}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              {dialogTitle}
            </h3>
            <p className="text-textsecondary mb-6">
              {dialogMessage}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseMessageDialog}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-textprimary mb-6">Notification Preferences</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            {notificationOptions.map((option) => (
              <div key={option.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium text-textprimary">{option.title}</h3>
                  <p className="text-sm text-textsecondary">{option.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={option.name}
                    checked={notificationSettings[option.name]}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NotificationsTab;