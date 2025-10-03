// src/components/auth/InvestorForm.jsx
import React from 'react';

const InvestorForm = ({ formData, onChange, errors }) => {
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
        <label className="form-label">Organization/Investment Fund *</label>
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
        <label className="form-label">Investment Type *</label>
        <select
          name="investmentType"
          value={formData.investmentType || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.investmentType ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select a type</option>
          <option value="venture_capital">Venture Capital</option>
          <option value="angel">Angel Investor</option>
          <option value="corporate">Corporate Investment</option>
          <option value="private_equity">Private Equity</option>
          <option value="public">Public Fund</option>
          <option value="other">Other</option>
        </select>
        {errors.investmentType && <p className="text-red-500 text-xs mt-1">{errors.investmentType}</p>}
      </div>

      <div>
        <label className="form-label">Investment Stage Focus</label>
        <select
          name="investmentStage"
          value={formData.investmentStage || ''}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select investment stage</option>
          <option value="seed">Seed</option>
          <option value="early">Early Stage</option>
          <option value="growth">Growth Stage</option>
          <option value="late">Late Stage</option>
          <option value="all">All Stages</option>
        </select>
      </div>

      <div>
        <label className="form-label">Sectors of Interest *</label>
        <input
          type="text"
          name="interestSectors"
          value={formData.interestSectors || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.interestSectors ? 'border-red-500' : ''}`}
          required
          placeholder="ex: Biotech, AI, Renewable Energy..."
        />
        {errors.interestSectors && <p className="text-red-500 text-xs mt-1">{errors.interestSectors}</p>}
      </div>

      <div>
        <label className="form-label">Typical Investment Range (TND)</label>
        <select
          name="investmentRange"
          value={formData.investmentRange || ''}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select investment range</option>
          <option value="under_50k">Under 50,000 TND</option>
          <option value="50k_100k">50,000 - 100,000 TND</option>
          <option value="100k_250k">100,000 - 250,000 TND</option>
          <option value="250k_500k">250,000 - 500,000 TND</option>
          <option value="500k_1m">500,000 - 1M TND</option>
          <option value="1m_2m">1M - 2M TND</option>
          <option value="over_2m">Over 2M TND</option>
        </select>
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

export default InvestorForm;