import React from 'react';
import Card from '../../../../../components/common/Card'

const DiscussionCard = ({ discussion, onViewThread, onReply }) => {
  return (
    <Card className={`p-5 ${discussion.unread ? 'border-l-4 border-l-accentblue' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {discussion.unread && (
              <span className="bg-accentblue text-white text-xs px-2 py-0.5 rounded-full mr-2">
                New
              </span>
            )}
            <span className="text-xs text-textsecondary">Project: {discussion.project}</span>
          </div>
          <h3 className="text-lg font-semibold text-textprimary mb-2">{discussion.title}</h3>
          <div className="flex items-center text-sm text-textsecondary mb-3">
            <span className="font-medium">{discussion.author}</span>
            <span className="mx-2">•</span>
            <span>{discussion.timestamp}</span>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <i className="fas fa-comment text-textlight mr-1"></i>
          <span className="text-sm text-textsecondary">{discussion.replies}</span>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
        <button 
          onClick={() => onViewThread(discussion)}
          className="py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
        >
          <i className="fas fa-eye mr-1"></i>View Thread
        </button>
        <button 
          onClick={() => onReply(discussion)}
          className="py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <i className="fas fa-reply mr-1"></i>Reply
        </button>
      </div>
    </Card>
  );
};

export default DiscussionCard;