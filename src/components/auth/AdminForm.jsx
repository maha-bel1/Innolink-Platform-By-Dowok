// src/components/auth/AdminForm.jsx
import React from 'react';

const AdminForm = ({ formData, onChange, errors }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      target: {
        name,
        value: type === 'checkbox' ? checked : value
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Organization/Institution *</label>
        <input
          type="text"
          name="organization"
          value={formData.organization || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.organization ? 'border-red-500' : ''}`}
          required
        />
        {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
      </div>

      <div>
        <label className="form-label">Admin Key *</label>
        <input
          type="password"
          name="adminKey"
          value={formData.adminKey || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.adminKey ? 'border-red-500' : ''}`}
          required
          placeholder="Enter your admin authorization key"
        />
        {errors.adminKey && <p className="text-red-500 text-xs mt-1">{errors.adminKey}</p>}
      </div>

      <div>
        <label className="form-label">Position/Title *</label>
        <input
          type="text"
          name="position"
          value={formData.position || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.position ? 'border-red-500' : ''}`}
          required
          placeholder="ex: Platform Administrator, System Manager..."
        />
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="newsletterConsent"
          name="newsletterConsent"
          type="checkbox"
          checked={formData.newsletterConsent || false}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="newsletterConsent" className="ml-2 block text-sm text-gray-900">
          I want to receive platform updates and announcements
        </label>
      </div>
    </div>
  );
};

export default AdminForm;