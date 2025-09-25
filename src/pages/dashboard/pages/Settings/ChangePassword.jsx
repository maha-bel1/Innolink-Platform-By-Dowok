import React, { useState } from 'react';
import Card from '../../../../components/common/Card';

const ChangePassword = ({ onSuccess, onCancel }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would make an API call here
      console.log('Password change submitted:', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      showMessage('Password Changed', 'Password changed successfully!');
      onSuccess();
    } catch (error) {
      showMessage('Error', 'Failed to change password. Please try again.');
      console.error('Password change error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="flex items-center mb-6">
          <button 
            onClick={onCancel}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <i className="fas fa-arrow-left text-textsecondary"></i>
          </button>
          <h2 className="text-xl font-semibold text-textprimary">Change Password</h2>
        </div>
        
        <p className="text-textsecondary mb-6">
          For security reasons, please enter your current password and then your new password twice.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-textprimary mb-2">
              Current Password *
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue ${
                errors.currentPassword ? 'border-red-500' : 'border-border'
              }`}
              placeholder="Enter your current password"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-textprimary mb-2">
              New Password *
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue ${
                errors.newPassword ? 'border-red-500' : 'border-border'
              }`}
              placeholder="Enter your new password"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
            <p className="mt-2 text-xs text-textsecondary">
              Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers.
            </p>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-textprimary mb-2">
              Confirm New Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue ${
                errors.confirmPassword ? 'border-red-500' : 'border-border'
              }`}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Changing Password...
                </>
              ) : (
                'Change Password'
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;