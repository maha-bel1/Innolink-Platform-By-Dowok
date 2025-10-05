import React from 'react';
import Card from '../common/Card';

const UpcomingEvents = () => {
  const events = [
    { title: 'Webinar: Research Funding', date: 'Oct 15, 2023', time: '2:00 PM - 3:30 PM' },
    { title: 'Workshop: Intellectual Property', date: 'Oct 22, 2023', time: '10:00 AM - 12:00 PM' },
    { title: 'Conference: Biotech Innovations', date: 'Oct 30, 2023', time: '9:30 AM - 5:00 PM' },
  ];

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Upcoming Events</h3>
        <button className="text-xs text-accentblue hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-textprimary font-medium">{event.title}</p>
              <p className="text-xs text-textsecondary">{event.date} • {event.time}</p>
            </div>
            <button className="text-xs bg-accentblue text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
              Register
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingEvents;