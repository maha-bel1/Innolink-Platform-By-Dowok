// src/components/Layout_dashboard/DashboardLayout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet /> {/* This renders the nested routes */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;