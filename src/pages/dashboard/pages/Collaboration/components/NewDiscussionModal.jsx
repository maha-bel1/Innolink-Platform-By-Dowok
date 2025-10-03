import React, { useState } from 'react';

const NewDiscussionModal = ({ projects, onClose, onCreate }) => {
  const [discussionData, setDiscussionData] = useState({
    title: '',
    project: projects[0]?.title || '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscussionData({
      ...discussionData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new discussion:', discussionData);
    if (discussionData.title.trim() && discussionData.content.trim()) {
      onCreate(discussionData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Start New Discussion</h2>
              <p className="text-blue-100 text-sm mt-1">Create a new discussion thread for your team</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discussion Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={discussionData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter discussion title"
            />
          </div>

          {projects.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              <select
                name="project"
                required
                value={discussionData.project}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {projects.map((project, index) => (
                  <option key={index} value={project.title}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discussion Content *
            </label>
            <textarea
              name="content"
              rows={6}
              required
              value={discussionData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe what you'd like to discuss..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Discussion Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-center">
                <i className="fas fa-lightbulb text-xs mr-2"></i>
                <span>Be clear and specific about your topic</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-users text-xs mr-2"></i>
                <span>Tag relevant team members when appropriate</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-shield-alt text-xs mr-2"></i>
                <span>Maintain a professional and respectful tone</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <i className="fas fa-plus-circle mr-2"></i>Create Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDiscussionModal;