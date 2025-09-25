// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RoleSelector from '../components/auth/RoleSelector';
import ResearcherForm from '../components/auth/ResearcherForm';
import CompanyForm from '../components/auth/CompanyForm';
import InvestorForm from '../components/auth/InvestorForm';
import AdminForm from '../components/auth/AdminForm';

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
    newsletterConsent: false,
    twoFactorEnabled: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!selectedRole) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service';
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy policy';
    }
    
    // Role-specific validation
    if (selectedRole === 'researcher') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.institution) newErrors.institution = 'Institution is required';
      if (!formData.researchField) newErrors.researchField = 'Research field is required';
      if (!formData.position) newErrors.position = 'Position is required';
    } else if (selectedRole === 'company') {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.position) newErrors.position = 'Your position is required';
    } else if (selectedRole === 'investor') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.organization) newErrors.organization = 'Organization is required';
      if (!formData.investmentType) newErrors.investmentType = 'Investment type is required';
      if (!formData.interestSectors) newErrors.interestSectors = 'Interest sectors are required';
    } else if (selectedRole === 'admin') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.institution) newErrors.institution = 'Institution is required';
      if (!formData.adminCode) newErrors.adminCode = 'Admin code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log('Registration data:', { ...formData, role: selectedRole });
      
      // In a real app, you would send this to your backend
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, role: selectedRole })
      // });
      
      // Simulate success
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Create a mock user object (in a real app, this would come from your API)
        const userData = {
          email: formData.email,
          role: selectedRole,
          name: formData.firstName ? `${formData.firstName} ${formData.lastName}` : formData.companyName,
          // Add other user properties as needed
        };
        
        // Update auth context and redirect
        register(userData);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const renderRoleForm = () => {
    switch (selectedRole) {
      case 'researcher':
        return <ResearcherForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 'company':
        return <CompanyForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 'investor':
        return <InvestorForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 'admin':
        return <AdminForm formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="form-container shadow-2xl rounded-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">IL</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {step === 1 ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  Select your role
                </h3>
                <RoleSelector 
                  selectedRole={selectedRole} 
                  onRoleChange={handleRoleChange} 
                />
                {errors.role && <p className="text-red-500 text-sm text-center">{errors.role}</p>}
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedRole}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      required
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                      required
                      placeholder="Create a password"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      required
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {renderRoleForm()}

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                      I accept the <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link>
                    </label>
                  </div>
                  {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}

                  <div className="flex items-center">
                    <input
                      id="acceptPrivacy"
                      name="acceptPrivacy"
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="acceptPrivacy" className="ml-2 block text-sm text-gray-900">
                      I accept the <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.acceptPrivacy && <p className="text-red-500 text-xs mt-1">{errors.acceptPrivacy}</p>}

                  <div className="flex items-center">
                    <input
                      id="newsletterConsent"
                      name="newsletterConsent"
                      type="checkbox"
                      checked={formData.newsletterConsent}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletterConsent" className="ml-2 block text-sm text-gray-900">
                      I want to receive newsletters and updates
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="twoFactorEnabled"
                      name="twoFactorEnabled"
                      type="checkbox"
                      checked={formData.twoFactorEnabled}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactorEnabled" className="ml-2 block text-sm text-gray-900">
                      Enable two-factor authentication
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;