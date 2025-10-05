// src/components/auth/ResearcherForm.jsx
import React from 'react';

const ResearcherForm = ({ formData, onChange, errors }) => {
  // Use the onChange prop directly
  const handleChange = onChange;

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Institution *</label>
        <input
          type="text"
          name="institution"
          value={formData.institution || ''}
          onChange={handleChange}
          className={`form-input ${errors.institution ? 'border-red-500' : ''}`}
          required
        />
        {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
      </div>

      <div>
        <label className="form-label">Department *</label>
        <input
          type="text"
          name="department"
          value={formData.department || ''}
          onChange={handleChange}
          className={`form-input ${errors.department ? 'border-red-500' : ''}`}
          required
        />
        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
      </div>

      <div>
        <label className="form-label">Research Field *</label>
        <input
          type="text"
          name="researchField"
          value={formData.researchField || ''}
          onChange={handleChange}
          className={`form-input ${errors.researchField ? 'border-red-500' : ''}`}
          required
        />
        {errors.researchField && <p className="text-red-500 text-xs mt-1">{errors.researchField}</p>}
      </div>

      <div>
        <label className="form-label">Position *</label>
        <select
          name="position"
          value={formData.position || ''}
          onChange={handleChange}
          className={`form-input ${errors.position ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select position</option>
          <option value="professor">Professor</option>
          <option value="associate">Associate Professor</option>
          <option value="assistant">Assistant Professor</option>
          <option value="researcher">Researcher</option>
          <option value="postdoc">Post-doctoral Researcher</option>
          <option value="phd">PhD Student</option>
          <option value="other">Other</option>
        </select>
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="form-label">Research Interests</label>
        <textarea
          name="researchInterests"
          value={formData.researchInterests || ''}
          onChange={handleChange}
          className="form-input"
          rows="3"
          placeholder="Brief description of your research interests and expertise..."
        />
      </div>

      <div>
        <label className="form-label">ORCID ID (optional)</label>
        <input
          type="text"
          name="orcid"
          value={formData.orcid || ''}
          onChange={handleChange}
          className="form-input"
          placeholder="0000-0000-0000-0000"
        />
      </div>

      <div className="flex items-center">
        <input
          id="researcherNewsletterConsent"
          name="newsletterConsent"
          type="checkbox"
          checked={formData.newsletterConsent || false}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="researcherNewsletterConsent" className="ml-2 block text-sm text-gray-900">
          I want to receive research opportunities and updates
        </label>
      </div>
    </div>
  );
};

export default ResearcherForm;