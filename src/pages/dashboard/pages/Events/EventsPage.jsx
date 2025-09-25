// src/pages/dashboard/pages/Events/EventsPage.jsx
import React, { useState } from 'react';
import Card from '../../../../components/common/Card';
import EventCalendar from './components/EventCalendar';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import RegistrationModal from './components/RegistrationModal';
import EventDetailsModal from './components/EventDetailsModal';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const events = [
    {
      id: 1,
      title: 'Webinar: Research Funding Strategies',
      type: 'webinar',
      date: '2023-10-15',
      time: '14:00 - 15:30',
      speaker: 'Dr. Sarah Johnson',
      organization: 'National Science Foundation',
      image: '/api/placeholder/300/200',
      description: 'Learn about current research funding opportunities and strategies for successful grant applications. This webinar will cover the latest funding trends, application tips, and common pitfalls to avoid when seeking research grants.',
      capacity: 100,
      registered: 78,
      tags: ['funding', 'research', 'grants', 'science', 'education'],
      location: 'Virtual - Zoom',
      duration: '1.5 hours',
      prerequisites: 'None',
      materials: 'PDF guide included',
      learningObjectives: [
        'Understand current funding landscape',
        'Learn effective grant writing techniques',
        'Identify suitable funding sources',
        'Avoid common application mistakes'
      ]
    },
    {
      id: 2,
      title: 'Workshop: Intellectual Property Protection',
      type: 'workshop',
      date: '2023-10-22',
      time: '10:00 - 12:00',
      speaker: 'Prof. Michael Chen',
      organization: 'Tech Patent Office',
      image: '/api/placeholder/300/200',
      description: 'Hands-on workshop on protecting your intellectual property and navigating patent applications. Participants will work through real case studies and learn practical strategies for IP protection.',
      capacity: 50,
      registered: 42,
      tags: ['IP', 'patents', 'workshop', 'legal', 'innovation'],
      location: 'Conference Room B',
      duration: '2 hours',
      prerequisites: 'Basic knowledge of IP recommended',
      materials: 'Workbook and templates provided',
      learningObjectives: [
        'Understand different types of IP protection',
        'Learn patent application process',
        'Develop IP strategy for your projects',
        'Handle common IP challenges'
      ]
    },
    {
      id: 3,
      title: 'Conference: Biotech Innovations 2023',
      type: 'conference',
      date: '2023-10-30',
      time: '09:30 - 17:00',
      speaker: 'Multiple Speakers',
      organization: 'BioTech Association',
      image: '/api/placeholder/300/200',
      description: 'Annual conference showcasing the latest innovations in biotechnology and medical research. Featuring keynote speakers, panel discussions, and networking opportunities with industry leaders.',
      capacity: 200,
      registered: 156,
      tags: ['biotech', 'conference', 'innovation', 'healthcare', 'research'],
      location: 'Convention Center Main Hall',
      duration: 'Full day',
      prerequisites: 'None',
      materials: 'Conference proceedings',
      learningObjectives: [
        'Discover latest biotech advancements',
        'Network with industry professionals',
        'Learn about commercialization strategies',
        'Explore collaboration opportunities'
      ]
    },
    {
      id: 4,
      title: 'Seminar: AI in Healthcare',
      type: 'seminar',
      date: '2023-11-05',
      time: '13:00 - 14:30',
      speaker: 'Dr. Emily Rodriguez',
      organization: 'AI Health Institute',
      image: '/api/placeholder/300/200',
      description: 'Exploring the applications of artificial intelligence in modern healthcare solutions. This seminar will demonstrate real-world AI implementations and discuss ethical considerations.',
      capacity: 75,
      registered: 63,
      tags: ['AI', 'healthcare', 'seminar', 'technology', 'medicine'],
      location: 'Auditorium A',
      duration: '1.5 hours',
      prerequisites: 'Basic understanding of AI concepts',
      materials: 'Case studies and reference list',
      learningObjectives: [
        'Understand AI applications in healthcare',
        'Evaluate AI implementation challenges',
        'Learn about regulatory considerations',
        'Identify opportunities for AI in your work'
      ]
    },
    {
      id: 5,
      title: 'Webinar: Sustainable Energy Solutions',
      type: 'webinar',
      date: '2023-11-12',
      time: '11:00 - 12:30',
      speaker: 'Dr. James Wilson',
      organization: 'Green Energy Initiative',
      image: '/api/placeholder/300/200',
      description: 'Discussing innovative approaches to sustainable energy and their implementation. This webinar will cover renewable technologies, energy storage solutions, and policy frameworks.',
      capacity: 120,
      registered: 95,
      tags: ['energy', 'sustainability', 'webinar', 'environment', 'technology'],
      location: 'Virtual - Microsoft Teams',
      duration: '1.5 hours',
      prerequisites: 'None',
      materials: 'Resource guide and slides',
      learningObjectives: [
        'Understand current sustainable energy technologies',
        'Learn about implementation challenges',
        'Explore policy and regulatory frameworks',
        'Identify opportunities in sustainable energy'
      ]
    },
    {
      id: 6,
      title: 'Workshop: Data Visualization Techniques',
      type: 'workshop',
      date: '2023-11-18',
      time: '13:00 - 16:00',
      speaker: 'Prof. Lisa Thompson',
      organization: 'Data Science Institute',
      image: '/api/placeholder/300/200',
      description: 'Hands-on training on effective data visualization methods for research presentations. Participants will learn to create compelling visualizations using various tools and techniques.',
      capacity: 40,
      registered: 32,
      tags: ['data', 'visualization', 'workshop', 'analysis', 'presentation'],
      location: 'Computer Lab 3',
      duration: '3 hours',
      prerequisites: 'Basic computer skills',
      materials: 'Software access and exercise files',
      learningObjectives: [
        'Master data visualization principles',
        'Learn to use visualization tools',
        'Create effective research presentations',
        'Communicate data insights clearly'
      ]
    }
  ];

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">Events & Webinars</h1>
        <p className="text-textsecondary">Discover and register for upcoming events</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <EventFilters filter={filter} setFilter={setFilter} />
          <div className="flex space-x-2">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-lg ${
                view === 'grid' 
                  ? 'bg-accentblue text-white' 
                  : 'bg-surface text-textsecondary border border-border'
              }`}
            >
              <i className="fas fa-grid mr-2"></i>Grid
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg ${
                view === 'calendar' 
                  ? 'bg-accentblue text-white' 
                  : 'bg-surface text-textsecondary border border-border'
              }`}
            >
              <i className="fas fa-calendar mr-2"></i>Calendar
            </button>
          </div>
        </div>

        {view === 'calendar' ? (
          <EventCalendar 
            events={events} 
            onEventClick={handleViewDetails} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={() => handleRegister(event)}
                onViewDetails={() => handleViewDetails(event)}
              />
            ))}
          </div>
        )}

        {showModal && (
          <RegistrationModal
            event={selectedEvent}
            onClose={() => setShowModal(false)}
            onConfirm={(formData) => {
              console.log('Registration data:', formData);
              setShowModal(false);
            }}
          />
        )}

        {showDetailsModal && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setShowDetailsModal(false)}
            onRegister={() => {
              setShowDetailsModal(false);
              setShowModal(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default EventsPage;