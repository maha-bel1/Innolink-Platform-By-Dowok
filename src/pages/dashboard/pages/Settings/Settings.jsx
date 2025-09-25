import React, { useState, useEffect } from 'react';
import SettingsSidebar from './SettingsSidebar';
import ProfileTab from './ProfileTab';
import NotificationsTab from './NotificationsTab';
import SecurityTab from './SecurityTab';
import PreferencesTab from './PreferencesTab';
import BillingTab from './BillingTab';
import ChangePassword from './ChangePassword';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  
  const [userData, setUserData] = useState({
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@example.com',
    title: 'AI Research Scientist',
    organization: 'Dowok Research Institute',
    bio: 'AI Research Scientist specializing in medical diagnostics and machine learning applications in healthcare.',
    phone: '+216 12 345 678',
    location: 'Tunis, Tunisia',
    profilePhoto: null,
    profileInitials: 'SM'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    fundingOpportunities: true,
    eventReminders: true,
    newsletter: false,
    securityAlerts: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordLastChanged: '2023-08-15'
  });

  const showMessage = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setShowMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  // Initialize notification settings when component mounts
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      
      // Apply notification settings
      if (preferences.desktopNotifications && 'Notification' in window) {
        if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
      }
    }
  }, []);

  // Auto-save simulation based on preferences
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      
      if (preferences.autoSave) {
        const interval = preferences.saveInterval * 60 * 1000; // Convert minutes to milliseconds
        const autoSaveTimer = setInterval(() => {
          console.log('Auto-saving work...');
          // In a real app, this would trigger your actual save functionality
        }, interval);
        
        return () => clearInterval(autoSaveTimer);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    showMessage('Profile Updated', 'Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    showMessage('Notifications Saved', 'Notification preferences saved!');
  };

  const toggleTwoFactorAuth = () => {
    const newTwoFactorAuthState = !securitySettings.twoFactorAuth;
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorAuth: newTwoFactorAuthState
    }));
    showMessage('Two-Factor Authentication', newTwoFactorAuthState ? 'Two-factor authentication enabled!' : 'Two-factor authentication disabled!');
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
    // Update the last changed date
    setSecuritySettings(prev => ({
      ...prev,
      passwordLastChanged: new Date().toISOString().split('T')[0]
    }));
  };

  const handlePasswordChangeCancel = () => {
    setShowChangePassword(false);
  };

  const renderActiveTab = () => {
    if (showChangePassword) {
      return (
        <ChangePassword 
          onSuccess={handlePasswordChangeSuccess}
          onCancel={handlePasswordChangeCancel}
        />
      );
    }

    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab 
            userData={userData} 
            setUserData={setUserData} 
            onSave={handleSaveProfile} 
          />
        );
      case 'notifications':
        return (
          <NotificationsTab 
            notificationSettings={notificationSettings} 
            setNotificationSettings={setNotificationSettings} 
            onSave={handleSaveNotifications} 
          />
        );
      case 'security':
        return (
          <SecurityTab 
            securitySettings={securitySettings} 
            setSecuritySettings={setSecuritySettings}
            onToggleTwoFactorAuth={toggleTwoFactorAuth}
            onChangePassword={handleChangePassword}
          />
        );
      case 'preferences':
        return <PreferencesTab />;
      case 'billing':
        return <BillingTab />;
      default:
        return <ProfileTab userData={userData} setUserData={setUserData} onSave={handleSaveProfile} />;
    }
  };

  return (
    <>
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

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">Settings</h1>
        <p className="text-textsecondary">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {!showChangePassword && (
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        <div className={showChangePassword ? "w-full" : "lg:w-3/4"}>
          {renderActiveTab()}
        </div>
      </div>
    </>
  );
};

export default Settings;