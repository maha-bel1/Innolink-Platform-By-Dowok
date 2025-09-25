import React, { useState } from 'react';
import Card from '../../../../../components/common/Card';

const MeetingRescheduler = ({ meeting, teamMembers, onReschedule, onClose }) => {
  const [meetingData, setMeetingData] = useState({
    title: meeting.title,
    description: meeting.description,
    date: meeting.date,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    participants: [...meeting.participants],
    meetingType: meeting.type,
    location: meeting.location || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onReschedule(meeting.id, meetingData);
  };

  const handleParticipantToggle = (memberId) => {
    setMeetingData(prev => ({
      ...prev,
      participants: prev.participants.includes(memberId)
        ? prev.participants.filter(id => id !== memberId)
        : [...prev.participants, memberId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl">
          <h2 className="text-2xl font-bold">Reschedule Meeting</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Title *
            </label>
            <input
              type="text"
              required
              value={meetingData.title}
              onChange={(e) => setMeetingData({...meetingData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Meeting purpose"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={meetingData.description}
              onChange={(e) => setMeetingData({...meetingData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
              placeholder="Meeting agenda and objectives"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={meetingData.date}
                onChange={(e) => setMeetingData({...meetingData, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={meetingData.startTime}
                  onChange={(e) => setMeetingData({...meetingData, startTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={meetingData.endTime}
                  onChange={(e) => setMeetingData({...meetingData, endTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Type
            </label>
            <select
              value={meetingData.meetingType}
              onChange={(e) => setMeetingData({...meetingData, meetingType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="video">Video Conference</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {meetingData.meetingType !== 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={meetingData.location}
                onChange={(e) => setMeetingData({...meetingData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Meeting room or address"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participants
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {teamMembers.map(member => (
                <label key={member.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={meetingData.participants.includes(member.id)}
                    onChange={() => handleParticipantToggle(member.id)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Reschedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingRescheduler;