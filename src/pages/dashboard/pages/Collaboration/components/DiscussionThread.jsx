import React, { useState } from 'react';

const DiscussionThread = ({ discussion, onClose, onReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(discussion.id, replyContent);
      setReplyContent('');
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Discussion Thread</h2>
              <p className="text-purple-100 text-sm mt-1">{discussion.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Original Post */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 rounded-full bg-accentblue flex items-center justify-center mr-3">
                <span className="text-white font-medium">
                  {discussion.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-textprimary">{discussion.author}</h3>
                <p className="text-sm text-textsecondary">{formatTimestamp(discussion.timestamp)}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-textprimary mb-3">{discussion.title}</h2>
            <p className="text-textsecondary mb-4">{discussion.content}</p>
            
            <div className="flex items-center text-sm text-textsecondary">
              <span className="bg-gray-200 px-2 py-1 rounded-full mr-3">
                Project: {discussion.project}
              </span>
              <span className="flex items-center">
                <i className="fas fa-comment mr-1"></i>
                {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
              </span>
            </div>
          </div>

          {/* Replies */}
          {discussion.repliesData && discussion.repliesData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-textprimary mb-4">
                Replies ({discussion.repliesData.length})
              </h3>
              
              <div className="space-y-4">
                {discussion.repliesData.map(reply => (
                  <div key={reply.id} className="border-l-4 border-purple-200 pl-4 ml-2">
                    <div className="flex items-start mb-2">
                      <div className="h-8 w-8 rounded-full bg-accentblue flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-medium">{reply.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-textprimary text-sm">{reply.author}</h4>
                        <p className="text-xs text-textsecondary">{formatTimestamp(reply.timestamp)}</p>
                      </div>
                    </div>
                    <p className="text-textsecondary text-sm pl-11">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply Form */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-textprimary mb-4">Post a Reply</h3>
            
            <form onSubmit={handleSubmitReply}>
              <div className="mb-4">
                <textarea
                  id="reply-input"
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Type your reply here..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <i className="fas fa-reply mr-2"></i>Post Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionThread;