import React from 'react';

const ChatHeader = ({ onSupportClick }) => {
  const handleSupportClick = () => {
    if (onSupportClick) {
      onSupportClick();
    } else {
      // Fallback behavior if no handler is provided
      console.log('Support information requested');
      // Optionally scroll to support section or open support modal
      const supportSection = document.getElementById('support-section');
      if (supportSection) {
        supportSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <i className="fas fa-robot text-xl"></i>
        </div>
        <div>
          <h3 className="font-semibold">InnoLink Assistant</h3>
          <p className="text-blue-100 text-sm">AI-powered innovation helper</p>
        </div>
      </div>
      <div className="mt-2 flex items-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
          <span>Online now</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-shield-alt mr-1"></i>
          <span>Secure & private</span>
        </div>
        <button 
          onClick={handleSupportClick}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <i className="fas fa-info-circle mr-1"></i>Get Help
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;