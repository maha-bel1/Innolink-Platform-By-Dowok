import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../../components/common/Card';
import NewDiscussionModal from '../Collaboration/components/NewDiscussionModal';

const DiscussionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};
  const [activeTab, setActiveTab] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  
  // Sample discussions data with their messages
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'AI Model Architecture Discussion',
      author: 'Dr. Sophie Martin',
      timestamp: '2 hours ago',
      replies: 12,
      unread: true,
      tags: ['architecture', 'technical'],
      lastActivity: '2023-10-18T14:30:00',
      participants: 12,
      messages: [
        {
          id: 1,
          author: 'Dr. Sophie Martin',
          content: 'I\'ve completed the initial architecture design for the AI model. Looking forward to your feedback.',
          timestamp: '2 hours ago',
          avatar: 'SM'
        },
        {
          id: 2,
          author: 'Dr. Ahmed Khan',
          content: 'The architecture looks solid. Have you considered using a different activation function for the output layer?',
          timestamp: '1 hour ago',
          avatar: 'AK'
        },
        {
          id: 3,
          author: 'Prof. Maria Rodriguez',
          content: 'I agree with Ahmed. Also, we should discuss the data preprocessing pipeline.',
          timestamp: '45 minutes ago',
          avatar: 'MR'
        }
      ]
    },
    {
      id: 2,
      title: 'Data Collection Protocol Review',
      author: 'Dr. James Dawson',
      timestamp: '1 day ago',
      replies: 8,
      unread: false,
      tags: ['data', 'research'],
      lastActivity: '2023-10-17T09:15:00',
      participants: 8,
      messages: [
        {
          id: 1,
          author: 'Dr. James Dawson',
          content: 'I\'ve drafted the data collection protocol. Please review and provide feedback.',
          timestamp: '1 day ago',
          avatar: 'JD'
        },
        {
          id: 2,
          author: 'Dr. Lisa Chen',
          content: 'The protocol looks comprehensive. Should we include more diversity in our sampling?',
          timestamp: '20 hours ago',
          avatar: 'LC'
        }
      ]
    },
    {
      id: 3,
      title: 'Weekly Team Meeting Agenda',
      author: 'Prof. Maria Rodriguez',
      timestamp: '3 days ago',
      replies: 5,
      unread: true,
      tags: ['meeting', 'planning'],
      lastActivity: '2023-10-15T16:45:00',
      participants: 7,
      messages: [
        {
          id: 1,
          author: 'Prof. Maria Rodriguez',
          content: 'Here\'s the agenda for our weekly meeting. Please add any additional topics.',
          timestamp: '3 days ago',
          avatar: 'MR'
        },
        {
          id: 2,
          author: 'Dr. Ahmed Khan',
          content: 'Can we discuss the timeline for the next phase?',
          timestamp: '2 days ago',
          avatar: 'AK'
        }
      ]
    },
    {
      id: 4,
      title: 'UI/UX Design Feedback',
      author: 'Lisa Thompson',
      timestamp: '1 week ago',
      replies: 15,
      unread: false,
      tags: ['design', 'feedback'],
      lastActivity: '2023-10-11T11:20:00',
      participants: 10,
      messages: [
        {
          id: 1,
          author: 'Lisa Thompson',
          content: 'I\'ve created the initial UI mockups. Looking forward to your feedback.',
          timestamp: '1 week ago',
          avatar: 'LT'
        },
        {
          id: 2,
          author: 'Dr. Sophie Martin',
          content: 'The design looks clean and intuitive. Great work!',
          timestamp: '6 days ago',
          avatar: 'SM'
        }
      ]
    }
  ]);

  // Set the first discussion as selected by default
  useEffect(() => {
    if (!selectedDiscussion && discussions.length > 0) {
      setSelectedDiscussion(discussions[0]);
    }
  }, [discussions, selectedDiscussion]);

  const handleCreateDiscussion = (discussionData) => {
    console.log('Creating new discussion:', discussionData);
    
    const newDiscussion = {
      id: Math.max(...discussions.map(d => d.id)) + 1,
      title: discussionData.title,
      author: 'You',
      timestamp: 'Just now',
      replies: 0,
      project: discussionData.project,
      unread: false,
      content: discussionData.content,
      tags: ['general'],
      lastActivity: new Date().toISOString(),
      participants: 1,
      messages: [
        {
          id: 1,
          author: 'You',
          content: discussionData.content,
          timestamp: 'Just now',
          avatar: 'YT'
        }
      ]
    };
    
    setDiscussions(prev => [newDiscussion, ...prev]);
    setShowNewDiscussionModal(false);
    
    // Select the newly created discussion
    setSelectedDiscussion(newDiscussion);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedDiscussion) {
      const updatedDiscussions = discussions.map(discussion => {
        if (discussion.id === selectedDiscussion.id) {
          const newMsg = {
            id: discussion.messages.length + 1,
            author: 'You',
            content: newMessage,
            timestamp: 'Just now',
            avatar: 'YT'
          };
          return {
            ...discussion,
            messages: [...discussion.messages, newMsg],
            replies: discussion.replies + 1,
            lastActivity: new Date().toISOString()
          };
        }
        return discussion;
      });
      
      setDiscussions(updatedDiscussions);
      
      // Update the selected discussion with the new message
      const updatedSelected = updatedDiscussions.find(d => d.id === selectedDiscussion.id);
      setSelectedDiscussion(updatedSelected);
      setNewMessage('');
    }
  };

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
    
    // Mark as read when clicked
    const updatedDiscussions = discussions.map(d => {
      if (d.id === discussion.id && d.unread) {
        return { ...d, unread: false };
      }
      return d;
    });
    
    setDiscussions(updatedDiscussions);
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

  const filteredDiscussions = discussions.filter(discussion => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return discussion.unread;
    return discussion.tags.includes(activeTab);
  });

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
        <h1 className="text-3xl font-bold text-textprimary">Discussions - {project.title}</h1>
        <p className="text-textsecondary">Team discussions and collaboration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussions List */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'all'
                    ? 'bg-accentblue text-white'
                    : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'unread'
                    ? 'bg-blue-500 text-white'
                    : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === 'technical'
                    ? 'bg-green-500 text-white'
                    : 'bg-surface text-textsecondary border border-border hover:bg-gray-50'
                }`}
              >
                Technical
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-textprimary">Discussions</h2>
              <button 
                onClick={() => setShowNewDiscussionModal(true)}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                <i className="fas fa-plus mr-2"></i>New Discussion
              </button>
            </div>

            <div className="space-y-4">
              {filteredDiscussions.map(discussion => (
                <div 
                  key={discussion.id} 
                  className={`p-4 border border-border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                    discussion.unread ? 'bg-blue-50 border-blue-200' : ''
                  } ${selectedDiscussion && selectedDiscussion.id === discussion.id ? 'border-2 border-accentblue' : ''}`}
                  onClick={() => handleDiscussionClick(discussion)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-textprimary">{discussion.title}</h3>
                    {discussion.unread && (
                      <span className="bg-accentblue text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-textsecondary mb-2">By {discussion.author} • {discussion.timestamp}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {discussion.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-textsecondary">
                      <i className="fas fa-comment mr-1"></i>
                      {discussion.replies}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredDiscussions.length === 0 && (
              <div className="text-center py-8">
                <i className="fas fa-comments text-4xl text-textlight mb-4"></i>
                <p className="text-textsecondary">No discussions found</p>
              </div>
            )}
          </Card>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-2">
          {selectedDiscussion ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-5 border-b border-border">
                <h2 className="text-xl font-semibold text-textprimary">{selectedDiscussion.title}</h2>
                <p className="text-sm text-textsecondary">Started by {selectedDiscussion.author} • {selectedDiscussion.participants} participants</p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[500px]">
                {selectedDiscussion.messages.map(message => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accentblue flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{message.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-textprimary">{message.author}</span>
                        <span className="text-xs text-textsecondary">{message.timestamp}</span>
                      </div>
                      <p className="text-textprimary bg-gray-50 p-3 rounded-lg">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-5 border-t border-border">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-8">
              <i className="fas fa-comments text-4xl text-textlight mb-4"></i>
              <h2 className="text-xl font-semibold text-textprimary mb-2">No Discussion Selected</h2>
              <p className="text-textsecondary text-center">Select a discussion from the list to view messages and participate in the conversation.</p>
            </Card>
          )}
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussionModal && (
        <NewDiscussionModal
          projects={[project]}
          onClose={() => setShowNewDiscussionModal(false)}
          onCreate={handleCreateDiscussion}
        />
      )}
    </>
  );
};

export default DiscussionsPage;