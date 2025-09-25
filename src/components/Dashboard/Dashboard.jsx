// src/pages/dashboard/Dashboard.jsx
import React from 'react';
import Header from '../../components/Layout_dashboard/Header';
import StatsOverview from '../../components/dashboard/StatsOverview';
import QuickActions from '../../components/dashboard/QuickActions';
import ActivityChart from '../../components/dashboard/ActivityChart';
import PriorityProjects from '../../components/dashboard/PriorityProjects';
import RecommendedPartners from '../../components/dashboard/RecommendedPartners';
import UpcomingEvents from '../../components/dashboard/UpcomingEvents';

const Dashboard = () => {
  return (
    <div className="p-6">
      <Header />
      <QuickActions />
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityChart />
        <PriorityProjects />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecommendedPartners />
        <UpcomingEvents />
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-textprimary font-semibold mb-4">Recent Notifications</h3>
          <p className="text-textsecondary">No new notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;