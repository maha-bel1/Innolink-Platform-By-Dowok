import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/innolinklogo.png';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});
  
  const navItems = [
    { icon: 'fas fa-home', label: 'Dashboard', path: '/dashboard' },
    { 
      icon: 'fas fa-project-diagram', 
      label: 'My Projects & Collaboration', 
      path: '/dashboard/collaboration'  // Changed from '/dashboard/projects'
    },
    { 
      icon: 'fas fa-handshake', 
      label: 'AI Matching', 
      path: '/dashboard/ai-matching',
      badge: 'Soon'
    },
    { 
      icon: 'fas fa-coins', 
      label: 'Funding', 
      path: '/dashboard/funding',
      subItems: [
        { label: 'Funding Opportunities', path: '/dashboard/funding' },
        { label: 'Apply for Funding', path: '/dashboard/funding/apply' }
      ]
    },
    { 
      icon: 'fas fa-binoculars', 
      label: 'Technology Trends', 
      path: '/dashboard/technology-trends'
    },
    { 
      icon: 'fas fa-calendar', 
      label: 'Events', 
      path: '/dashboard/events',
      badge: 3
    },
    { 
      icon: 'fas fa-robot', 
      label: 'Chatbot', 
      path: '/dashboard/chatbot',
      badge: 'AI'
    },
    { 
      icon: 'fas fa-cog', 
      label: 'Settings', 
      path: '/dashboard/settings'
    },
  ];

  const toggleExpanded = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isItemActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === location.pathname);
    }
    return false;
  };

  const getBadgeClass = (badge) => {
    if (badge === 'AI') return 'bg-purple-500 text-white';
    if (badge === 'Soon') return 'bg-blue-300 text-blue-800';
    if (typeof badge === 'number') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-800';
  };

  const handleEmailSupport = () => {
    const email = 'support@innolink.com';
    const subject = 'Support Request - InnoLink Assistance';
    const body = 'Hello InnoLink Support Team,\n\nI need assistance with the following:\n\n[Please describe your issue or question here]\n\nThank you,\n[Your Name]';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCallSupport = () => {
    const phoneNumber = '+216-55-555-555';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert(`Please call our support team at: ${phoneNumber}\n\nSupport Hours: Monday-Friday, 9AM-6PM`);
    }
  };

  const handleContactSupport = () => {
    // Check if we're already on the chatbot page
    if (location.pathname === '/dashboard/chatbot') {
      // If already on chatbot page, show support options
      const event = new CustomEvent('showSupportOptions');
      window.dispatchEvent(event);
    } else {
      // Navigate to chatbot and show support options
      navigate('/dashboard/chatbot');
      
      // Wait for navigation to complete, then show support options
      setTimeout(() => {
        const event = new CustomEvent('showSupportOptions');
        window.dispatchEvent(event);
      }, 100);
    }
  };

  return (
    <div
      className="w-64 min-h-screen flex flex-col shadow-lg text-white"
      style={{ backgroundColor: '#356DC5' }}
    >
      {/* Header with logo on the right */}
      <div
        className="p-5 flex items-center justify-between"
        style={{ backgroundColor: '#2a5ab3' }}
      >
        <div>
          <h1 className="text-2xl font-bold">InnoLink</h1>
          <p className="text-blue-200 text-sm">by Dowok Consulting</p>
        </div>

        <img
          src={logo}
          alt="InnoLink Logo"
          className="h-8 w-auto object-contain sidebar-logo"
        />
      </div>

      {/* Welcome card */}
      <div className="mb-8 p-4 mx-4 mt-6 welcome-card rounded-lg">
        <p className="font-semibold">Welcome!</p>
        <p className="text-blue-100 text-sm mt-1">Dr. Sophie Martin</p>
        <p className="text-blue-200 text-xs">AI Research Scientist</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index} className="sidebar-item">
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleExpanded(item.label)}
                    className={`px-4 py-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                      isItemActive(item)
                        ? 'bg-blue-500 text-white active'
                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${item.icon} mr-3 w-5 text-center`}></i>
                      {item.label}
                    </div>
                    <div className="flex items-center">
                      {item.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full mr-2 ${getBadgeClass(item.badge)}`}>
                          {item.badge}
                        </span>
                      )}
                      <i className={`fas fa-chevron-${expandedItems[item.label] ? 'up' : 'down'} text-xs`}></i>
                    </div>
                  </div>
                  
                  {expandedItems[item.label] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`px-4 py-2 rounded-md flex items-center text-sm transition-colors ${
                              location.pathname === subItem.path
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-200 hover:bg-blue-500 hover:text-white'
                            }`}
                          >
                            <i className="fas fa-caret-right mr-2 text-xs"></i>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`px-4 py-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white active'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} mr-3 w-5 text-center`}></i>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getBadgeClass(item.badge)}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Support Section */}
      <div className="mt-auto p-4 mx-4 mb-4 bg-blue-600 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <i className="fas fa-headset"></i>
          </div>
          <div>
            <p className="font-medium">Need help?</p>
            <p className="text-blue-100 text-sm">Our support team is here for you</p>
          </div>
        </div>
        <button 
          onClick={handleContactSupport}
          className="w-full mt-3 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Contact Support
        </button>
        <div className="mt-2 flex justify-between text-xs">
          <button 
            onClick={handleEmailSupport}
            className="text-blue-200 hover:text-white"
          >
            Email
          </button>
          <button 
            onClick={handleCallSupport}
            className="text-blue-200 hover:text-white"
          >
            Call
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sidebar-footer mx-4 border-t border-blue-500">
        <p className="text-xs text-blue-200 text-center">© 2025 InnoLink by Dowok</p>
      </div>
    </div>
  );
};

export default Sidebar;