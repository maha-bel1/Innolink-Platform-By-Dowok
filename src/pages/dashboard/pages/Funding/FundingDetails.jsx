import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const FundingDetails = () => {
  const [activeTab, setActiveTab] = useState('myApplications');
  const navigate = useNavigate();
  
  const fundingApplications = [
    {
      id: 1,
      title: 'AI-Powered Diagnostic Tool for Early Cancer Detection',
      type: 'Research & Development',
      amount: '750,000 TND',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: 'Oct 15, 2023',
      deadline: 'Nov 30, 2023'
    },
    {
      id: 2,
      title: 'Development of Biocompatible Nano-sensors',
      type: 'Prototype Development',
      amount: '450,000 TND',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      date: 'Sep 28, 2023',
      deadline: 'Dec 15, 2023'
    },
    {
      id: 3,
      title: 'Clinical Trial for Novel Drug Delivery System',
      type: 'Clinical Trials',
      amount: '1,500,000 TND',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      date: 'Aug 10, 2023',
      feedback: 'Insufficient preliminary data'
    }
  ];

  const availableGrants = [
    {
      id: 1,
      title: 'National Research Grant',
      amount: 'Up to 1,500,000 TND',
      deadline: 'Dec 15, 2023',
      eligibility: 'Early-career researchers in biomedical fields',
      description: 'Funding for innovative research projects with high potential impact.'
    },
    {
      id: 2,
      title: 'Biotechnology Innovation Fund',
      amount: '300,000 - 750,000 TND',
      deadline: 'Jan 20, 2024',
      eligibility: 'Startups and academic researchers',
      description: 'Support for translating research into commercial applications.'
    },
    {
      id: 3,
      title: 'Medical Technology Development Grant',
      amount: 'Up to 2,250,000 TND',
      deadline: 'Feb 28, 2024',
      eligibility: 'Research institutions and companies',
      description: 'Funding for developing cutting-edge medical devices and technologies.'
    }
  ];

  // Tunisian funding sources with actual URLs
  const tunisianFundingSources = [
    {
      name: 'Ministry of Higher Education and Scientific Research',
      url: 'https://www.mes.tn/',
      description: 'Official portal for higher education and research funding opportunities'
    },
    {
      name: 'Tunisian Agency for Technology Promotion (APII)',
      url: 'https://www.apii.tn/',
      description: 'Agency promoting innovation and technology transfer in Tunisia'
    },
    {
      name: 'National Center for Scientific Research (CNRS)',
      url: 'https://www.cnrs.tn/',
      description: 'Primary organization for scientific research funding in Tunisia'
    },
    {
      name: 'Startup Act Tunisia Funding Programs',
      url: 'https://www.startupact.tn/',
      description: 'Government initiatives supporting startups and innovation'
    }
  ];

  const handleApplyNow = (grantId) => {
    navigate('/dashboard/funding/apply', { state: { grantId } });
  };

  const handleNewApplication = () => {
    navigate('/dashboard/funding/apply');
  };

  // Handle view application details
  const handleViewApplication = (applicationId) => {
    navigate(`/dashboard/funding/application/${applicationId}`);
  };

  // Handle edit application - navigate to the application form with the application ID
  const handleEditApplication = (applicationId) => {
    navigate(`/dashboard/funding/apply/${applicationId}`, { 
      state: { 
        isEditing: true,
        applicationId: applicationId
      } 
    });
  };

  // Handle external link clicks
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">Funding Opportunities</h1>
        <p className="text-textsecondary">Manage your applications and discover new funding sources</p>
      </div>

      <div className="space-y-6">
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('myApplications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'myApplications'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('availableGrants')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availableGrants'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              Available Grants
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>

        {activeTab === 'myApplications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-textprimary">My Funding Applications</h2>
              <button 
                onClick={handleNewApplication}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                <i className="fas fa-plus mr-2"></i>New Application
              </button>
            </div>

            {fundingApplications.map((application) => (
              <Card key={application.id} className="p-5 card-hover">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-textprimary mb-2">{application.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-textsecondary mb-3">
                      <span>{application.type}</span>
                      <span>•</span>
                      <span className="font-medium">{application.amount}</span>
                      <span>•</span>
                      <span>Applied: {application.date}</span>
                      {application.deadline && (
                        <>
                          <span>•</span>
                          <span>Decision by: {application.deadline}</span>
                        </>
                      )}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
                      {application.status}
                    </span>
                    {application.feedback && (
                      <p className="text-sm text-textsecondary mt-3">
                        <span className="font-medium">Feedback: </span>
                        {application.feedback}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewApplication(application.id)}
                      className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Application Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {application.status !== 'Approved' && application.status !== 'Rejected' && (
                      <button 
                        onClick={() => handleEditApplication(application.id)}
                        className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Application"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'availableGrants' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-textprimary">Available Funding Opportunities</h2>
            
            {availableGrants.map((grant) => (
              <Card key={grant.id} className="p-5 card-hover">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-textprimary mb-2">{grant.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-textsecondary mb-3">
                      <span className="font-medium text-accentblue">{grant.amount}</span>
                      <span>•</span>
                      <span>Application Deadline: {grant.deadline}</span>
                    </div>
                    <p className="text-sm text-textprimary mb-2">
                      <span className="font-medium">Eligibility: </span>
                      {grant.eligibility}
                    </p>
                    <p className="text-sm text-textsecondary">{grant.description}</p>
                  </div>
                  <button 
                    onClick={() => handleApplyNow(grant.id)}
                    className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-textprimary">Funding Resources</h2>
            
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-textprimary mb-4">Grant Writing Tips</h3>
              <ul className="space-y-3 text-textsecondary">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accentblue mt-1 mr-3"></i>
                  <span>Clearly articulate the problem your project solves</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accentblue mt-1 mr-3"></i>
                  <span>Provide specific, measurable objectives</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accentblue mt-1 mr-3"></i>
                  <span>Justify your budget with detailed explanations</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accentblue mt-1 mr-3"></i>
                  <span>Highlight your team's qualifications and experience</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accentblue mt-1 mr-3"></i>
                  <span>Explain the potential impact of your research</span>
                </li>
              </ul>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-semibold text-textprimary mb-4">Tunisian Funding Sources</h3>
              <div className="space-y-4">
                {tunisianFundingSources.map((source, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => handleExternalLink(source.url)}
                  >
                    <div className="flex items-start">
                      <i className="fas fa-external-link-alt text-accentblue mt-1 mr-3"></i>
                      <div>
                        <h4 className="font-medium text-accentblue">{source.name}</h4>
                        <p className="text-sm text-textsecondary mt-1">{source.description}</p>
                        <p className="text-xs text-textlight mt-2">{source.url}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default FundingDetails;