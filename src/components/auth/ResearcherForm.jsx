// src/components/auth/ResearcherForm.jsx
import React from 'react';

const ResearcherForm = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={onChange}
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
            onChange={onChange}
            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Institution/University *</label>
        <input
          type="text"
          name="institution"
          value={formData.institution || ''}
          onChange={onChange}
          className={`form-input ${errors.institution ? 'border-red-500' : ''}`}
          required
        />
        {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
      </div>

      <div>
        <label className="form-label">Department/Faculty</label>
        <input
          type="text"
          name="department"
          value={formData.department || ''}
          onChange={onChange}
          className="form-input"
          placeholder="Department or faculty name"
        />
      </div>

      <div>
        <label className="form-label">Research Field *</label>
        <input
          type="text"
          name="researchField"
          value={formData.researchField || ''}
          onChange={onChange}
          className={`form-input ${errors.researchField ? 'border-red-500' : ''}`}
          required
          placeholder="ex: Artificial Intelligence, Biotechnology, Renewable Energy..."
        />
        {errors.researchField && <p className="text-red-500 text-xs mt-1">{errors.researchField}</p>}
      </div>

      <div>
        <label className="form-label">Position/Title *</label>
        <select
          name="position"
          value={formData.position || ''}
          onChange={onChange}
          className={`form-input ${errors.position ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select your position</option>
          <option value="phd">PhD Student</option>
          <option value="postdoc">Post-Doctoral Researcher</option>
          <option value="assistant_professor">Assistant Professor</option>
          <option value="associate_professor">Associate Professor</option>
          <option value="professor">Professor</option>
          <option value="research_scientist">Research Scientist</option>
          <option value="lab_director">Lab Director</option>
          <option value="other">Other</option>
        </select>
        {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="form-label">Research Interests/Expertise</label>
        <textarea
          name="researchInterests"
          value={formData.researchInterests || ''}
          onChange={onChange}
          className="form-input"
          rows="3"
          placeholder="Describe your research interests, expertise, and current projects..."
        />
      </div>

      <div>
        <label className="form-label">ORCID ID (optional)</label>
        <input
          type="text"
          name="orcid"
          value={formData.orcid || ''}
          onChange={onChange}
          className="form-input"
          placeholder="0000-0000-0000-0000"
          pattern="\d{4}-\d{4}-\d{4}-\d{3}[\dX]"
        />
      </div>

      <div className="flex items-center">
        <input
          id="newsletterConsent"
          name="newsletterConsent"
          type="checkbox"
          checked={formData.newsletterConsent || false}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="newsletterConsent" className="ml-2 block text-sm text-gray-900">
          I want to receive collaboration opportunities and updates
        </label>
      </div>
    </div>
  );
};

export default ResearcherForm;