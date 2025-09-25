import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';

const DocumentsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};
  const [filter, setFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDownloadNotification, setShowDownloadNotification] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [downloadedFileName, setDownloadedFileName] = useState('');
  const fileInputRef = useRef(null);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Research Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2023-10-15',
      owner: 'Dr. Sophie Martin',
      category: 'research',
      version: '1.0',
      content: 'This is the content of Research Proposal.pdf'
    },
    {
      id: 2,
      name: 'Technical Specifications.docx',
      type: 'doc',
      size: '1.8 MB',
      modified: '2023-10-12',
      owner: 'Dr. Ahmed Khan',
      category: 'technical',
      version: '2.1',
      content: 'This is the content of Technical Specifications.docx'
    },
    {
      id: 3,
      name: 'Project Timeline.xlsx',
      type: 'xls',
      size: '0.9 MB',
      modified: '2023-10-10',
      owner: 'Lisa Thompson',
      category: 'planning',
      version: '1.5',
      content: 'This is the content of Project Timeline.xlsx'
    },
    {
      id: 4,
      name: 'UI Design Mockups.pptx',
      type: 'ppt',
      size: '4.7 MB',
      modified: '2023-10-08',
      owner: 'Prof. Maria Rodriguez',
      category: 'design',
      version: '3.2',
      content: 'This is the content of UI Design Mockups.pptx'
    },
    {
      id: 5,
      name: 'Data Collection Protocol.pdf',
      type: 'pdf',
      size: '1.2 MB',
      modified: '2023-10-05',
      owner: 'Dr. James Dawson',
      category: 'research',
      version: '1.1',
      content: 'This is the content of Data Collection Protocol.pdf'
    }
  ]);

  // Handler for downloading a document
  const handleDownload = (documentId) => {
    console.log('Downloading document:', documentId);
    const doc = documents.find(d => d.id === documentId);
    
    // Create a blob with the document content
    const blob = new Blob([doc.content], { type: 'application/octet-stream' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show download success notification
    setDownloadedFileName(doc.name);
    setShowDownloadNotification(true);
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowDownloadNotification(false);
    }, 3000);
  };

  // Handler for sharing a document
  const handleShare = async (documentId) => {
    console.log('Sharing document:', documentId);
    const doc = documents.find(d => d.id === documentId);
    
    // Create a shareable link (in a real app, this would be a server-generated link)
    const shareableLink = `${window.location.origin}/documents/${doc.id}`;
    
    // Check if the Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: doc.name,
          text: `Check out this document: ${doc.name}`,
          url: shareableLink
        });
        setNotificationMessage(`${doc.name} shared successfully!`);
        setShowSuccessNotification(true);
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Fallback to clipboard copy if sharing is cancelled or fails
          copyToClipboard(shareableLink, doc.name);
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareableLink, doc.name);
    }
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  // Helper function to copy to clipboard
  const copyToClipboard = (text, docName) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotificationMessage(`Share link for ${docName} copied to clipboard!`);
      setShowSuccessNotification(true);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setNotificationMessage(`Share link for ${docName} copied to clipboard!`);
      setShowSuccessNotification(true);
    });
  };

  // Handler for initiating document deletion
  const handleDeleteInit = (documentId) => {
    const doc = documents.find(d => d.id === documentId);
    setDocumentToDelete(doc);
    setShowDeleteConfirm(true);
  };

  // Handler for confirming document deletion
  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      console.log('Deleting document:', documentToDelete.id);
      setDocuments(documents.filter(d => d.id !== documentToDelete.id));
      setNotificationMessage(`"${documentToDelete.name}" has been deleted successfully!`);
      setShowSuccessNotification(true);
      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    }
  };

  // Handler for canceling document deletion
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDocumentToDelete(null);
  };

  // Handler for opening file selection dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handler for file selection
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // Handler for drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handler for drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handler for drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // Process uploaded files
  const processFiles = (files) => {
    const newDocuments = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setNotificationMessage(`File ${file.name} exceeds the 10MB size limit and was not uploaded.`);
        setShowSuccessNotification(true);
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          setShowSuccessNotification(false);
        }, 3000);
        return;
      }

      const fileExtension = file.name.split('.').pop().toLowerCase();
      const fileType = getFileType(fileExtension);
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDocument = {
          id: Math.max(...documents.map(d => d.id), 0) + index + 1,
          name: file.name,
          type: fileType,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          modified: new Date().toISOString().split('T')[0],
          owner: 'You',
          category: getCategoryFromType(fileType),
          version: '1.0',
          content: e.target.result
        };
        
        newDocuments.push(newDocument);
        
        // Update state after all files are processed
        if (newDocuments.length === files.length) {
          setDocuments([...newDocuments, ...documents]);
          setNotificationMessage(`Successfully uploaded ${newDocuments.length} file(s)!`);
          setShowSuccessNotification(true);
          
          // Auto-hide notification after 3 seconds
          setTimeout(() => {
            setShowSuccessNotification(false);
          }, 3000);
        }
      };
      
      reader.readAsText(file);
    });
  };

  // Get file type from extension
  const getFileType = (extension) => {
    const typeMap = {
      'pdf': 'pdf',
      'doc': 'doc',
      'docx': 'doc',
      'ppt': 'ppt',
      'pptx': 'ppt',
      'xls': 'xls',
      'xlsx': 'xls',
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'gif': 'image',
      'txt': 'text',
      'zip': 'archive',
      'rar': 'archive'
    };
    
    return typeMap[extension] || 'default';
  };

  // Get category from file type
  const getCategoryFromType = (fileType) => {
    const categoryMap = {
      'pdf': 'research',
      'doc': 'technical',
      'ppt': 'design',
      'xls': 'planning',
      'image': 'design',
      'text': 'research',
      'archive': 'technical',
      'default': 'research'
    };
    
    return categoryMap[fileType] || 'research';
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

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'all') return true;
    return doc.category === filter;
  });

  const getFileIcon = (type) => {
    const fileIcons = {
      pdf: 'fas fa-file-pdf text-red-500',
      doc: 'fas fa-file-word text-blue-500',
      ppt: 'fas fa-file-powerpoint text-orange-500',
      xls: 'fas fa-file-excel text-green-500',
      image: 'fas fa-file-image text-purple-500',
      text: 'fas fa-file-alt text-gray-500',
      archive: 'fas fa-file-archive text-yellow-500',
      default: 'fas fa-file text-gray-500'
    };
    return fileIcons[type] || fileIcons.default;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'technical': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'design': return 'bg-orange-100 text-orange-800';
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
        <h1 className="text-3xl font-bold text-textprimary">Documents - {project.title}</h1>
        <p className="text-textsecondary">Manage project documents and files</p>
      </div>

      <div className="space-y-6">
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && documentToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-gray-100 bg-opacity-50"></div>
            <Card className="max-w-md w-full p-6 shadow-xl border border-gray-200 relative z-10">
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-4"></i>
                <h3 className="text-xl font-semibold text-textprimary mb-2">Confirm Deletion</h3>
                <p className="text-textsecondary mb-6">
                  Are you sure you want to delete <span className="font-medium">"{documentToDelete.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDeleteCancel}
                    className="px-6 py-2 text-textsecondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Download Success Notification */}
        {showDownloadNotification && (
          <div className="fixed top-4 right-4 z-50">
            <Card className="p-4 bg-green-50 border border-green-200 shadow-lg">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                <div>
                  <p className="text-green-800 font-medium">Download Complete</p>
                  <p className="text-green-700 text-sm">{downloadedFileName} has been downloaded successfully!</p>
                </div>
                <button
                  onClick={() => setShowDownloadNotification(false)}
                  className="ml-4 text-green-600 hover:text-green-800"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="fixed top-20 right-4 z-50">
            <Card className="p-4 bg-blue-50 border border-blue-200 shadow-lg">
              <div className="flex items-center">
                <i className="fas fa-info-circle text-blue-600 mr-3"></i>
                <p className="text-blue-800">{notificationMessage}</p>
                <button
                  onClick={() => setShowSuccessNotification(false)}
                  className="ml-4 text-blue-600 hover:text-blue-800"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Document Filters */}
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
              All Documents
            </button>
            <button
              onClick={() => setFilter('research')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'research'
                  ? 'bg-blue-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Research
            </button>
            <button
              onClick={() => setFilter('technical')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'technical'
                  ? 'bg-green-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setFilter('planning')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'planning'
                  ? 'bg-purple-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Planning
            </button>
            <button
              onClick={() => setFilter('design')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'design'
                  ? 'bg-orange-500 text-white'
                  : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
              }`}
            >
              Design
            </button>
          </div>
        </Card>

        {/* Upload Section */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-textprimary">Upload New Document</h2>
            <button 
              onClick={handleUploadClick}
              className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <i className="fas fa-upload mr-2"></i>Upload File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
          </div>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging 
                ? 'border-accentblue bg-blue-50' 
                : 'border-border hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-textlight mb-4"></i>
            <p className="text-textsecondary mb-2">Drag and drop files here or click to browse</p>
            <p className="text-xs text-textlight">Maximum file size: 10MB per file</p>
            <p className="text-xs text-textlight">Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, Images, Text files</p>
          </div>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map(document => (
            <Card key={document.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    <i className={`${getFileIcon(document.type)} text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-textprimary mb-1">{document.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-textsecondary mb-2">
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>Modified: {new Date(document.modified).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>v{document.version}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                        {document.category}
                      </span>
                      <span className="text-sm text-textsecondary">Owner: {document.owner}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDownload(document.id)}
                    className="p-2 text-textsecondary hover:text-accentblue hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Download document"
                    title="Download this document"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <button 
                    onClick={() => handleShare(document.id)}
                    className="p-2 text-textsecondary hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    aria-label="Share document"
                    title="Share this document"
                  >
                    <i className="fas fa-share"></i>
                  </button>
                  <button 
                    onClick={() => handleDeleteInit(document.id)}
                    className="p-2 text-textsecondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete document"
                    title="Delete this document"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="p-8 text-center">
            <i className="fas fa-file-alt text-4xl text-textlight mb-4"></i>
            <h3 className="text-lg font-medium text-textprimary mb-2">No documents found</h3>
            <p className="text-textsecondary">Try uploading a document or adjusting your filters</p>
          </Card>
        )}
      </div>
    </>
  );
};

export default DocumentsPage;