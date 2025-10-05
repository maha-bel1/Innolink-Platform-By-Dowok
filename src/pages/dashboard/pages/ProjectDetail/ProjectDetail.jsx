import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-textlight mb-4"></i>
          <h2 className="text-2xl font-bold text-textprimary mb-2">Project Not Found</h2>
          <p className="text-textsecondary">The requested project could not be found.</p>
          <button 
            onClick={() => navigate('/dashboard/projects')}
            className="mt-4 px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleViewTasks = () => {
    navigate(`/dashboard/projects/${project.id}/tasks`, { state: { project } });
  };

  const handleViewDocuments = () => {
    navigate(`/dashboard/projects/${project.id}/documents`, { state: { project } });
  };

  const handleTeamDiscussion = () => {
    navigate(`/dashboard/projects/${project.id}/discussions`, { state: { project } });
  };

  const handleEditProject = () => {
    navigate('/dashboard/projects', { state: { editProject: project } });
  };

  return (
    <>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard/projects')}
          className="flex items-center text-accentblue hover:text-blue-600 mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-textprimary">{project.title}</h1>
        <p className="text-textsecondary">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <h2 className="text-xl font-semibold text-textprimary mb-4">Project Overview</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-textsecondary">Status</p>
                <p className="font-medium text-textprimary capitalize">{project.status}</p>
              </div>
              <div>
                <p className="text-sm text-textsecondary">Deadline</p>
                <p className="font-medium text-textprimary">{project.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-textsecondary">Team Members</p>
                <p className="font-medium text-textprimary">{project.members}</p>
              </div>
              <div>
                <p className="text-sm text-textsecondary">Progress</p>
                <p className="font-medium text-textprimary">{project.progress}%</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs text-textsecondary mb-1">
                <span>Tasks Completed: {project.completedTasks}/{project.totalTasks}</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-accentblue h-3 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-textprimary mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-semibold text-textprimary mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-accentblue text-white p-2 rounded-lg mr-3">
                  <i className="fas fa-tasks"></i>
                </div>
                <div>
                  <p className="font-medium text-textprimary">Project status updated</p>
                  <p className="text-sm text-textsecondary">Changed to {project.status}</p>
                  <p className="text-xs text-textlight">Last updated: {project.lastUpdate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 text-white p-2 rounded-lg mr-3">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <p className="font-medium text-textprimary">Tasks completed</p>
                  <p className="text-sm text-textsecondary">{project.completedTasks} out of {project.totalTasks} tasks completed</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-500 text-white p-2 rounded-lg mr-3">
                  <i className="fas fa-comment"></i>
                </div>
                <div>
                  <p className="font-medium text-textprimary">New discussion started</p>
                  <p className="text-sm text-textsecondary">Team meeting about project milestones</p>
                  <p className="text-xs text-textlight">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-xl font-semibold text-textprimary mb-4">Team Members</h2>
            <div className="space-y-3">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accentblue flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">{member}</span>
                  </div>
                  <div>
                    <p className="font-medium text-textprimary">Team Member {index + 1}</p>
                    <p className="text-xs text-textsecondary">Role description</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-semibold text-textprimary mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button 
                onClick={handleViewTasks}
                className="w-full py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm text-left transition-colors"
              >
                <i className="fas fa-tasks mr-2"></i>View Tasks
              </button>
              <button 
                onClick={handleViewDocuments}
                className="w-full py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm text-left transition-colors"
              >
                <i className="fas fa-file-alt mr-2"></i>View Documents
              </button>
              <button 
                onClick={handleTeamDiscussion}
                className="w-full py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm text-left transition-colors"
              >
                <i className="fas fa-comments mr-2"></i>Team Discussion
              </button>
              <button 
                onClick={handleEditProject}
                className="w-full py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm transition-colors"
              >
                <i className="fas fa-edit mr-2"></i>Edit Project
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;