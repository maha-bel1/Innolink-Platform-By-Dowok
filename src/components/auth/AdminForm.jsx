// src/components/auth/AdminForm.jsx
import React from 'react';

const AdminForm = ({ formData, onChange, errors }) => {
  // Use the onChange prop directly
  const handleChange = onChange;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
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
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Organization *</label>
        <input
          type="text"
          name="organization"
          value={formData.organization || ''}
          onChange={handleChange}
          className={`form-input ${errors.organization ? 'border-red-500' : ''}`}
          required
        />
        {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
      </div>

      <div>
        <label className="form-label">Position *</label>
        <input
          type="text"
          name="position"
          value={formData.position || ''}
          onChange={handleChange}
          className={`form-input ${errors.position ? 'border-red-500' : ''}`}
          required
        />
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="adminNewsletterConsent"
          name="newsletterConsent"
          type="checkbox"
          checked={formData.newsletterConsent || false}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="adminNewsletterConsent" className="ml-2 block text-sm text-gray-900">
          I want to receive platform updates and announcements
        </label>
      </div>
    </div>
  );
};

export default AdminForm;