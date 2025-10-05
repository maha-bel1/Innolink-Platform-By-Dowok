// src/pages/dashboard/pages/Events/components/RegistrationModal.jsx
import React, { useState } from 'react';

const RegistrationModal = ({ event, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    position: '',
    questions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E0E3EB] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E0E3EB] bg-gradient-to-r from-[#2A6BFF] to-[#1E4FDB] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Register for Event</h2>
              <p className="text-blue-100 text-sm mt-1">Complete your registration</p>
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
          {/* Event Summary */}
          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-[#E0E3EB] mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#2A6BFF] rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-check text-white text-lg"></i>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-[#4F5D75]">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt w-4 mr-3 text-[#2A6BFF]"></i>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock w-4 mr-3 text-[#2A6BFF]"></i>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-user w-4 mr-3 text-[#2A6BFF]"></i>
                    <span>Speaker: {event.speaker}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                  placeholder="Your company or institution"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Position/Role
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                  placeholder="Your role or position"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Questions for the Speaker (optional)
              </label>
              <textarea
                name="questions"
                rows={3}
                value={formData.questions}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80 resize-none"
                placeholder="Any specific questions you'd like the speaker to address during the event..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-[#4F5D75] border border-[#E0E3EB] rounded-xl hover:bg-[#F7F9FC] transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#2A6BFF] text-white rounded-xl hover:bg-[#1E4FDB] transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Confirm Registration
              </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;