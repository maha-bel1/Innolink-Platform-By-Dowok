// src/components/auth/InvestorForm.jsx
import React from 'react';

const InvestorForm = ({ formData, onChange, errors }) => {
  // Use the onChange prop directly
  const handleChange = onChange;

  return (
    <div className="space-y-4">
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
        <label className="form-label">Investment Focus *</label>
        <select
          name="investmentFocus"
          value={formData.investmentFocus || ''}
          onChange={handleChange}
          className={`form-input ${errors.investmentFocus ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select investment focus</option>
          <option value="seed">Seed Stage</option>
          <option value="early">Early Stage</option>
          <option value="growth">Growth Stage</option>
          <option value="late">Late Stage</option>
          <option value="all">All Stages</option>
        </select>
        {errors.investmentFocus && <p className="text-red-500 text-xs mt-1">{errors.investmentFocus}</p>}
      </div>

      <div>
        <label className="form-label">Investment Range *</label>
        <select
          name="investmentRange"
          value={formData.investmentRange || ''}
          onChange={handleChange}
          className={`form-input ${errors.investmentRange ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select investment range</option>
          <option value="under50k">Under $50K</option>
          <option value="50k-250k">$50K - $250K</option>
          <option value="250k-1m">$250K - $1M</option>
          <option value="1m-5m">$1M - $5M</option>
          <option value="over5m">Over $5M</option>
        </select>
        {errors.investmentRange && <p className="text-red-500 text-xs mt-1">{errors.investmentRange}</p>}
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
          placeholder="ex: Investment Manager, Partner..."
        />
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="form-label">Investment Interests</label>
        <textarea
          name="investmentInterests"
          value={formData.investmentInterests || ''}
          onChange={handleChange}
          className="form-input"
          rows="3"
          placeholder="Brief description of your investment interests and criteria..."
        />
      </div>

      <div>
        <label className="form-label">Website (optional)</label>
        <input
          type="url"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          className="form-input"
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center">
        <input
          id="investorNewsletterConsent"
          name="newsletterConsent"
          type="checkbox"
          checked={formData.newsletterConsent || false}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="investorNewsletterConsent" className="ml-2 block text-sm text-gray-900">
          I want to receive innovation opportunities and updates
        </label>
      </div>
    </div>
  );
};

export default InvestorForm;