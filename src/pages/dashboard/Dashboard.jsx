// src/pages/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsOverview from '../../components/Dashboard/StatsOverview';
import ActivityChart from '../../components/Dashboard/ActivityChart';
import PriorityProjects from '../../components/Dashboard/PriorityProjects';
import RecommendedPartners from '../../components/Dashboard/RecommendedPartners';
import QuickActions from '../../components/Dashboard/QuickActions';
import Card from '../../components/common/Card';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data for preview sections
  const recentProjects = [
    { name: 'Medical Nano-sensors', progress: 65 },
    { name: 'AI for Diagnostics', progress: 30 },
    { name: 'Biocompatible Materials', progress: 85 }
  ];

  const techTrends = [
    { title: 'AI in Medical Diagnostics', category: 'AI', impact: 'High' },
    { title: 'Quantum Drug Discovery', category: 'Quantum', impact: 'Medium' },
    { title: 'Biodegradable Electronics', category: 'Sustainability', impact: 'High' }
  ];

  const upcomingEvents = [
    { 
      id: 1,
      title: 'Webinar: Research Funding', 
      date: 'Oct 15, 2023', 
      time: '2:00 PM - 3:30 PM',
      description: 'Learn about current research funding opportunities and strategies for successful grant applications.',
      speaker: 'Dr. Sarah Johnson',
      organization: 'National Science Foundation'
    },
    { 
      id: 2,
      title: 'Workshop: Intellectual Property', 
      date: 'Oct 22, 2023', 
      time: '10:00 AM - 12:00 PM',
      description: 'Hands-on workshop on protecting your intellectual property and navigating patent applications.',
      speaker: 'Prof. Michael Chen',
      organization: 'Tech Patent Office'
    }
  ];

  const fundingOpportunities = [
    {
      id: 1,
      title: 'NIH Research Grant',
      organization: 'National Institutes of Health',
      amount: '1,500,000 TND',
      deadline: '2023-11-15',
      status: 'open',
      area: 'Medical Research'
    },
    {
      id: 2,
      title: 'NSF Innovation Fund',
      organization: 'National Science Foundation',
      amount: '750,000 TND',
      deadline: '2023-12-01',
      status: 'open',
      area: 'Technology Development'
    }
  ];

  const handleViewAllEvents = () => {
    navigate('/dashboard/events');
  };

  const handleViewAllFunding = () => {
    navigate('/dashboard/funding');
  };

  const handleApplyForFunding = (id) => {
    navigate(`/dashboard/funding/apply/${id}`);
  };

  const handleViewAllProjects = () => {
    navigate('/dashboard/projects');
  };

  const handleViewAllTechTrends = () => {
    navigate('/dashboard/technology-trends');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-textprimary">Dashboard</h1>
          <p className="text-textsecondary">Welcome to your personal InnoLink space</p>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Chart */}
          <ActivityChart />

          {/* Priority Projects */}
          <PriorityProjects />

          {/* Recent Projects Preview */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-textprimary font-semibold">Recent Projects</h3>
              <button 
                onClick={handleViewAllProjects}
                className="text-xs text-accentblue hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-textprimary font-medium">{project.name}</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div
                        className="bg-accentblue h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-accentblue/10 text-accentblue rounded-full ml-4">
                    {project.progress}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recommended Partners */}
          <RecommendedPartners />

          {/* Funding Opportunities Preview */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-textprimary font-semibold">Funding Opportunities</h3>
              <button 
                onClick={handleViewAllFunding}
                className="text-xs text-accentblue hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {fundingOpportunities.map((funding) => (
                <div key={funding.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-textprimary text-sm">{funding.title}</h4>
                      <p className="text-xs text-textsecondary mt-1">{funding.organization}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs font-medium text-textprimary">{funding.amount}</span>
                        <span className="mx-2 text-textlight">•</span>
                        <span className="text-xs text-textsecondary">Deadline: {funding.deadline}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleApplyForFunding(funding.id)}
                      className="text-xs bg-accentblue text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors ml-2"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                      {funding.area}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      funding.status === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {funding.status === 'open' ? 'Open' : 'Closing Soon'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Technology Trends Preview */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-textprimary font-semibold">Technology Trends</h3>
              <button 
                onClick={handleViewAllTechTrends}
                className="text-xs text-accentblue hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {techTrends.map((trend, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-textprimary text-sm">{trend.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                      {trend.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trend.impact === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trend.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 
                onClick={handleViewAllEvents}
                className="text-textprimary font-semibold cursor-pointer hover:text-accentblue transition-colors"
              >
                Upcoming Events
              </h3>
              <button 
                onClick={handleViewAllEvents}
                className="text-xs text-accentblue hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-textprimary font-medium">{event.title}</p>
                    <p className="text-xs text-textsecondary">{event.date} • {event.time}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard/events')}
                    className="text-xs bg-accentblue text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;