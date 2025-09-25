// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset with token:', token, formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="form-container">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">IL</span>
              </div>
              <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                Password updated
              </h2>
            </div>

            <div className="mt-8">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-800 text-center text-sm">
                  Your password has been successfully reset.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="form-container">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">IL</span>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Create new password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="form-label">
                  New password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;