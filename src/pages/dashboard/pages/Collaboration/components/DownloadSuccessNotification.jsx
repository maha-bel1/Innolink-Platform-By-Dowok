import React, { useEffect } from 'react';

const DownloadSuccessNotification = ({ fileName, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg relative">
      <div className="flex items-center">
        <div className="py-1">
          <i className="fas fa-check-circle text-green-500 mr-3"></i>
        </div>
        <div>
          <p className="font-medium">Download Complete</p>
          <p className="text-sm">{fileName} has been downloaded successfully</p>
        </div>
        <button
          className="absolute top-2 right-2 text-green-500 hover:text-green-700"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default DownloadSuccessNotification;