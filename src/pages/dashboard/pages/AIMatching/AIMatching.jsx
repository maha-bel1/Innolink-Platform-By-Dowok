// src/pages/dashboard/pages/AIMatching/AIMatching.jsx
import React, { useState } from 'react';
import Card from '../../../../components/common/Card';

const AIMatching = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingStrength, setMatchingStrength] = useState('strong');
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  // Sample skills data
  const availableSkills = [
    'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Computer Vision',
    'Natural Language Processing', 'Deep Learning', 'Python', 'TensorFlow',
    'PyTorch', 'Cloud Computing', 'IoT', 'Blockchain', 'Cybersecurity',
    'Bioinformatics', 'Quantum Computing', 'Robotics', 'Neuroscience',
    'Medical Imaging', 'Drug Discovery', 'Biotechnology', 'Renewable Energy'
  ];

  // Sample partner recommendations
  const partnerRecommendations = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'AI Research Scientist',
      organization: 'Tech Research Institute',
      expertise: ['Machine Learning', 'Computer Vision', 'Healthcare AI'],
      matchScore: 92,
      location: 'San Francisco, CA',
      projects: 12,
      collaborations: 8,
      availability: 'Available for new projects',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Prof. Michael Rodriguez',
      title: 'Director of AI Research',
      organization: 'University of Innovation',
      expertise: ['Natural Language Processing', 'Deep Learning', 'Education Technology'],
      matchScore: 88,
      location: 'Boston, MA',
      projects: 18,
      collaborations: 15,
      availability: 'Limited availability',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      title: 'Lead Data Scientist',
      organization: 'HealthTech Solutions',
      expertise: ['Bioinformatics', 'Medical AI', 'Data Analytics'],
      matchScore: 95,
      location: 'New York, NY',
      projects: 9,
      collaborations: 6,
      availability: 'Open to collaboration',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Alex Johnson',
      title: 'AI Engineer',
      organization: 'Startup Innovations',
      expertise: ['IoT', 'Edge Computing', 'Machine Learning'],
      matchScore: 85,
      location: 'Austin, TX',
      projects: 7,
      collaborations: 4,
      availability: 'Available immediately',
      image: '/api/placeholder/80/80'
    }
  ];

  // Sample project matches
  const projectMatches = [
    {
      id: 1,
      title: 'AI-Powered Medical Diagnostics',
      description: 'Developing AI algorithms for early disease detection using medical imaging data.',
      skills: ['Computer Vision', 'Machine Learning', 'Medical Imaging'],
      matchScore: 94,
      duration: '6 months',
      budget: '$150,000',
      organization: 'Medical Research Foundation',
      status: 'Seeking collaborators'
    },
    {
      id: 2,
      title: 'Natural Language Processing for Education',
      description: 'Creating AI tools to enhance language learning and educational content analysis.',
      skills: ['NLP', 'Machine Learning', 'Education Technology'],
      matchScore: 89,
      duration: '9 months',
      budget: '$200,000',
      organization: 'EdTech Innovations',
      status: 'Funding secured'
    },
    {
      id: 3,
      title: 'Sustainable Energy Optimization',
      description: 'Using AI to optimize renewable energy distribution and consumption patterns.',
      skills: ['Machine Learning', 'IoT', 'Renewable Energy'],
      matchScore: 87,
      duration: '12 months',
      budget: '$300,000',
      organization: 'Green Energy Consortium',
      status: 'Active recruitment'
    }
  ];

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Handle connect request
  const handleConnect = (partnerId) => {
    // Here you would typically make an API call to send connection request
    setDialog({
      isOpen: true,
      title: "Connection Request Sent",
      message: `Your connection request has been sent to partner #${partnerId}. You will be notified when they respond.`,
      type: "success"
    });
  };

  // Handle project interest
  const handleExpressInterest = (projectId) => {
    // Here you would typically make an API call to express interest
    setDialog({
      isOpen: true,
      title: "Interest Expressed",
      message: `Your interest in project #${projectId} has been recorded. The project team will contact you soon.`,
      type: "success"
    });
  };

  // Close dialog
  const closeDialog = () => {
    setDialog({ isOpen: false, title: '', message: '', type: 'info' });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-textprimary">AI Matching</h1>
          <p className="text-textsecondary">Find perfect collaborators and projects using our intelligent matching algorithm</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Search Keywords
              </label>
              <input
                type="text"
                placeholder="Enter skills, interests, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accentblue"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Matching Strength
              </label>
              <select
                value={matchingStrength}
                onChange={(e) => setMatchingStrength(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accentblue"
              >
                <option value="strong">Strong Matches Only</option>
                <option value="moderate">Moderate Matches</option>
                <option value="all">All Potential Matches</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Selected Skills ({selectedSkills.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accentblue text-white"
                  >
                    {skill}
                    <button
                      onClick={() => handleSkillToggle(skill)}
                      className="ml-2 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Selection */}
          <div>
            <h3 className="text-lg font-semibold text-textprimary mb-3">Select Skills</h3>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-accentblue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recommendations'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-users mr-2"></i>Partner Recommendations
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-project-diagram mr-2"></i>Project Matches
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-accentblue text-accentblue'
                  : 'border-transparent text-textsecondary hover:text-textprimary'
              }`}
            >
              <i className="fas fa-chart-bar mr-2"></i>Matching Analytics
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-textprimary">Recommended Partners</h2>
            <p className="text-textsecondary">These researchers and innovators match your skills and interests</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerRecommendations.map(partner => (
                <Card key={partner.id} className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-2xl text-gray-600"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-textprimary">{partner.name}</h3>
                      <p className="text-textsecondary text-sm">{partner.title}</p>
                      <p className="text-textsecondary text-sm">{partner.organization}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-accentblue font-bold text-xl">{partner.matchScore}%</div>
                      <div className="text-xs text-textsecondary">Match Score</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {partner.expertise.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-accentblue/10 text-accentblue text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-textsecondary text-sm">{partner.location}</p>
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-textsecondary">{partner.projects} projects</span>
                    <span className="text-textsecondary">{partner.collaborations} collaborations</span>
                  </div>

                  <div className="mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      partner.availability.includes('Available')
                        ? 'bg-green-100 text-green-800'
                        : partner.availability.includes('Limited')
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {partner.availability}
                    </span>
                  </div>

                  <button
                    onClick={() => handleConnect(partner.id)}
                    className="w-full bg-accentblue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <i className="fas fa-handshake mr-2"></i>Connect
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-textprimary">Project Matches</h2>
            <p className="text-textsecondary">Projects that align with your expertise and interests</p>
            
            <div className="space-y-4">
              {projectMatches.map(project => (
                <Card key={project.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-textprimary">{project.title}</h3>
                      <p className="text-textsecondary mt-1">{project.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-accentblue font-bold text-xl">{project.matchScore}%</div>
                      <div className="text-xs text-textsecondary">Match Score</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-accentblue/10 text-accentblue text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-textsecondary">Duration:</span>
                      <p className="font-medium text-textprimary">{project.duration}</p>
                    </div>
                    <div>
                      <span className="text-textsecondary">Budget:</span>
                      <p className="font-medium text-textprimary">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-textsecondary">Organization:</span>
                      <p className="font-medium text-textprimary">{project.organization}</p>
                    </div>
                    <div>
                      <span className="text-textsecondary">Status:</span>
                      <p className="font-medium text-textprimary">{project.status}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExpressInterest(project.id)}
                    className="w-full bg-accentblue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <i className="fas fa-star mr-2"></i>Express Interest
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-textprimary mb-4">Matching Analytics</h2>
            <p className="text-textsecondary mb-6">Insights into your matching patterns and collaboration opportunities</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-accentblue">24</div>
                <div className="text-textsecondary">Potential Matches</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">8</div>
                <div className="text-textsecondary">Active Connections</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">92%</div>
                <div className="text-textsecondary">Average Match Score</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-textsecondary">Projects in Discussion</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-textprimary mb-3">Top Matching Categories</h3>
              <div className="space-y-2">
                {['Artificial Intelligence', 'Healthcare Technology', 'Data Science', 'Renewable Energy', 'Education Technology'].map((category, index) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-textprimary">{category}</span>
                    <span className="text-accentblue font-semibold">{95 - index * 5}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Dialog Component */}
      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dialog.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {dialog.message}
              </p>
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-accentblue text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIMatching;