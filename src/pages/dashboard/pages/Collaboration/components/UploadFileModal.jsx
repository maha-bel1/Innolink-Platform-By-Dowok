import React, { useState } from 'react';

const UploadFileModal = ({ projects, onClose, onUpload }) => {
  const [uploadData, setUploadData] = useState({
    file: null,
    project: '',
    description: ''
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadData({
      ...uploadData,
      [name]: value
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData({
        ...uploadData,
        file: file
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadData({
        ...uploadData,
        file: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadData.file && uploadData.project) {
      onUpload(uploadData);
    } else {
      alert('Please select a file and project');
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Upload File</h2>
              <p className="text-blue-100 text-sm mt-1">Upload a new file to share with your team</p>
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
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File *
            </label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadData.file ? (
                <div>
                  <i className="fas fa-file text-3xl text-blue-500 mb-2"></i>
                  <p className="font-medium text-textprimary">{uploadData.file.name}</p>
                  <p className="text-sm text-textsecondary">
                    {(uploadData.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                  <p className="text-textprimary">Drag and drop your file here</p>
                  <p className="text-sm text-textsecondary">or click to browse</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project *
            </label>
            <select
              name="project"
              required
              value={uploadData.project}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              rows={3}
              value={uploadData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add a description for this file..."
            />
          </div>

          {/* Upload Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Upload Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-center">
                <i className="fas fa-check-circle text-xs mr-2"></i>
                <span>Maximum file size: 100MB</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-xs mr-2"></i>
                <span>Supported formats: PDF, DOC, DOCX, PPT, XLS, images</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-xs mr-2"></i>
                <span>Files will be accessible to all team members in the selected project</span>
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
              <i className="fas fa-upload mr-2"></i>Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFileModal;