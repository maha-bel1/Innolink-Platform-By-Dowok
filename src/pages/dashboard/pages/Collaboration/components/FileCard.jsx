import React from 'react';
import Card from '../../../../../components/common/Card'

const FileCard = ({ file, onDownload, onShare }) => {
  const fileIcons = {
    pdf: 'fas fa-file-pdf text-red-500',
    doc: 'fas fa-file-word text-blue-500',
    docx: 'fas fa-file-word text-blue-500',
    ppt: 'fas fa-file-powerpoint text-orange-500',
    pptx: 'fas fa-file-powerpoint text-orange-500',
    xls: 'fas fa-file-excel text-green-500',
    xlsx: 'fas fa-file-excel text-green-500',
    default: 'fas fa-file text-gray-500'
  };

  const getFileIcon = (type) => {
    return fileIcons[type] || fileIcons.default;
  };

  return (
    <Card className="p-5 card-hover">
      <div className="flex items-start mb-4">
        <div className="p-3 bg-gray-100 rounded-lg mr-4">
          <i className={`${getFileIcon(file.type)} text-2xl`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-textprimary mb-1 truncate">{file.name}</h3>
          <p className="text-sm text-textsecondary">{file.size}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-textsecondary mb-4">
        <div className="flex justify-between">
          <span>Project:</span>
          <span className="font-medium">{file.project}</span>
        </div>
        <div className="flex justify-between">
          <span>Modified:</span>
          <span>{file.modified}</span>
        </div>
        <div className="flex justify-between">
          <span>Owner:</span>
          <span>{file.owner}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={onDownload}
          className="flex-1 py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
        >
          <i className="fas fa-download mr-1"></i>Download
        </button>
        <button 
          onClick={onShare}
          className="flex-1 py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <i className="fas fa-share mr-1"></i>Share
        </button>
      </div>
    </Card>
  );
};

export default FileCard;