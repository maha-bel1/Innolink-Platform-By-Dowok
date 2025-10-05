import React from 'react';
import Card from '../common/Card';

const ProjectProgress = ({ projects }) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Project Progress Overview</h3>
        <button className="text-xs text-accentblue hover:underline">View Details</button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-textprimary mb-1">
              <span>{project.name}</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-accentblue h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-textsecondary">
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
              <span>{project.progress}% complete</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectProgress;