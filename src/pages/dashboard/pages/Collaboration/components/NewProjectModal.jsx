import React, { useState, useEffect } from 'react';

const NewProjectModal = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning',
    deadline: '',
    technologies: ''
  });

  useEffect(() => {
    if (project) {
      // Pre-fill form with project data when editing
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'planning',
        deadline: project.deadline || '',
        technologies: project.technologies ? project.technologies.join(', ') : ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process technologies into an array
    const processedData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };
    
    onSave(processedData);
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E0E3EB] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E0E3EB] bg-gradient-to-r from-[#2A6BFF] to-[#1E4FDB] text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{project ? 'Edit Project' : 'Create New Project'}</h2>
              <p className="text-blue-100 text-sm mt-1">{project ? 'Update your project details' : 'Start a new collaboration project'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80 resize-none"
                placeholder="Describe the project goals and objectives..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E3EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent transition-all bg-white/80"
                placeholder="AI, React, Python, etc."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-[#4F5D75] border border-[#E0E3EB] rounded-xl hover:bg-[#F7F9FC] transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#2A6BFF] text-white rounded-xl hover:bg-[#1E4FDB] transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-plus-circle mr-2"></i>
                {project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
