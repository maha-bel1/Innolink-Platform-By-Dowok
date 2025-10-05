// src/components/auth/RoleSelector.jsx
import React from 'react';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'researcher',
      title: 'Researcher/PhD Student',
      description: 'Access collaboration and funding opportunities',
      icon: '🔬'
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Find experts for your innovation projects',
      icon: '🏢'
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Discover innovative projects with high potential',
      icon: '💼'
    },
    {
      id: 'admin',
      title: 'Platform Administrator',
      description: 'Manage platform operations and user accounts',
      icon: '⚙️'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-c-5 mb-4">I am a:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedRole === role.id
                ? 'border-c-3 bg-c-1 shadow-md'
                : 'border-gray-200 hover:border-c-2'
            }`}
            onClick={() => onRoleChange(role.id)}
          >
            <div className="text-2xl mb-2">{role.icon}</div>
            <h4 className="font-semibold text-c-5 mb-1">{role.title}</h4>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Your role determines the type of opportunities and connections you'll see on the platform.
        You can update this later in your profile settings.
      </p>
    </div>
  );
};

export default RoleSelector;