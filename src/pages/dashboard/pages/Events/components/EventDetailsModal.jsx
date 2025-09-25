// src/pages/dashboard/pages/Events/components/EventDetailsModal.jsx
import React from 'react';

const EventDetailsModal = ({ event, onClose, onRegister }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const progress = (event.registered / event.capacity) * 100;

  const getEventTypeColor = (type) => {
    const colors = {
      webinar: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      seminar: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E0E3EB] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E0E3EB] bg-gradient-to-r from-[#2A6BFF] to-[#1E4FDB] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-blue-100 text-sm mt-1">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)} • {event.organization}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Event Description</h3>
                <p className="text-[#4F5D75] leading-relaxed">{event.description}</p>
              </div>

              {/* Learning Objectives */}
              {event.learningObjectives && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {event.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-[#2A6BFF] mt-1 mr-3"></i>
                        <span className="text-[#4F5D75]">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Event Info */}
            <div className="space-y-6">
              {/* Event Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={event.image || '/api/placeholder/300/200'}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Event Details Card */}
              <div className="bg-[#F7F9FC] p-5 rounded-xl border border-[#E0E3EB]">
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#2A6BFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-calendar text-white text-sm"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[#1A1A1A]">{formatDate(event.date)}</p>
                      <p className="text-xs text-[#4F5D75]">{formatEventTime(event.time)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#2A6BFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-white text-sm"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[#1A1A1A]">{event.location}</p>
                      <p className="text-xs text-[#4F5D75]">{event.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#2A6BFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-white text-sm"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[#1A1A1A]">Duration</p>
                      <p className="text-xs text-[#4F5D75]">{event.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#2A6BFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[#1A1A1A]">Speaker</p>
                      <p className="text-xs text-[#4F5D75]">{event.speaker}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Progress */}
              <div className="bg-white p-5 rounded-xl border border-[#E0E3EB]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[#1A1A1A]">Registration</span>
                  <span className="text-xs text-[#4F5D75]">{Math.round(progress)}% full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-accentblue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#4F5D75] text-center">
                  {event.registered} of {event.capacity} spots filled
                </p>

                <button
                  onClick={onRegister}
                  disabled={event.registered >= event.capacity}
                  className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
                    event.registered >= event.capacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#2A6BFF] text-white hover:bg-blue-600'
                  }`}
                >
                  {event.registered >= event.capacity ? 'Fully Booked' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;