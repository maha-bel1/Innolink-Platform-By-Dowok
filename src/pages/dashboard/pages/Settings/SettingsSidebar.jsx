import React from 'react';
import Card from '../../../../components/common/Card';

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'user' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'security', label: 'Security', icon: 'shield-alt' },
    { id: 'preferences', label: 'Preferences', icon: 'cog' },
    { id: 'billing', label: 'Billing & Plans', icon: 'credit-card' },
  ];

  const handleSignOut = () => {
    alert('Sign out functionality would be implemented here!');
  };

  return (
    <div className="lg:w-1/4">
      <Card className="p-4 sticky top-6">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accentblue text-white'
                  : 'text-textsecondary hover:bg-gray-100'
              }`}
            >
              <i className={`fas fa-${tab.icon} mr-3`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsSidebar;