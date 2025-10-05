import React, { useState } from 'react';

const ResetPasswordForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendResetEmail = (e) => {
    e.preventDefault();
    // In a real app, you would send a request to your backend here
    setEmailSent(true);
    setTimeout(() => {
      setShowForm(true);
    }, 2000); // Simulate email sending delay
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    alert('Password has been reset successfully!');
  };

  if (!showForm) {
    return (
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white py-8 px-6 rounded-2xl shadow-2xl sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-4" onSubmit={handleSendResetEmail}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: '#4a90e2' }}
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            {emailSent && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                <i className="fas fa-check-circle mr-2"></i>
                Reset email sent! Please check your inbox.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white py-8 px-6 rounded-2xl shadow-2xl sm:px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Change Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Update password for enhanced account security.
          </p>
        </div>

        <div className="mt-8">
          <form className="space-y-4" onSubmit={handlePasswordReset}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password*
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter a new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password*
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your new password"
                />
              </div>
              <div className="mt-1 text-right">
                <span className="clear-btn text-sm" onClick={() => {
                  document.getElementById('newPassword').value = '';
                  document.getElementById('confirmPassword').value = '';
                  updatePasswordStrength();
                }}>Clear</span>
              </div>
            </div>

            <div className="divider"></div>
            
            <div className="password-requirements p-3 rounded-md">
              <div className="flex items-center mb-2">
                <span id="password-strength-text" className="text-sm font-medium text-red-600">Weak password.</span>
                <span className="text-sm ml-1">Must contain;</span>
              </div>
              
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span id="uppercase-checkbox" className="checkbox"></span>
                  At least 1 uppercase
                </li>
                <li className="flex items-center">
                  <span id="number-checkbox" className="checkbox"></span>
                  At least 1 number
                </li>
                <li className="flex items-center">
                  <span id="length-checkbox" className="checkbox"></span>
                  At least 8 characters
                </li>
              </ul>
            </div>

            <div className="flex space-x-3 justify-end pt-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowForm(false)}
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                style={{ backgroundColor: '#4a90e2' }}
              >
                Apply Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Password strength function
function updatePasswordStrength() {
  const password = document.getElementById('newPassword').value;
  const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
  const numberCheckbox = document.getElementById('number-checkbox');
  const lengthCheckbox = document.getElementById('length-checkbox');
  const strengthText = document.getElementById('password-strength-text');
  
  // Check requirements
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;
  
  // Update checkboxes
  if (hasUpperCase) {
    uppercaseCheckbox.classList.add('checked');
  } else {
    uppercaseCheckbox.classList.remove('checked');
  }
  
  if (hasNumber) {
    numberCheckbox.classList.add('checked');
  } else {
    numberCheckbox.classList.remove('checked');
  }
  
  if (hasMinLength) {
    lengthCheckbox.classList.add('checked');
  } else {
    lengthCheckbox.classList.remove('checked');
  }
  
  // Update the strength text
  if (hasUpperCase && hasNumber && hasMinLength) {
    strengthText.textContent = 'Strong password!';
    strengthText.style.color = '#22c55e';
  } else {
    strengthText.textContent = 'Weak password.';
    strengthText.style.color = '#ef4444';
  }
}

// Add event listeners when component mounts
document.addEventListener('DOMContentLoaded', function() {
  const newPasswordInput = document.getElementById('newPassword');
  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', updatePasswordStrength);
  }
});

export default ResetPasswordForm;
