import React from 'react';
import Card from '../common/Card';

const ResourceSummary = ({ resources }) => {
  const resourceItems = [
    {
      label: 'Documents',
      value: resources.documents || 0,
      icon: 'fas fa-file',
      color: 'text-blue-600'
    },
    {
      label: 'Meetings',
      value: resources.meetings || 0,
      icon: 'fas fa-video',
      color: 'text-green-600'
    },
    {
      label: 'Discussions',
      value: resources.discussions || 0,
      icon: 'fas fa-comments',
      color: 'text-purple-600'
    },
    {
      label: 'Team Members',
      value: resources.teamMembers || 0,
      icon: 'fas fa-users',
      color: 'text-orange-600'
    }
  ];

  return (
    <Card className="p-5">
      <h3 className="text-textprimary font-semibold mb-4">Resources Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {resourceItems.map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold mb-1 ${item.color}`}>
              <i className={`${item.icon} mr-2`}></i>
              {item.value}
            </div>
            <div className="text-sm text-textsecondary">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResourceSummary;