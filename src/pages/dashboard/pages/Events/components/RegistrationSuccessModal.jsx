// src/pages/dashboard/pages/Events/components/RegistrationSuccessModal.jsx
import React from 'react';

const RegistrationSuccessModal = ({ event, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#E0E3EB] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E0E3EB] bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Registration Confirmed!</h2>
              <p className="text-green-100 text-sm mt-1">You're successfully registered</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-check-circle text-green-500 text-4xl"></i>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
              You're Registered!
            </h3>
            <p className="text-[#4F5D75]">
              Thank you for registering for <strong>{event.title}</strong>. 
              We've sent a confirmation email with all the details.
            </p>
          </div>

          {/* Event Details */}
          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-[#E0E3EB] mb-6">
            <h4 className="font-semibold text-[#1A1A1A] mb-3">Event Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <i className="fas fa-calendar-alt w-4 mr-3 text-[#2A6BFF]"></i>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock w-4 mr-3 text-[#2A6BFF]"></i>
                <span>{formatEventTime(event.time)}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt w-4 mr-3 text-[#2A6BFF]"></i>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-user w-4 mr-3 text-[#2A6BFF]"></i>
                <span>{event.speaker}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-start">
                <i className="fas fa-envelope text-blue-500 mt-1 mr-2 text-xs"></i>
                <span>Check your email for confirmation details</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-calendar-plus text-blue-500 mt-1 mr-2 text-xs"></i>
                <span>Add this event to your calendar</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-bell text-blue-500 mt-1 mr-2 text-xs"></i>
                <span>You'll receive a reminder before the event</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#2A6BFF] text-white rounded-xl hover:bg-[#1E4FDB] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-calendar-check mr-2"></i>
              View My Events
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-[#4F5D75] border border-[#E0E3EB] rounded-xl hover:bg-[#F7F9FC] transition-all duration-200 font-medium"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;