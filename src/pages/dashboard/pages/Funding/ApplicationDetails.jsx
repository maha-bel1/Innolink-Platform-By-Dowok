import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real application, you would fetch the application data based on the ID
  const application = {
    id: parseInt(id),
    title: 'AI-Powered Diagnostic Tool for Early Cancer Detection',
    type: 'Research & Development',
    amount: '750,000 TND',
    status: 'Under Review',
    statusColor: 'bg-yellow-100 text-yellow-800',
    date: 'Oct 15, 2023',
    deadline: 'Nov 30, 2023',
    description: 'Development of an AI-powered diagnostic tool that can detect early signs of cancer from medical imaging with higher accuracy than current methods.',
    objectives: [
      'Develop machine learning algorithms for image analysis',
      'Achieve at least 95% accuracy in cancer detection',
      'Create a user-friendly interface for medical professionals'
    ],
    methodology: 'We will use convolutional neural networks (CNNs) trained on a dataset of annotated medical images. The model will be validated through clinical trials with partner hospitals.',
    expectedOutcomes: [
      'A working prototype of the diagnostic tool',
      'Peer-reviewed publications on the methodology',
      'Potential for commercialization and widespread adoption'
    ],
    teamMembers: [
      { name: 'Dr. Sophie Martin', role: 'Lead Researcher' },
      { name: 'Dr. James Dawson', role: 'AI Specialist' },
      { name: 'Lisa Thompson', role: 'Software Developer' }
    ],
    budgetBreakdown: [
      { category: 'Personnel', amount: '450,000 TND' },
      { category: 'Equipment', amount: '150,000 TND' },
      { category: 'Clinical Trials', amount: '100,000 TND' },
      { category: 'Miscellaneous', amount: '50,000 TND' }
    ]
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/funding')}
            className="mr-3 p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-3xl font-bold text-textprimary">Application Details</h1>
        </div>
        <p className="text-textsecondary">Viewing details for application #{id}</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-textprimary mb-2">{application.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-textsecondary mb-3">
              <span>{application.type}</span>
              <span>•</span>
              <span className="font-medium">{application.amount}</span>
              <span>•</span>
              <span>Applied: {application.date}</span>
              <span>•</span>
              <span>Decision by: {application.deadline}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
              {application.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-3">Project Description</h3>
            <p className="text-textsecondary">{application.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-3">Objectives</h3>
            <ul className="list-disc list-inside text-textsecondary space-y-1">
              {application.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-3">Methodology</h3>
            <p className="text-textsecondary">{application.methodology}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-textprimary mb-3">Expected Outcomes</h3>
            <ul className="list-disc list-inside text-textsecondary space-y-1">
              {application.expectedOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-textprimary mb-3">Team Members</h3>
              <ul className="space-y-2">
                {application.teamMembers.map((member, index) => (
                  <li key={index} className="text-textsecondary">
                    <span className="font-medium">{member.name}</span> - {member.role}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-textprimary mb-3">Budget Breakdown</h3>
              <ul className="space-y-2">
                {application.budgetBreakdown.map((item, index) => (
                  <li key={index} className="flex justify-between text-textsecondary">
                    <span>{item.category}:</span>
                    <span className="font-medium">{item.amount}</span>
                  </li>
                ))}
                <li className="flex justify-between text-textprimary font-semibold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>{application.amount}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => navigate('/funding')}
              className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Back to Applications
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ApplicationDetails;