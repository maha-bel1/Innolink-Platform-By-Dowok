import React from 'react';

const ProjectFilters = ({ filter, setFilter }) => {
  const filters = [
    { key: 'all', label: 'All Projects', icon: 'fas fa-star' },
    { key: 'active', label: 'Active', icon: 'fas fa-play-circle' },
    { key: 'planning', label: 'Planning', icon: 'fas fa-tasks' },
    { key: 'completed', label: 'Completed', icon: 'fas fa-check-circle' },
    { key: 'paused', label: 'Paused', icon: 'fas fa-pause-circle' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === key
              ? 'bg-accentblue text-white'
              : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
          }`}
        >
          <i className={`${icon} mr-2`}></i>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;