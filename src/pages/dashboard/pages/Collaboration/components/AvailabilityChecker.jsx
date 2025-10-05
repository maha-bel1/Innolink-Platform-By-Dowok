import React, { useState } from 'react';

const AvailabilityChecker = ({ teamMembers, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('10:00');

  // Function to check if a team member is available at the selected date/time
  const isMemberAvailable = (member, date, time) => {
    const selectedDay = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Check if member works on this day
    if (!member.availability.days[selectedDay]) {
      return false;
    }

    // Check if time is within working hours
    const timeInMinutes = convertTimeToMinutes(time);
    const startTimeInMinutes = convertTimeToMinutes(member.availability.workingHours.start);
    const endTimeInMinutes = convertTimeToMinutes(member.availability.workingHours.end);

    if (timeInMinutes < startTimeInMinutes || timeInMinutes > endTimeInMinutes) {
      return false;
    }

    // Check if time is during a break
    for (const breakItem of member.availability.breaks) {
      if (breakItem.enabled) {
        const breakStart = convertTimeToMinutes(breakItem.start);
        const breakEnd = convertTimeToMinutes(breakItem.end);
        
        if (timeInMinutes >= breakStart && timeInMinutes <= breakEnd) {
          return false;
        }
      }
    }

    return true;
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Team Availability Checker</h2>
              <p className="text-blue-100 text-sm mt-1">Check when team members are available for meetings</p>
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
          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Selected Date/Time Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Checking availability for:</h3>
            <p className="text-blue-700">
              {getDayName(selectedDate)}, {new Date(selectedDate).toLocaleDateString()} at {formatTime(selectedTime)}
            </p>
          </div>

          {/* Team Members Availability */}
          <div>
            <h3 className="text-lg font-semibold text-textprimary mb-4">Team Availability</h3>
            <div className="space-y-4">
              {teamMembers.map(member => {
                const isAvailable = isMemberAvailable(member, selectedDate, selectedTime);
                
                return (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accentblue flex items-center justify-center mr-3">
                        <span className="text-white font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-textprimary">{member.name}</h4>
                        <p className="text-sm text-textsecondary">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Availability Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-textprimary mb-2">Availability Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {teamMembers.filter(member => isMemberAvailable(member, selectedDate, selectedTime)).length}
                </div>
                <div className="text-sm text-textsecondary">Available Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {teamMembers.filter(member => !isMemberAvailable(member, selectedDate, selectedTime)).length}
                </div>
                <div className="text-sm text-textsecondary">Unavailable Members</div>
              </div>
            </div>
          </div>

          {/* Suggested Times */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-textprimary mb-4">Suggested Times</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['09:00', '11:00', '14:00', '15:00'].map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onClose();
                // Here you could navigate to the meeting scheduler with the selected time pre-filled
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <i className="fas fa-calendar-plus mr-2"></i>Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityChecker;