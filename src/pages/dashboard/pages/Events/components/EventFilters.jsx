// src/pages/dashboard/pages/Events/components/EventFilters.jsx
import React from 'react';

const EventFilters = ({ filter, setFilter }) => {
  const filters = [
    { key: 'all', label: 'All Events', icon: 'fas fa-star' },
    { key: 'webinar', label: 'Webinars', icon: 'fas fa-video' },
    { key: 'workshop', label: 'Workshops', icon: 'fas fa-tools' },
    { key: 'conference', label: 'Conferences', icon: 'fas fa-users' },
    { key: 'seminar', label: 'Seminars', icon: 'fas fa-chalkboard' }
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

export default EventFilters;