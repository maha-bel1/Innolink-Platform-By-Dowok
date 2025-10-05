// src/pages/dashboard/pages/Events/components/EventCard.jsx
import React, { useState } from 'react';
import Card from '../../../../../components/common/Card';

const EventCard = ({ event, onRegister, onViewDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getEventTypeColor = (type) => {
    const colors = {
      webinar: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      seminar: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const progress = (event.registered / event.capacity) * 100;

  const formatEventTime = (timeString) => {
    if (!timeString) return '';
    
    if (timeString.includes('-') || timeString.includes(':')) {
      return timeString;
    }
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hourInt = parseInt(hours);
      const period = hourInt >= 12 ? 'PM' : 'AM';
      const displayHour = hourInt % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    } catch (e) {
      return timeString;
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(event);
    } else {
      setShowDetails(!showDetails);
    }
  };

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      
      <div className="relative">
        <img
          src={event.image || '/api/placeholder/300/200'}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-textprimary mb-2">{event.title}</h3>
        
        {showDetails ? (
          <div className="text-sm text-textsecondary mb-3 space-y-2">
            <p className="mb-2">{event.description}</p>
            <div className="flex items-center">
              <i className="fas fa-building mr-2 w-4 text-center"></i>
              <span>{event.organization}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-textsecondary mb-3 line-clamp-2 flex-1">
            {event.description}
          </p>
        )}
        
        <div className="flex items-center text-sm text-textsecondary mb-3">
          <i className="fas fa-calendar-alt mr-2 w-4 text-center"></i>
          <span>{formatDate(event.date)} • {formatEventTime(event.time)}</span>
        </div>
        
        <div className="flex items-center text-sm text-textsecondary mb-4">
          <i className="fas fa-user mr-2 w-4 text-center"></i>
          <span>Speaker: {event.speaker}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-textsecondary mb-1">
            <span>Registration: {event.registered}/{event.capacity}</span>
            <span>{Math.round(progress)}% full</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accentblue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={handleViewDetails}
            className="flex-1 py-2 px-4 border border-accentblue text-accentblue rounded-lg font-medium hover:bg-accentblue hover:text-white transition-colors"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button
            onClick={onRegister}
            disabled={event.registered >= event.capacity}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              event.registered >= event.capacity
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-accentblue text-white hover:bg-blue-600'
            }`}
          >
            Register
          </button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;