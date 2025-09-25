import React from 'react';

const QuickReplies = ({ replies, onReply }) => {
  return (
    <div className="border-t border-border bg-gray-50 p-4">
      <p className="text-sm text-textsecondary mb-2">Quick replies:</p>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReply(reply)}
            className="px-3 py-2 bg-white border border-border rounded-full text-sm text-textprimary hover:bg-accentblue hover:text-white transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;