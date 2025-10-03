// src/components/auth/CompanyForm.jsx
import React from 'react';

const CompanyForm = ({ formData, onChange, errors }) => {
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
      <div>
        <label className="form-label">Company Name *</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.companyName ? 'border-red-500' : ''}`}
          required
        />
        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
      </div>

      <div>
        <label className="form-label">Industry *</label>
        <select
          name="industry"
          value={formData.industry || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.industry ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select an industry</option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="energy">Energy</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="financial">Financial Services</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
        {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
      </div>

      <div>
        <label className="form-label">Company Size *</label>
        <select
          name="companySize"
          value={formData.companySize || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.companySize ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select size</option>
          <option value="startup">Startup (1-10 employees)</option>
          <option value="sme">SME (11-250 employees)</option>
          <option value="mid">Mid-size (251-1000 employees)</option>
          <option value="large">Large Enterprise (1000+ employees)</option>
        </select>
        {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>}
      </div>

      <div>
        <label className="form-label">Your Position in the Company *</label>
        <input
          type="text"
          name="position"
          value={formData.position || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.position ? 'border-red-500' : ''}`}
          required
          placeholder="ex: R&D Director, Innovation Project Manager..."
        />
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="form-label">Company Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="form-input"
          rows="3"
          placeholder="Brief description of your company and its focus areas..."
        />
      </div>

      <div>
        <label className="form-label">Website (optional)</label>
        <input
          type="url"
          name="website"
          value={formData.website || ''}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://..."
        />
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
          I want to receive innovation opportunities and updates
        </label>
      </div>
    </div>
  );
};

export default CompanyForm;