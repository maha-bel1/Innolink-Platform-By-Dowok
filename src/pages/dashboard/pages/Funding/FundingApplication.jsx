// src/pages/dashboard/pages/Funding/FundingApplication.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const FundingApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: '',
    abstract: '',
    duration: '',
    budget: '',
    team: [],
    objectives: '',
    methodology: '',
    impact: '',
    timeline: '',
    riskAssessment: '',
    files: []
  });
  const [teamMember, setTeamMember] = useState({
    name: '',
    role: '',
    institution: '',
    expertise: ''
  });

  // Sample funding opportunity data (in a real app, this would be fetched from an API)
  const fundingOpportunity = {
    id: id,
    title: 'Research Innovation Grant',
    organization: 'National Science Foundation',
    amount: '€1,500,000',
    deadline: '2023-12-15',
    category: 'research',
    fields: ['Medical Research', 'Biotechnology', 'Healthcare'],
    description: 'Funding for innovative research projects in medical and healthcare technologies that address critical challenges in public health.'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamMember({
      ...teamMember,
      [name]: value
    });
  };

  const addTeamMember = () => {
    if (teamMember.name && teamMember.role) {
      setFormData({
        ...formData,
        team: [...formData.team, teamMember]
      });
      setTeamMember({
        name: '',
        role: '',
        institution: '',
        expertise: ''
      });
    }
  };

  const removeTeamMember = (index) => {
    const updatedTeam = [...formData.team];
    updatedTeam.splice(index, 1);
    setFormData({
      ...formData,
      team: updatedTeam
    });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));
    
    setFormData({
      ...formData,
      files: [...formData.files, ...newFiles]
    });
  };

  const removeFile = (index) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      files: updatedFiles
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the application data to an API
    setShowSuccessDialog(true);
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    navigate('/dashboard/funding');
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  currentStep === step 
                    ? 'border-primary bg-primary text-white' 
                    : currentStep > step 
                      ? 'border-primary bg-white text-primary' 
                      : 'border-gray-300 bg-white text-gray-300'
                }`}
              >
                {currentStep > step ? (
                  <i className="fas fa-check"></i>
                ) : (
                  step
                )}
              </div>
              <span className="mt-2 text-sm text-gray-600">
                {step === 1 && 'Basic Info'}
                {step === 2 && 'Team'}
                {step === 3 && 'Details'}
                {step === 4 && 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your application for <strong>{fundingOpportunity.title}</strong> has been submitted successfully. 
                You will receive a confirmation email shortly.
              </p>
              <button
                onClick={handleDialogClose}
                className="w-full bg-accentblue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Back to Funding Opportunities
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard/funding')}
          className="flex items-center text-primary hover:text-primary-dark mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Funding
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Apply for Funding</h1>
        <p className="text-gray-600 mt-2">
          Complete the application form for: <strong>{fundingOpportunity.title}</strong>
        </p>
      </div>

      {renderStepIndicator()}

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abstract/Summary *
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide a brief summary of your project"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration (months) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Requested (€) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 500000"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Team Members</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={teamMember.name}
                    onChange={handleTeamInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={teamMember.role}
                    onChange={handleTeamInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Principal Investigator"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={teamMember.institution}
                    onChange={handleTeamInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Affiliated institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={teamMember.expertise}
                    onChange={handleTeamInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Area of expertise"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Add Team Member
              </button>

              {formData.team.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
                  <div className="space-y-2">
                    {formData.team.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{member.name}</span> - {member.role}
                          {member.institution && (
                            <span className="text-gray-600 ml-2">({member.institution})</span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Project Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectives and Goals *
                </label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe the specific objectives and goals of your project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Methodology *
                </label>
                <textarea
                  name="methodology"
                  value={formData.methodology}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe the methodology and approach you will use"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Impact *
                </label>
                <textarea
                  name="impact"
                  value={formData.impact}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe the expected impact and outcomes of your project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Timeline
                </label>
                <textarea
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide a high-level timeline for your project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Assessment
                </label>
                <textarea
                  name="riskAssessment"
                  value={formData.riskAssessment}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Identify potential risks and mitigation strategies"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-center">
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                      <p className="text-gray-600">Click to upload files or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 10MB each)</p>
                    </div>
                  </label>
                </div>
                
                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Review and Submit</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Application Summary</h3>
                
                <div className="space-y-3">
                  <div>
                    <strong>Project Title:</strong> {formData.projectTitle}
                  </div>
                  <div>
                    <strong>Duration:</strong> {formData.duration} months
                  </div>
                  <div>
                    <strong>Budget:</strong> €{formData.budget}
                  </div>
                  <div>
                    <strong>Team Members:</strong> {formData.team.length}
                  </div>
                  <div>
                    <strong>Supporting Documents:</strong> {formData.files.length} files
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-yellow-800">Before you submit:</h4>
                    <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                      <li>• Ensure all information is accurate and complete</li>
                      <li>• Verify that all required documents are attached</li>
                      <li>• Review the funding opportunity requirements</li>
                      <li>• This application cannot be edited after submission</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="confirmation"
                  className="mr-2"
                  required
                />
                <label htmlFor="confirmation" className="text-sm text-gray-700">
                  I confirm that all information provided is accurate and complete to the best of my knowledge
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FundingApplication;