// src/pages/dashboard/pages/Events/components/EventCalendar.jsx
import React, { useState, useEffect } from 'react';
import Card from '../../../../../components/common/Card';

const EventCalendar = ({ events, onEventClick, onViewAllEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Generate calendar data based on current date
  useEffect(() => {
    generateCalendarData();
  }, [currentDate, events]);

  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days in the month
    const daysInMonth = lastDay.getDate();
    // First day of the calendar (might be from previous month)
    const firstDayOfCalendar = new Date(firstDay);
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - firstDay.getDay());
    
    const days = [];
    
    // Generate 42 days (6 weeks) for the calendar view
    for (let i = 0; i < 42; i++) {
      const date = new Date(firstDayOfCalendar);
      date.setDate(date.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const dateString = date.toISOString().split('T')[0];
      
      // Find events for this date
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === dateString;
      }).map(event => event.id);
      
      days.push({
        date: date.getDate(),
        fullDate: date,
        isCurrentMonth,
        events: dayEvents,
        isToday: isToday(date),
        isSelected: selectedDate && isSameDay(selectedDate, date)
      });
    }
    
    setCalendarDays(days);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day.fullDate);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === selectedDateString;
    });
  };

  const getEventDots = (eventCount) => {
    if (eventCount === 0) return null;
    
    const dots = [];
    const maxDots = 3;
    const dotCount = Math.min(eventCount, maxDots);
    
    for (let i = 0; i < dotCount; i++) {
      dots.push(
        <div
          key={i}
          className="w-1.5 h-1.5 bg-[#2A6BFF] rounded-full mx-0.5"
        />
      );
    }
    
    if (eventCount > maxDots) {
      dots.push(
        <span key="more" className="text-xs text-[#2A6BFF] font-medium">+{eventCount - maxDots}</span>
      );
    }
    
    return <div className="flex justify-center items-center mt-1 space-x-1">{dots}</div>;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatEventTime = (timeString) => {
    // Handle cases where time might be in different formats
    if (!timeString) return '';
    
    // If it's already in a readable format, return as is
    if (timeString.includes('-') || timeString.includes(':')) {
      return timeString;
    }
    
    // Otherwise, try to format it
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

  const getEventTypeColor = (type) => {
    const colors = {
      webinar: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      seminar: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleViewAllEvents = () => {
    setShowAllEvents(true);
    setSelectedDate(null);
    
    // If there's a callback function, call it
    if (onViewAllEvents) {
      onViewAllEvents();
    }
  };

  const getAllEvents = () => {
    // Return all events sorted by date
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <Card className="p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">
          {formatMonthYear(currentDate)}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => changeMonth(-1)}
            className="w-8 h-8 rounded-lg border border-[#E0E3EB] flex items-center justify-center text-[#4F5D75] hover:bg-[#F7F9FC] calendar-nav"
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 h-8 rounded-lg border border-[#E0E3EB] flex items-center justify-center text-[#4F5D75] hover:bg-[#F7F9FC] text-sm calendar-nav"
          >
            Today
          </button>
          <button 
            onClick={() => changeMonth(1)}
            className="w-8 h-8 rounded-lg border border-[#E0E3EB] flex items-center justify-center text-[#4F5D75] hover:bg-[#F7F9FC] calendar-nav"
          >
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0 || index === 6
                ? 'text-[#6C7A89]' // Weekend
                : 'text-[#9AA0B2]' // Weekdays
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`min-h-[60px] p-2 rounded-lg border transition-all cursor-pointer calendar-day ${
              day.isSelected
                ? 'border-[#2A6BFF] bg-blue-50' // Selected date
                : 'border-transparent hover:border-[#E0E3EB] hover:bg-[#F7F9FC]'
            } ${
              !day.isCurrentMonth
                ? 'text-[#BFC6D1]' // Inactive days
                : index % 7 === 0 || index % 7 === 6
                ? 'text-[#6C7A89]' // Weekend
                : 'text-[#4F5D75]' // Regular days
            } ${
              day.isToday && day.isCurrentMonth
                ? 'bg-[#2A6BFF] text-white shadow-lg' // Today highlight
                : ''
            }`}
          >
            <div className="text-center">
              <span
                className={`text-sm font-medium ${
                  day.isToday && day.isCurrentMonth
                    ? 'text-white'
                    : ''
                }`}
              >
                {day.date}
              </span>
              {getEventDots(day.events.length)}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-6 pt-6 border-t border-[#E0E3EB]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">
              Events on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <button 
              onClick={() => setSelectedDate(null)}
              className="text-[#4F5D75] hover:text-[#2A6BFF]"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {getEventsForSelectedDate().length > 0 ? (
            <div className="space-y-3">
              {getEventsForSelectedDate().map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="p-3 rounded-lg border border-[#E0E3EB] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1A1A1A] text-sm mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-[#4F5D75]">
                        {formatEventTime(event.time)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#4F5D75] text-center py-4">
              No events scheduled for this date
            </p>
          )}
        </div>
      )}

      {/* All Events Section (when View All is clicked) */}
      {showAllEvents && (
        <div className="mt-8 pt-6 border-t border-[#E0E3EB]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#1A1A1A]">
              All Events
            </h3>
            <button 
              onClick={() => setShowAllEvents(false)}
              className="text-[#4F5D75] hover:text-[#2A6BFF]"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {getAllEvents().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAllEvents().map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="p-4 rounded-lg border border-[#E0E3EB] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-[#1A1A1A]">
                      {event.title}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="text-sm text-[#4F5D75] mb-2">
                    <div className="flex items-center mb-1">
                      <i className="fas fa-calendar-alt w-4 mr-2 text-[#2A6BFF]"></i>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock w-4 mr-2 text-[#2A6BFF]"></i>
                      <span>{formatEventTime(event.time)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4F5D75] line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-[#4F5D75]">
                      {event.registered}/{event.capacity} registered
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="text-xs bg-[#2A6BFF] text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#4F5D75] text-center py-4">
              No events available
            </p>
          )}
        </div>
      )}

      {/* Upcoming Events Section (when no date is selected and not showing all events) */}
      {!selectedDate && !showAllEvents && (
        <>
          <div className="mt-8 pt-6 border-t border-[#E0E3EB]">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="p-3 rounded-lg border border-[#E0E3EB] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1A1A1A] text-sm mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-[#4F5D75]">
                        {new Date(event.date).toLocaleDateString()} • {formatEventTime(event.time)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Events Button */}
          <button 
            onClick={handleViewAllEvents}
            className="w-full mt-4 py-2 px-4 bg-[#F7F9FC] text-[#2A6BFF] text-sm font-medium rounded-lg hover:bg-[#E8EFFD] transition-colors"
          >
            View All Events
          </button>
        </>
      )}
    </Card>
  );
};

export default EventCalendar;