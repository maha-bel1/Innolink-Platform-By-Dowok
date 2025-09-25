import React, { useState } from 'react';
import Card from '../../../../../components/common/Card'

const AvailabilitySelector = ({ onAvailabilitySave }) => {
  const [availability, setAvailability] = useState({
    timezone: 'Africa/Tunis',
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    breaks: [
      { start: '12:00', end: '13:00', enabled: true }
    ]
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const timezones = [
    'Africa/Tunis',
    'Europe/Paris',
    'Europe/London',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const handleDayToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: !prev.days[day]
      }
    }));
  };

  const handleBreakToggle = (index) => {
    const updatedBreaks = [...availability.breaks];
    updatedBreaks[index].enabled = !updatedBreaks[index].enabled;
    setAvailability(prev => ({ ...prev, breaks: updatedBreaks }));
  };

  const addBreak = () => {
    setAvailability(prev => ({
      ...prev,
      breaks: [...prev.breaks, { start: '14:00', end: '14:30', enabled: true }]
    }));
  };

  const removeBreak = (index) => {
    setAvailability(prev => ({
      ...prev,
      breaks: prev.breaks.filter((_, i) => i !== index)
    }));
  };

  const handleBreakTimeChange = (index, field, value) => {
    const updatedBreaks = [...availability.breaks];
    updatedBreaks[index][field] = value;
    setAvailability(prev => ({ ...prev, breaks: updatedBreaks }));
  };

  const handleSave = () => {
    onAvailabilitySave(availability);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-textprimary mb-6">Availability Settings</h2>
      
      <div className="space-y-6">
        {/* Timezone Selection */}
        <div>
          <label className="block text-sm font-medium text-textprimary mb-2">
            Timezone
          </label>
          <select
            value={availability.timezone}
            onChange={(e) => setAvailability(prev => ({ ...prev, timezone: e.target.value }))}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-textprimary mb-2">
            Working Hours
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="time"
              value={availability.workingHours.start}
              onChange={(e) => setAvailability(prev => ({
                ...prev,
                workingHours: { ...prev.workingHours, start: e.target.value }
              }))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
            />
            <span className="text-textsecondary">to</span>
            <input
              type="time"
              value={availability.workingHours.end}
              onChange={(e) => setAvailability(prev => ({
                ...prev,
                workingHours: { ...prev.workingHours, end: e.target.value }
              }))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
            />
          </div>
        </div>

        {/* Working Days */}
        <div>
          <label className="block text-sm font-medium text-textprimary mb-2">
            Working Days
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {daysOfWeek.map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={availability.days[key]}
                  onChange={() => handleDayToggle(key)}
                  className="rounded text-accentblue focus:ring-accentblue"
                />
                <span className="text-sm text-textsecondary">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Breaks */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-textprimary">
              Breaks
            </label>
            <button
              onClick={addBreak}
              className="text-xs text-accentblue hover:underline"
            >
              + Add Break
            </button>
          </div>
          <div className="space-y-2">
            {availability.breaks.map((breakItem, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={breakItem.enabled}
                  onChange={() => handleBreakToggle(index)}
                  className="rounded text-accentblue focus:ring-accentblue"
                />
                <input
                  type="time"
                  value={breakItem.start}
                  onChange={(e) => handleBreakTimeChange(index, 'start', e.target.value)}
                  className="px-2 py-1 border border-border rounded text-sm"
                />
                <span className="text-textsecondary">to</span>
                <input
                  type="time"
                  value={breakItem.end}
                  onChange={(e) => handleBreakTimeChange(index, 'end', e.target.value)}
                  className="px-2 py-1 border border-border rounded text-sm"
                />
                <button
                  onClick={() => removeBreak(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Availability
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AvailabilitySelector;