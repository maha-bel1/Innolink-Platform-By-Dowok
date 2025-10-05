import React, { useState } from 'react';
import Card from '../../../../components/common/Card';

const SecurityTab = ({ securitySettings, setSecuritySettings, onToggleTwoFactorAuth, onChangePassword }) => {
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

  const toggleLoginAlerts = () => {
    setSecuritySettings(prev => ({
      ...prev,
      loginAlerts: !prev.loginAlerts
    }));
    showMessage('Login Alerts', `Login alerts ${!securitySettings.loginAlerts ? 'enabled' : 'disabled'}`);
  };

  const handleSignOutSession = () => {
    showMessage('Session Signed Out', 'Session signed out successfully!');
  };

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
        <h2 className="text-xl font-semibold text-textprimary mb-6">Security Settings</h2>
        
        <div className="space-y-6">
          <div className="p-5 border border-border rounded-lg">
            <h3 className="font-medium text-textprimary mb-3">Two-Factor Authentication</h3>
            <p className="text-sm text-textsecondary mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${securitySettings.twoFactorAuth ? 'text-green-600' : 'text-textsecondary'}`}>
                {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
              </span>
              <button 
                onClick={onToggleTwoFactorAuth}
                className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
              >
                {securitySettings.twoFactorAuth ? 'Disable' : 'Enable'} 2FA
              </button>
            </div>
          </div>
          
          <div className="p-5 border border-border rounded-lg">
            <h3 className="font-medium text-textprimary mb-3">Login Alerts</h3>
            <p className="text-sm text-textsecondary mb-4">Get notified when someone signs in to your account from a new device.</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${securitySettings.loginAlerts ? 'text-green-600' : 'text-textsecondary'}`}>
                {securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.loginAlerts}
                  onChange={toggleLoginAlerts}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="p-5 border border-border rounded-lg">
            <h3 className="font-medium text-textprimary mb-3">Password</h3>
            <p className="text-sm text-textsecondary mb-4">Last changed: {securitySettings.passwordLastChanged}</p>
            <button 
              onClick={onChangePassword}
              className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              Change Password
            </button>
          </div>
          
          <div className="p-5 border border-border rounded-lg">
            <h3 className="font-medium text-textprimary mb-3">Active Sessions</h3>
            <p className="text-sm text-textsecondary mb-4">You're currently signed in on this device.</p>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-textsecondary">Tunis, Tunisia • Just now</p>
              </div>
              <button 
                onClick={handleSignOutSession}
                className="text-accentblue hover:underline text-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecurityTab;