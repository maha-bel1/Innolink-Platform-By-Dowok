import React from 'react';
import Card from '../../../../../components/common/Card';

const MeetingCard = ({ meeting, teamMembers, onReschedule, onJoin, onViewMinutes }) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-5 card-hover h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[meeting.status]}`}>
          {statusLabels[meeting.status]}
        </span>
        <div className="flex -space-x-2">
          {meeting.participants.slice(0, 3).map((participantId, index) => {
            const participant = teamMembers.find(m => m.id === participantId);
            return participant ? (
              <div
                key={index}
                className="h-8 w-8 rounded-full bg-accentblue flex items-center justify-center border-2 border-white"
              >
                <span className="text-white text-xs font-medium">{participant.avatar}</span>
              </div>
            ) : null;
          })}
          {meeting.participants.length > 3 && (
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
              <span className="text-gray-600 text-xs font-medium">+{meeting.participants.length - 3}</span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-textprimary mb-2">{meeting.title}</h3>
      <p className="text-sm text-textsecondary mb-4 flex-grow">{meeting.description}</p>
      
      <div className="space-y-2 text-sm text-textsecondary mb-4">
        <div className="flex items-center">
          <i className="far fa-calendar-alt w-4 mr-2"></i>
          <span>{formatDate(meeting.date)}</span>
        </div>
        <div className="flex items-center">
          <i className="far fa-clock w-4 mr-2"></i>
          <span>{meeting.startTime} - {meeting.endTime}</span>
        </div>
        <div className="flex items-center">
          <i className={meeting.type === 'video' ? 'fas fa-video w-4 mr-2' : 'fas fa-building w-4 mr-2'}></i>
          <span className="capitalize">{meeting.type}</span>
          {meeting.location && <span className="ml-1">({meeting.location})</span>}
        </div>
      </div>
      
      <div className="flex space-x-2 mt-auto pt-4 border-t border-border">
        {meeting.status === 'upcoming' && (
          <>
            <button 
              onClick={() => onReschedule(meeting)}
              className="flex-1 py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
            >
              <i className="fas fa-pencil-alt mr-1"></i>Reschedule
            </button>
            <button 
              onClick={() => onJoin(meeting)}
              className="flex-1 py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              <i className="fas fa-video mr-1"></i>Join
            </button>
          </>
        )}
        {meeting.status === 'completed' && (
          <button 
            onClick={() => onViewMinutes(meeting)}
            className="w-full py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
          >
            <i className="fas fa-file-alt mr-1"></i>View Minutes
          </button>
        )}
      </div>
    </Card>
  );
};

export default MeetingCard;