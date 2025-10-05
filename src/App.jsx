// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './components/Layout_dashboard/Sidebar';

// Import pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ForgotPassword from './pages/ForgotPassword';
import AdminLogin from './pages/AdminLogin';

// Import dashboard components
import Dashboard from './pages/dashboard/Dashboard';
import Chatbot from './pages/dashboard/pages/Chatbot/Chatbot';
import Collaboration from './pages/dashboard/pages/Collaboration/Collaboration';
import EventsPage from './pages/dashboard/pages/Events/EventsPage';
import FundingForm from './pages/dashboard/pages/Funding/FundingForm';
import FundingDetails from './pages/dashboard/pages/Funding/FundingDetails';
import ProjectDetail from './pages/dashboard/pages/ProjectDetail/ProjectDetail';
import TasksPage from './pages/dashboard/pages/Projects/TasksPage';
import EditTaskPage from './pages/dashboard/pages/Projects/EditTaskPage';
import DocumentsPage from './pages/dashboard/pages/Projects/DocumentsPage';
import DiscussionsPage from './pages/dashboard/pages/Projects/DiscussionsPage';
import Settings from './pages/dashboard/pages/Settings/Settings';
import TechnologyTrends from './pages/dashboard/pages/TechnologyTrends/TechnologyTrends';
import AlertSettingsPage from './pages/dashboard/pages/TechnologyTrends/components/AlertSettingsPage';
import ApplicationDetails from './pages/dashboard/pages/Funding/ApplicationDetails';
import AIMatching from './pages/dashboard/pages/AIMatching/AIMatching';

// Import layout components
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes with MainLayout (has header/footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
        </Route>

        {/* Standalone auth pages (no header/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Dashboard routes with Dashboard Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <Dashboard />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/chatbot" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <Chatbot />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/collaboration" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <Collaboration />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/events" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <EventsPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/funding/apply/:id?" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <FundingForm />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/funding/application/:id" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <ApplicationDetails />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/funding" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <FundingDetails />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        {/* This route should point to Collaboration component, not a separate Projects component */}
        <Route path="/dashboard/projects" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <Collaboration />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/:id" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <ProjectDetail />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/:id/tasks" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <TasksPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/:id/tasks/edit/:taskId" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <EditTaskPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/:id/documents" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <DocumentsPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/projects/:id/discussions" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <DiscussionsPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/settings" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <Settings />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/technology-trends" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <TechnologyTrends />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/ai-matching" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <AIMatching />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/alerts/settings/:alertId" element={
          <ProtectedRoute>
            <div className="bg-gray-100 text-textprimary min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-8">
                <AlertSettingsPage />
              </main>
            </div>
          </ProtectedRoute>
        } />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;