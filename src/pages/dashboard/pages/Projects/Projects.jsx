// src/pages/dashboard/pages/projects/Projects.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiGrid, FiList, FiCalendar, FiClock, FiUsers, FiTag } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample project data
  const sampleProjects = [
    {
      id: 1,
      title: 'AI-Powered Medical Diagnostics Platform',
      description: 'Developing an AI system that can analyze medical images and assist in early disease detection.',
      status: 'active',
      progress: 65,
      category: 'Healthcare',
      collaborators: 8,
      dueDate: '2023-12-15',
      lastUpdated: '2023-11-10',
      tasks: { total: 24, completed: 16 },
      priority: 'high'
    },
    {
      id: 2,
      title: 'Sustainable Materials Research',
      description: 'Researching biodegradable alternatives to plastic packaging for consumer goods.',
      status: 'active',
      progress: 42,
      category: 'Sustainability',
      collaborators: 5,
      dueDate: '2024-02-28',
      lastUpdated: '2023-11-05',
      tasks: { total: 18, completed: 7 },
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Quantum Computing Algorithm Development',
      description: 'Creating novel algorithms for optimization problems using quantum computing principles.',
      status: 'planning',
      progress: 15,
      category: 'Computing',
      collaborators: 4,
      dueDate: '2024-04-10',
      lastUpdated: '2023-11-08',
      tasks: { total: 12, completed: 2 },
      priority: 'high'
    },
    {
      id: 4,
      title: 'Smart Agriculture Sensor Network',
      description: 'Developing a network of IoT sensors for precision agriculture and resource optimization.',
      status: 'completed',
      progress: 100,
      category: 'Agriculture',
      collaborators: 6,
      dueDate: '2023-10-30',
      lastUpdated: '2023-10-30',
      tasks: { total: 20, completed: 20 },
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Renewable Energy Storage Solutions',
      description: 'Researching advanced battery technologies for grid-scale renewable energy storage.',
      status: 'active',
      progress: 78,
      category: 'Energy',
      collaborators: 7,
      dueDate: '2023-12-20',
      lastUpdated: '2023-11-12',
      tasks: { total: 30, completed: 23 },
      priority: 'high'
    },
    {
      id: 6,
      title: 'Neural Interface for Prosthetics',
      description: 'Developing brain-computer interfaces for advanced prosthetic limb control.',
      status: 'paused',
      progress: 52,
      category: 'Healthcare',
      collaborators: 9,
      dueDate: '2024-03-15',
      lastUpdated: '2023-10-25',
      tasks: { total: 28, completed: 15 },
      priority: 'high'
    }
  ];

  // Simulate API call to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      // Simulate API delay
      setTimeout(() => {
        setProjects(sampleProjects);
        setLoading(false);
      }, 800);
    };

    fetchProjects();
  }, []);

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      // Filter by status
      if (filterStatus !== 'all' && project.status !== filterStatus) return false;
      
      // Filter by search term
      if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !project.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort projects
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'deadline':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'progress':
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      planning: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status] || 'bg-gray-100'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Priority indicator component
  const PriorityIndicator = ({ priority }) => {
    const priorityStyles = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };

    return (
      <span className="flex items-center">
        <span className={`w-2 h-2 rounded-full mr-1 ${priorityStyles[priority]}`}></span>
        <span className="text-xs text-gray-600 capitalize">{priority}</span>
      </span>
    );
  };

  // Progress bar component
  const ProgressBar = ({ progress }) => {
    const getProgressColor = (value) => {
      if (value >= 75) return 'bg-green-500';
      if (value >= 40) return 'bg-blue-500';
      return 'bg-yellow-500';
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getProgressColor(progress)}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage your research projects and collaborations
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link 
            to="/dashboard/projects/new" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FiPlus className="mr-2" />
            New Project
          </Link>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid className="text-gray-600" />
            </button>
            <button
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList className="text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Updated</option>
              <option value="deadline">Deadline</option>
              <option value="priority">Priority</option>
              <option value="progress">Progress</option>
            </select>
            <FiClock className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Projects display */}
      {filteredProjects.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Link 
                key={project.id} 
                to={`/dashboard/projects/${project.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <StatusBadge status={project.status} />
                    <PriorityIndicator priority={project.priority} />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <ProgressBar progress={project.progress} />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>Due: {project.dueDate}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-1" />
                      <span>{project.collaborators}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <FiTag className="mr-1" />
                      <span>{project.category}</span>
                    </div>
                    <div className="text-gray-500">
                      {project.tasks.completed}/{project.tasks.total} tasks
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/projects/${project.id}`} className="flex flex-col">
                        <span className="font-medium text-gray-900">{project.title}</span>
                        <span className="text-sm text-gray-500 line-clamp-1">{project.description}</span>
                        <PriorityIndicator priority={project.priority} />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{project.category}</td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center">
                        <div className="w-full mr-2">
                          <ProgressBar progress={project.progress} />
                        </div>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{project.dueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        <span>{project.collaborators}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <div className="text-gray-400 text-lg mb-2">No projects found</div>
          <p className="text-gray-500 mb-6">Try adjusting your filters or create a new project</p>
          <Link 
            to="/dashboard/projects/new" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FiPlus className="mr-2" />
            Create New Project
          </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;