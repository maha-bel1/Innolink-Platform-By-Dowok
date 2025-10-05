import React, { useState } from 'react';

const InviteMemberModal = ({ onClose, onInvite }) => {
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'member',
    projects: [],
    message: ''
  });

  const projects = [
    { id: 1, name: 'Medical AI Diagnostics Platform' },
    { id: 2, name: 'Biocompatible Sensor Development' },
    { id: 3, name: 'Drug Discovery Quantum Simulation' },
    { id: 4, name: 'Telemedicine Mobile Application' }
  ];

  const roles = [
    { value: 'member', label: 'Team Member' },
    { value: 'admin', label: 'Admin' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'contributor', label: 'Contributor' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInviteData({
      ...inviteData,
      [name]: value
    });
  };

  const handleProjectToggle = (projectId) => {
    setInviteData(prev => ({
      ...prev,
      projects: prev.projects.includes(projectId)
        ? prev.projects.filter(id => id !== projectId)
        : [...prev.projects, projectId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInvite(inviteData);
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Invite Team Member</h2>
              <p className="text-blue-100 text-sm mt-1">Invite a new member to join your team</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={inviteData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              name="role"
              value={inviteData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Projects
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {projects.map(project => (
                <label key={project.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={inviteData.projects.includes(project.id)}
                    onChange={() => handleProjectToggle(project.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{project.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              name="message"
              rows={3}
              value={inviteData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add a personal message to your invitation..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Invitation Details</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-center">
                <i className="fas fa-envelope text-xs mr-2"></i>
                <span>Invitation will be sent to {inviteData.email || 'the provided email'}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-shield-alt text-xs mr-2"></i>
                <span>Role: {roles.find(r => r.value === inviteData.role)?.label}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-project-diagram text-xs mr-2"></i>
                <span>Projects: {inviteData.projects.length} selected</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <i className="fas fa-paper-plane mr-2"></i>Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;