import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const EditTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: projectId, taskId } = useParams();
  const { project, task: initialTask } = location.state || {};
  
  const [task, setTask] = useState(initialTask || {
    id: parseInt(taskId) || 0,
    title: '',
    description: '',
    status: 'not-started',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    progress: 0
  });

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-textlight mb-4"></i>
          <h2 className="text-2xl font-bold text-textprimary mb-2">Project Not Found</h2>
          <p className="text-textsecondary">The requested project could not be found.</p>
          <button 
            onClick={() => navigate('/projects')}
            className="mt-4 px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving task:', task);
    // In a real app, you would save the task to your backend here
    alert('Task saved successfully!');
    navigate(`/projects/${project.id}/tasks`, { state: { project } });
  };

  const handleCancel = () => {
    navigate(`/projects/${project.id}/tasks`, { state: { project } });
  };

  return (
    <>
      <div className="mb-6">
        <button 
          onClick={() => navigate(`/projects/${project.id}/tasks`, { state: { project } })}
          className="flex items-center text-accentblue hover:text-blue-600 mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Tasks
        </button>
        <h1 className="text-3xl font-bold text-textprimary">
          {initialTask ? 'Edit Task' : 'Create New Task'} - {project.title}
        </h1>
        <p className="text-textsecondary">
          {initialTask ? 'Update task details' : 'Create a new task for this project'}
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={task.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent resize-none"
              placeholder="Describe the task in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Status
              </label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Assignee
              </label>
              <input
                type="text"
                name="assignee"
                value={task.assignee}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent"
                placeholder="Assign to team member"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentblue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary mb-2">
              Progress ({task.progress}%)
            </label>
            <input
              type="range"
              name="progress"
              min="0"
              max="100"
              value={task.progress}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-textsecondary mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-textsecondary border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600"
            >
              Save Task
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default EditTaskPage;