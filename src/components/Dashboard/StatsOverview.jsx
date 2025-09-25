import React from 'react';
import Card from '../common/Card';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Active Projects',
      value: '5',
      icon: 'fas fa-folder-open',
      color: 'accentblue',
      info: '+2 since last week',
    },
    {
      title: 'Suggestions',
      value: '12',
      icon: 'fas fa-handshake',
      color: 'accentpurple',
      info: 'Potential partners',
    },
    {
      title: 'Events',
      value: '3',
      icon: 'fas fa-calendar',
      color: 'accentgreen',
      info: 'Upcoming events',
    },
    {
      title: 'Messages',
      value: '7',
      icon: 'fas fa-envelope',
      color: 'accentred',
      info: 'Unread',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-textsecondary text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-textprimary mt-1">{stat.value}</p>
              <p className="text-xs text-textlight mt-1">{stat.info}</p>
            </div>
            <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded-md`}>
              <i className={`fas ${stat.icon} text-${stat.color}`}></i>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;