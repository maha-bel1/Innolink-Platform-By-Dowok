import React, { useState, useEffect } from 'react';
import Card from '../../../../components/common/Card';

const PreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    // Workspace preferences
    autoSave: true,
    saveInterval: 5,
    defaultView: 'list',
    showRecentProjects: true,
    projectSortOrder: 'name',
    
    // Notification preferences
    desktopNotifications: true,
    soundNotifications: false,
    notificationDuration: 5,
    
    // Accessibility preferences
    highContrastMode: false,
    reduceAnimations: false,
    screenReaderSupport: true,
    keyboardShortcuts: true
  });

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setPreferences(parsedPreferences);
      
      // Apply notification settings when component loads
      applyNotificationSettings(parsedPreferences);
      // Apply accessibility settings when component loads
      applyAccessibilitySettings(parsedPreferences);
    }
  }, []);

  // Apply accessibility settings to the UI
  const applyAccessibilitySettings = (prefs) => {
    // Apply high contrast mode
    if (prefs.highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply reduced animations
    if (prefs.reduceAnimations) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply screen reader support (adds ARIA attributes and improves semantics)
    if (prefs.screenReaderSupport) {
      document.documentElement.setAttribute('aria-live', 'polite');
      // This would typically involve more comprehensive ARIA implementation
      console.log('Screen reader support enabled');
    } else {
      document.documentElement.removeAttribute('aria-live');
    }
    
    // Keyboard shortcuts would be implemented in event listeners
    console.log('Accessibility settings applied:', {
      highContrastMode: prefs.highContrastMode,
      reduceAnimations: prefs.reduceAnimations,
      screenReaderSupport: prefs.screenReaderSupport,
      keyboardShortcuts: prefs.keyboardShortcuts
    });
  };

  // Show message in dialog
  const showMessage = (message) => {
    setDialogMessage(message);
    setShowMessageDialog(true);
  };

  // Apply notification settings based on preferences
  const applyNotificationSettings = (prefs) => {
    // In a real application, you would integrate with the browser's Notification API
    console.log('Applying notification settings:', {
      desktopNotifications: prefs.desktopNotifications,
      soundNotifications: prefs.soundNotifications,
      notificationDuration: prefs.notificationDuration
    });
    
    // Request notification permission if desktop notifications are enabled
    if (prefs.desktopNotifications && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          console.log('Notification permission:', permission);
        });
      }
    }
    
    // Test sound notification if enabled
    if (prefs.soundNotifications) {
      console.log('Sound notifications enabled');
      // In a real app, you would initialize sound notification system here
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    const updatedPreferences = {
      ...preferences,
      [name]: newValue
    };
    
    setPreferences(updatedPreferences);
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    
    // Apply notification settings immediately when they change
    if (name.startsWith('desktopNotifications') || 
        name.startsWith('soundNotifications') || 
        name.startsWith('notificationDuration')) {
      applyNotificationSettings(updatedPreferences);
      
      // Show a test notification when settings change
      if (name !== 'notificationDuration') {
        showTestNotification(updatedPreferences);
      }
    }
    
    // Apply accessibility settings immediately when they change
    if (name.startsWith('highContrastMode') || 
        name.startsWith('reduceAnimations') || 
        name.startsWith('screenReaderSupport') || 
        name.startsWith('keyboardShortcuts')) {
      applyAccessibilitySettings(updatedPreferences);
      
      // Show confirmation message for accessibility changes
      if (name === 'highContrastMode') {
        showMessage(`High contrast mode ${newValue ? 'enabled' : 'disabled'}`);
      } else if (name === 'reduceAnimations') {
        showMessage(`Animations ${newValue ? 'reduced' : 'enabled'}`);
      } else if (name === 'screenReaderSupport') {
        showMessage(`Screen reader support ${newValue ? 'enabled' : 'disabled'}`);
      } else if (name === 'keyboardShortcuts') {
        showMessage(`Keyboard shortcuts ${newValue ? 'enabled' : 'disabled'}`);
      }
    }
    
    // If project sort order changed, apply it to projects
    if (name === 'projectSortOrder') {
      applyProjectSortOrder(newValue);
    }
  };

  // Show a test notification based on current settings
  const showTestNotification = (prefs) => {
    // Desktop notification test
    if (prefs.desktopNotifications && 'Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('InnoLink Preferences', {
        body: 'This is a test notification. Your notification settings have been updated successfully.',
        icon: '/favicon.ico',
        tag: 'preferences-test'
      });
      
      // Auto-close after the specified duration
      setTimeout(() => {
        notification.close();
      }, prefs.notificationDuration * 1000);
      
      notification.onclick = () => {
        console.log('Notification clicked');
        window.focus();
      };
    }
    
    // Sound notification test
    if (prefs.soundNotifications) {
      playNotificationSound();
    }
  };

  // Play a notification sound
  const playNotificationSound = () => {
    // In a real app, you would use a proper audio file
    console.log('Playing notification sound');
    
    // Create audio context and play a simple tone
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
      
      setTimeout(() => {
        oscillator.stop();
      }, 500);
    } catch (error) {
      console.log('Could not play sound notification:', error);
    }
  };

  const applyProjectSortOrder = (order) => {
    // This function would typically interact with your project management system
    // For now, we'll just log the change and show a message
    console.log(`Projects sorted by: ${order}`);
    
    // Show message in dialog instead of alert
    showMessage(`Projects will now be sorted by ${order.replace('_', ' ')}`);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Apply all settings
    applyNotificationSettings(preferences);
    applyAccessibilitySettings(preferences);
    
    // Show confirmation with current settings
    showMessage(`Preferences saved successfully!\n\nDesktop Notifications: ${preferences.desktopNotifications ? 'Enabled' : 'Disabled'}\nSound Notifications: ${preferences.soundNotifications ? 'Enabled' : 'Disabled'}\nNotification Duration: ${preferences.notificationDuration} seconds`);
  };

  const handleResetPreferences = () => {
    const defaultPreferences = {
      autoSave: true,
      saveInterval: 5,
      defaultView: 'list',
      showRecentProjects: true,
      projectSortOrder: 'name',
      desktopNotifications: true,
      soundNotifications: false,
      notificationDuration: 5,
      highContrastMode: false,
      reduceAnimations: false,
      screenReaderSupport: true,
      keyboardShortcuts: true
    };
    
    setPreferences(defaultPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    
    // Apply default settings
    applyNotificationSettings(defaultPreferences);
    applyAccessibilitySettings(defaultPreferences);
    
    showMessage('Preferences reset to default values.');
    setShowResetConfirmation(false);
  };

  const handleResetClick = () => {
    setShowResetConfirmation(true);
  };

  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  return (
    <div className="relative">
      {/* Reset Confirmation Dialog */}
      {showResetConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCancelReset}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              Confirm Reset
            </h3>
            <p className="text-textsecondary mb-6">
              Are you sure you want to reset all preferences to default values? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelReset}
                className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPreferences}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Dialog */}
      {showMessageDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseMessageDialog}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              Notification
            </h3>
            <p className="text-textsecondary mb-6 whitespace-pre-line">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-textprimary">Preferences</h2>
          <button
            onClick={handleResetClick}
            className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Reset to Defaults
          </button>
        </div>

        <form onSubmit={handleSavePreferences}>
          {/* Workspace Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-textprimary mb-4 flex items-center">
              <i className="fas fa-desktop mr-2 text-accentblue"></i>
              Workspace
            </h3>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Auto Save</h4>
                  <p className="text-sm text-textsecondary">Automatically save your work periodically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoSave"
                    checked={preferences.autoSave}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {preferences.autoSave && (
                <div className="pl-4">
                  <label className="block text-sm font-medium text-textprimary mb-2">
                    Auto Save Interval (minutes)
                  </label>
                  <input
                    type="range"
                    name="saveInterval"
                    min="1"
                    max="30"
                    value={preferences.saveInterval}
                    onChange={handlePreferenceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-textsecondary">
                    <span>1 min</span>
                    <span>{preferences.saveInterval} mins</span>
                    <span>30 mins</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Default View
                </label>
                <select
                  name="defaultView"
                  value={preferences.defaultView}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                >
                  <option value="list">List View</option>
                  <option value="grid">Grid View</option>
                  <option value="card">Card View</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Sort Projects By
                </label>
                <select
                  name="projectSortOrder"
                  value={preferences.projectSortOrder}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                  <option value="date">Date (Newest First)</option>
                  <option value="date_asc">Date (Oldest First)</option>
                  <option value="size">Size (Largest First)</option>
                  <option value='size_asc'>Size (Smallest First)</option>
                  <option value="type">Type</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="showRecentProjects"
                  checked={preferences.showRecentProjects}
                  onChange={handlePreferenceChange}
                  className="rounded border-border text-accentblue focus:ring-accentblue"
                />
                <span className="ml-2 text-sm text-textprimary">Show recent projects on dashboard</span>
                </label>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-textprimary mb-4 flex items-center">
              <i className="fas fa-bell mr-2 text-accentblue"></i>
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Desktop Notifications</h4>
                  <p className="text-sm text-textsecondary">Show desktop notifications for important events</p>
                  {!preferences.desktopNotifications && (
                    <p className="text-xs text-textsecondary mt-1">
                      {!('Notification' in window) ? 
                        'Your browser does not support desktop notifications' : 
                        Notification.permission === 'denied' ?
                        'Notification permission denied. Please enable it in your browser settings.' :
                        'Enable to receive browser notifications'
                      }
                    </p>
                  )}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="desktopNotifications"
                    checked={preferences.desktopNotifications}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                    disabled={!('Notification' in window) || Notification.permission === 'denied'}
                  />
                  <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    (!('Notification' in window) || Notification.permission === 'denied') ? 
                      'bg-gray-100 cursor-not-allowed' : 
                      preferences.desktopNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Sound Notifications</h4>
                  <p className="text-sm text-textsecondary">Play sounds for notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="soundNotifications"
                    checked={preferences.soundNotifications}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Notification Duration (seconds)
                </label>
                <input
                  type="range"
                  name="notificationDuration"
                  min="2"
                  max="10"
                  value={preferences.notificationDuration}
                  onChange={handlePreferenceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-textsecondary">
                  <span>2 sec</span>
                  <span>{preferences.notificationDuration} sec</span>
                  <span>10 sec</span>
                </div>
                <p className="text-xs text-textsecondary mt-2">
                  Duration that desktop notifications remain visible
                </p>
              </div>

              {/* Test Notification Button */}
              <div className="p-4 border border-border rounded-lg bg-gray-50">
                <button
                  type="button"
                  onClick={() => showTestNotification(preferences)}
                  className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <i className="fas fa-bell mr-2"></i>
                  Test Notification Settings
                </button>
                <p className="text-xs text-textsecondary mt-2">
                  Test your current notification settings
                </p>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-textprimary mb-4 flex items-center">
              <i className="fas fa-universal-access mr-2 text-accentblue"></i>
              Accessibility
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">High Contrast Mode</h4>
                  <p className="text-sm text-textsecondary">Increase color contrast for better visibility</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="highContrastMode"
                    checked={preferences.highContrastMode}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Reduce Animations</h4>
                  <p className="text-sm text-textsecondary">Minimize animations and transitions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="reduceAnimations"
                    checked={preferences.reduceAnimations}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Screen Reader Support</h4>
                  <p className="text-sm text-textsecondary">Optimize for screen readers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="screenReaderSupport"
                    checked={preferences.screenReaderSupport}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-textprimary">Keyboard Shortcuts</h4>
                  <p className="text-sm text-textsecondary">Enable keyboard navigation shortcuts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="keyboardShortcuts"
                    checked={preferences.keyboardShortcuts}
                    onChange={handlePreferenceChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
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

export default PreferencesTab;