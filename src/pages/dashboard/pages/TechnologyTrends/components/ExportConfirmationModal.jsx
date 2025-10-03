import React from 'react';
import Card from '../../../../../components/common/Card';

const ExportConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  exportCount,
  exportFormat = 'CSV'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 card-hover">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <i className="fas fa-download text-accentblue text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-textprimary">Export Trends</h2>
            <p className="text-textsecondary text-sm">Confirm export of your saved trends</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-sm text-blue-700">
            <i className="fas fa-info-circle mr-2"></i>
            <span>You are about to export {exportCount} saved trend{exportCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-textprimary font-medium">Export Format</span>
            <span className="text-accentblue font-semibold">{exportFormat}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-textprimary font-medium">Total Items</span>
            <span className="text-textsecondary">{exportCount} trend{exportCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-border text-textsecondary rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <i className="fas fa-download mr-2"></i>
            Export Now
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ExportConfirmationModal;