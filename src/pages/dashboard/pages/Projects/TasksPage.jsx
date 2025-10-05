import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const TasksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Develop AI Model Architecture',
      description: 'Design and implement the neural network architecture for medical image analysis',
      status: 'completed',
      priority: 'high',
      assignee: 'Dr. Sophie Martin',
      dueDate: '2023-10-15',
      progress: 100
    },
    {
      id: 2,
      title: 'Data Collection & Preprocessing',
      description: 'Gather medical imaging data and prepare it for training',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Dr. James Dawson',
      dueDate: '2023-10-25',
      progress: 75
    },
    {
      id: 3,
      title: 'Model Training & Validation',
      description: 'Train the AI model and validate its performance',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Prof. Maria Rodriguez',
      dueDate: '2023-11-05',
      progress: 45
    },
    {
      id: 4,
      title: 'UI/UX Design for Platform',
      description: 'Design the user interface for the diagnostics platform',
      status: 'not-started',
      priority: 'medium',
      assignee: 'Lisa Thompson',
      dueDate: '2023-11-15',
      progress: 0
    },
    {
      id: 5,
      title: 'Backend API Development',
      description: 'Develop the backend services and APIs for the platform',
      status: 'not-started',
      priority: 'high',
      assignee: 'Dr. Ahmed Khan',
      dueDate: '2023-11-10',
      progress: 0
    }
  ]);

  // Handler for editing a task
  const handleEditTask = (task) => {
    navigate(`/projects/${project.id}/tasks/edit/${task.id}`, { 
      state: { project, task } 
    });
  };

  // Handler for toggling task completion
  const handleToggleTask = (taskId) => {
    console.log('Toggling task:', taskId);
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: task.status === 'completed' ? 'in-progress' : 'completed',
              progress: task.status === 'completed' ? 75 : 100
            } 
          : task
      )
    );
  };

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-6">
        <button 
          onClick={() => navigate(`/projects/${project.id}`)}
          className="flex items-center text-accentblue hover:text-blue-600 mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Project
        </button>
        <h1 className="text-3xl font-bold text-textprimary">Tasks - {project.title}</h1>
        <p className="text-textsecondary">Manage and track tasks for this project</p>
      </div>

      <div className="space-y-6">
        {/* Task Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'all'
                  ? 'bg-accentblue text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'in-progress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('not-started')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'not-started'
                  ? 'bg-gray-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Not Started
            </button>
          </div>
        </Card>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-5 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-textsecondary">Completed</div>
          </Card>
          <Card className="p-5 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-textsecondary">In Progress</div>
          </Card>
          <Card className="p-5 text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">
              {tasks.filter(t => t.status === 'not-started').length}
            </div>
            <div className="text-sm text-textsecondary">Not Started</div>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <Card key={task.id} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                </div>
                <div className="text-sm text-textsecondary">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-textprimary mb-2">{task.title}</h3>
              <p className="text-sm text-textsecondary mb-4">{task.description}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accentblue flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-medium">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-textsecondary">{task.assignee}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-24">
                    <div className="flex justify-between text-xs text-textsecondary mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-accentblue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label="Edit task"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleToggleTask(task.id)}
                      className="p-2 text-textsecondary hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      aria-label="Toggle task completion"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card className="p-8 text-center">
            <i className="fas fa-tasks text-4xl text-textlight mb-4"></i>
            <h3 className="text-lg font-medium text-textprimary mb-2">No tasks found</h3>
            <p className="text-textsecondary">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </>
  );
};

export default TasksPage;