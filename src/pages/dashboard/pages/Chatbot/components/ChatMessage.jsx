import React from 'react';

const ChatMessage = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    if (message.type === 'file') {
      return (
        <div className="flex items-center">
          <i className="fas fa-file text-lg mr-2"></i>
          <span className="font-medium">{message.text}</span>
          <button 
            className="ml-2 text-xs text-accentblue hover:underline"
            onClick={() => {
              // Create a download link for the file
              const url = URL.createObjectURL(message.file);
              const a = document.createElement('a');
              a.href = url;
              a.download = message.file.name;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            Download
          </button>
        </div>
      );
    }
    
    return <p className="text-sm">{message.text}</p>;
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.sender === 'bot' ? 'bg-accentblue' : 'bg-accentpurple'
        }`}>
          {message.sender === 'bot' ? (
            <i className="fas fa-robot text-white text-sm"></i>
          ) : (
            <span className="text-white font-semibold text-sm">You</span>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`relative rounded-2xl p-3 ${
          message.sender === 'bot' 
            ? 'bg-white border border-border' 
            : 'bg-accentblue text-white'
        }`}>
          {renderMessageContent()}
          
          {/* Time */}
          <div className={`text-xs mt-1 ${
            message.sender === 'bot' ? 'text-textsecondary' : 'text-blue-100'
          }`}>
            {formatTime(message.timestamp)}
          </div>

          {/* Message tail */}
          <div className={`absolute bottom-0 ${
            message.sender === 'bot' 
              ? '-left-1.5 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent' 
              : '-right-1.5 border-l-8 border-l-accentblue border-t-8 border-t-transparent border-b-8 border-b-transparent'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;