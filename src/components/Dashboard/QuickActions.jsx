import React from 'react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Project',
      description: 'Start a new collaboration project',
      icon: 'fas fa-plus-circle',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: () => navigate('/projects')
    },
    {
      title: 'Apply for Funding',
      description: 'Submit a new funding application',
      icon: 'fas fa-coins',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => navigate('/funding/apply')
    },
    {
      title: 'Schedule Meeting',
      description: 'Organize a team meeting',
      icon: 'fas fa-calendar-plus',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: () => navigate('/projects')
    },
    {
      title: 'Ask AI Assistant',
      description: 'Get help from InnoLink AI',
      icon: 'fas fa-robot',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      action: () => navigate('/chatbot')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => (
        <Card key={index} className="p-4 card-hover cursor-pointer" onClick={action.action}>
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${action.bgColor} ${action.color} mr-4`}>
              <i className={`${action.icon} text-lg`}></i>
            </div>
            <div>
              <h3 className="font-semibold text-textprimary">{action.title}</h3>
              <p className="text-sm text-textsecondary">{action.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;