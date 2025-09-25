import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const FundingForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectType: '',
    fundingAmount: '',
    duration: '',
    description: '',
    objectives: '',
    methodology: '',
    expectedOutcomes: '',
    teamMembers: '',
    budgetBreakdown: '',
    supportingDocuments: null
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingApplicationId, setEditingApplicationId] = useState(null);

  const projectTypes = [
    'Research & Development',
    'Prototype Development',
    'Clinical Trials',
    'Technology Transfer',
    'Commercialization',
    'Other'
  ];

  // Sample data for existing applications (in a real app, this would come from an API)
  const existingApplications = {
    1: {
      projectTitle: 'AI-Powered Diagnostic Tool for Early Cancer Detection',
      projectType: 'Research & Development',
      fundingAmount: '750000',
      duration: '24',
      description: 'Development of an AI-powered diagnostic tool that can detect early signs of cancer from medical imaging with higher accuracy than current methods.',
      objectives: 'Develop machine learning algorithms for image analysis\nAchieve at least 95% accuracy in cancer detection\nCreate a user-friendly interface for medical professionals',
      methodology: 'We will use convolutional neural networks (CNNs) trained on a dataset of annotated medical images. The model will be validated through clinical trials with partner hospitals.',
      expectedOutcomes: 'A working prototype of the diagnostic tool\nPeer-reviewed publications on the methodology\nPotential for commercialization and widespread adoption',
      teamMembers: 'Dr. Sophie Martin - Lead Researcher\nDr. James Dawson - AI Specialist\nLisa Thompson - Software Developer',
      budgetBreakdown: 'Personnel: 450,000 TND\nEquipment: 150,000 TND\nClinical Trials: 100,000 TND\nMiscellaneous: 50,000 TND'
    },
    2: {
      projectTitle: 'Development of Biocompatible Nano-sensors',
      projectType: 'Prototype Development',
      fundingAmount: '450000',
      duration: '18',
      description: 'Development of nano-sensors that can be safely used in medical applications without causing adverse reactions.',
      objectives: 'Design biocompatible nano-sensors\nTest sensor accuracy and reliability\nDevelop manufacturing process for mass production',
      methodology: 'We will use advanced materials science techniques to create sensors that are both sensitive and biocompatible.',
      expectedOutcomes: 'Functional prototype of nano-sensors\nClinical testing results\nManufacturing process documentation',
      teamMembers: 'Dr. Ahmed Khan - Materials Scientist\nDr. Maria Rodriguez - Biomedical Engineer\nDavid Wilson - Manufacturing Specialist',
      budgetBreakdown: 'Materials: 200,000 TND\nPersonnel: 200,000 TND\nTesting: 50,000 TND'
    }
  };

  useEffect(() => {
    // Check if we're editing an existing application
    if (location.state && location.state.isEditing && location.state.applicationId) {
      setIsEditing(true);
      setEditingApplicationId(location.state.applicationId);
      
      // Pre-fill the form with existing application data
      const applicationId = location.state.applicationId;
      if (existingApplications[applicationId]) {
        setFormData(existingApplications[applicationId]);
      }
    }
    
    // Check if a grant ID was passed from the FundingDetails page
    if (location.state && location.state.grantId) {
      setSelectedGrant(location.state.grantId);
    }
  }, [location.state, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'supportingDocuments') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      console.log('Updating application:', editingApplicationId, formData);
      alert(`Application #${editingApplicationId} updated successfully!`);
    } else {
      console.log('Form submitted:', formData);
      alert('Funding application submitted successfully!');
    }
    
    navigate('/funding'); // Redirect back to funding page after submission
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">
          {isEditing ? 'Edit Application' : 'Apply for Funding'}
        </h1>
        <p className="text-textsecondary">
          {isEditing ? 'Update your funding application' : 'Submit your project for funding consideration'}
        </p>
        
        {selectedGrant && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <i className="fas fa-info-circle mr-1"></i>
              You are applying for a specific funding opportunity. Your application will be reviewed for this grant.
            </p>
          </div>
        )}

        {isEditing && (
          <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-700">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              You are editing application #{editingApplicationId}. Note that some fields may not be editable after submission.
            </p>
          </div>
        )}
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-4">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  required
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Funding Amount Requested (TND) *
                </label>
                <input
                  type="number"
                  name="fundingAmount"
                  required
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Project Duration (months) *
                </label>
                <input
                  type="number"
                  name="duration"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Enter duration"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Describe your project in detail..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Objectives *
                </label>
                <textarea
                  name="objectives"
                  rows={3}
                  required
                  value={formData.objectives}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="List the main objectives of your project..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Methodology *
                </label>
                <textarea
                  name="methodology"
                  rows={3}
                  required
                  value={formData.methodology}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Describe the methodology you will use..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Expected Outcomes *
                </label>
                <textarea
                  name="expectedOutcomes"
                  rows={3}
                  required
                  value={formData.expectedOutcomes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="What outcomes do you expect from this project?"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-4">Team & Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Team Members *
                </label>
                <textarea
                  name="teamMembers"
                  rows={3}
                  required
                  value={formData.teamMembers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="List team members and their roles..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textprimary mb-2">
                  Budget Breakdown (TND) *
                </label>
                <textarea
                  name="budgetBreakdown"
                  rows={3}
                  required
                  value={formData.budgetBreakdown}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                  placeholder="Provide a detailed budget breakdown in Tunisian Dinars..."
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-4">Supporting Documents</h3>
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Upload Project Proposal (PDF)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <i className="fas fa-cloud-upload-alt text-3xl text-textlight mb-2"></i>
                    <p className="mb-2 text-sm text-textsecondary">Click to upload or drag and drop</p>
                    <p className="text-xs text-textlight">PDF (max. 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    name="supportingDocuments" 
                    onChange={handleChange} 
                    className="hidden" 
                    accept=".pdf" 
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/funding')}
              className="px-6 py-3 text-textsecondary border border-border rounded-lg hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              {isEditing ? 'Update Application' : 'Submit Application'}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default FundingForm;