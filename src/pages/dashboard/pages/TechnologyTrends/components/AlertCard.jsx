import React from 'react';
import Card from '../../../../../components/common/Card'; // Updated path
import { useNavigate } from 'react-router-dom';

const AlertCard = ({ alert, onMarkAsRead, onSettingsClick }) => {
  const navigate = useNavigate();
  
  const priorityLabels = {
    'high': { label: 'High Priority', color: 'bg-red-100 text-red-800' },
    'medium': { label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    'low': { label: 'Low Priority', color: 'bg-blue-100 text-blue-800' }
  };

  const typeIcons = {
    'funding': 'fa-money-bill-wave',
    'event': 'fa-calendar',
    'patent': 'fa-file-alt',
    'publication': 'fa-file-alt',
    'trend': 'fa-chart-line'
  };

  const typeColors = {
    'funding': 'text-accentgreen',
    'event': 'text-accentpurple',
    'patent': 'text-accentblue',
    'publication': 'text-textsecondary',
    'trend': 'text-accentred'
  };

  const handleMarkAsRead = () => {
    if (onMarkAsRead) {
      onMarkAsRead(alert.id);
    }
  };

  const handleSettingsClick = () => {
    // Navigate to alert settings page with the alert ID
    navigate(`/alerts/settings/${alert.id}`);
  };

  return (
    <Card className={`p-5 card-hover ${!alert.read ? 'border-l-4 border-l-accentblue' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <span className={`text-xs px-2 py-1 rounded-full mr-2 ${priorityLabels[alert.priority].color}`}>
              {priorityLabels[alert.priority].label}
            </span>
            <span className="text-xs text-textsecondary">{alert.date}</span>
            {!alert.read && (
              <span className="ml-2 bg-accentblue text-white text-xs px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center mb-3">
            <i className={`fas ${typeIcons[alert.type] || 'fa-bell'} ${typeColors[alert.type] || 'text-accentblue'} mr-2`}></i>
            <h3 className="text-lg font-semibold text-textprimary">{alert.title}</h3>
          </div>
          <p className="text-sm text-textsecondary mb-4">{alert.description}</p>
        </div>
        <div className="flex space-x-2 ml-4">
          {!alert.read && (
            <button 
              onClick={handleMarkAsRead}
              className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
              title="Mark as read"
            >
              <i className="fas fa-check"></i>
            </button>
          )}
          <button 
            onClick={handleSettingsClick}
            className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
            title="Alert settings"
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AlertCard;