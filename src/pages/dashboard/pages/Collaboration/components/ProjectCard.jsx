import React from 'react';
import Card from '../../../../../components/common/Card';

const ProjectCard = ({ project, onEdit, onView }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    planning: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    active: 'Active',
    planning: 'Planning',
    completed: 'Completed',
    paused: 'Paused'
  };

  return (
    <Card className="p-5 card-hover h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status]}`}>
          {statusLabels[project.status]}
        </span>
        <div className="flex -space-x-2">
          {project.team.map((avatar, index) => (
            <div
              key={index}
              className="h-8 w-8 rounded-full bg-accentblue flex items-center justify-center border-2 border-white"
            >
              <span className="text-white text-xs font-medium">{avatar}</span>
            </div>
          ))}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-textprimary mb-2">{project.title}</h3>
      <p className="text-sm text-textsecondary mb-4 flex-grow">{project.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-textsecondary mb-1">
          <span>Progress ({project.completedTasks}/{project.totalTasks} tasks)</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accentblue h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {project.technologies.map(tech => (
          <span
            key={tech}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-textsecondary">
        <span>Deadline: {project.deadline}</span>
        <div className="flex items-center">
          <i className="fas fa-users mr-1"></i>
          <span>{project.members}</span>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
        <button 
          onClick={onView}
          className="flex-1 py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
        >
          <i className="fas fa-eye mr-1"></i>View
        </button>
        <button 
          onClick={onEdit}
          className="flex-1 py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <i className="fas fa-edit mr-1"></i>Edit
        </button>
      </div>
    </Card>
  );
};

export default ProjectCard;