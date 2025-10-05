import React from 'react';
import Card from '../../../../../components/common/Card';

const TeamMemberCard = ({ member, onMessage, onAvailability }) => {
  const statusColors = {
    online: 'bg-green-400',
    away: 'bg-yellow-400',
    offline: 'bg-gray-400'
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    offline: 'Offline'
  };

  return (
    <Card className="p-5 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-accentblue flex items-center justify-center mr-3">
              <span className="text-white font-semibold">{member.avatar}</span>
            </div>
            <div className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-white ${statusColors[member.status]}`}></div>
          </div>
          <div>
            <h3 className="font-semibold text-textprimary">{member.name}</h3>
            <p className="text-sm text-textsecondary">{member.role}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[member.status].replace('400', '100')} ${statusColors[member.status].replace('400', '800')}`}>
          {statusLabels[member.status]}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-textsecondary mb-2">
          <span>Active Projects</span>
          <span>{member.projects}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {member.skills.map(skill => (
            <span
              key={skill}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => onMessage(member)}
          className="flex-1 py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
        >
          <i className="fas fa-envelope mr-1"></i>Message
        </button>
        <button 
          onClick={() => onAvailability(member)}
          className="flex-1 py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <i className="fas fa-calendar mr-1"></i>Availability
        </button>
      </div>
    </Card>
  );
};

export default TeamMemberCard;