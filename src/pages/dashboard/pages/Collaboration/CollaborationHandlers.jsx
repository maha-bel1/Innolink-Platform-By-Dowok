import { useState } from 'react';

// Initial state for the collaboration component
export const collaborationInitialState = {
  activeTab: 'projects',
  filter: 'all',
  showNewProjectModal: false,
  showNewMeetingModal: false,
  showRescheduleModal: false,
  showVideoConferenceModal: false,
  showMeetingMinutesModal: false,
  showAvailabilityChecker: false,
  showAvailabilityModal: false,
  showMessageModal: false,
  showInviteMemberModal: false,
  showDiscussionThread: false,
  showNewDiscussionModal: false,
  showUploadFileModal: false,
  editingProject: null,
  reschedulingMeeting: null,
  joiningMeeting: null,
  viewingMinutesMeeting: null,
  selectedMember: null,
  selectedDiscussion: null
};

// Custom hook for collaboration handlers
export const useCollaborationHandlers = (navigate, setState, state, data, setData, setDownloadNotifications, setSuccessDialog) => {
  const { projects, teamMembers, meetings, discussions, recentFiles } = data;
  const { setProjects, setTeamMembers, setMeetings, setDiscussions, setRecentFiles } = setData;

  // Handler for viewing a project
  const handleViewProject = (project) => {
    console.log('Navigating to project:', project);
    
    // Navigate to the project details page
    navigate(`/dashboard/projects/${project.id}`, { 
      state: { project } 
    });
  };

  // Handler for editing a project
  const handleEditProject = (project) => {
    setState(prev => ({
      ...prev,
      editingProject: project,
      showNewProjectModal: true
    }));
  };

  // Handler for saving a project (create or update)
  const handleSaveProject = (projectData) => {
    if (state.editingProject) {
      console.log('Updating project:', projectData);
      // Update existing project
      const updatedProjects = projects.map(project => 
        project.id === state.editingProject.id 
          ? { ...project, ...projectData }
          : project
      );
      setProjects(updatedProjects);
      
      // Show success dialog for project update
      if (setSuccessDialog) {
        setSuccessDialog({
          show: true,
          message: 'Project updated successfully!'
        });
      } else {
        alert('Project updated successfully!');
      }
    } else {
      console.log('Creating new project:', projectData);
      // Create new project
      const newProject = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        team: ['YT'], // Your initials
        completedTasks: 0,
        totalTasks: 10,
        lastUpdate: new Date().toISOString().split('T')[0],
        ...projectData
      };
      setProjects([...projects, newProject]);
      
      // Show success dialog for project creation
      if (setSuccessDialog) {
        setSuccessDialog({
          show: true,
          message: 'Project created successfully!'
        });
      } else {
        alert('Project created successfully!');
      }
    }
    setState({
      ...state, 
      showNewProjectModal: false,
      editingProject: null
    });
  };

  // Handler for scheduling a new meeting - REMOVED ALERT FROM HERE
  const handleScheduleMeeting = (meetingData) => {
    console.log('Scheduling meeting:', meetingData);
    const newMeeting = {
      id: meetings.length + 1,
      ...meetingData,
      status: 'upcoming',
      minutes: null
    };
    setMeetings([...meetings, newMeeting]);
    setState({...state, showNewMeetingModal: false});
    
    // Success dialog will be shown in the parent component (Collaboration.jsx)
    // The alert has been removed from here
  };

  // Handler for rescheduling a meeting
  const handleRescheduleMeeting = (meetingId, updatedMeetingData) => {
    console.log('Rescheduling meeting:', meetingId, updatedMeetingData);
    const updatedMeetings = meetings.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, ...updatedMeetingData }
        : meeting
    );
    setMeetings(updatedMeetings);
    setState({
      ...state, 
      showRescheduleModal: false,
      reschedulingMeeting: null
    });
    
    // Show success dialog for meeting reschedule
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: 'Meeting rescheduled successfully!'
      });
    } else {
      alert('Meeting rescheduled successfully!');
    }
  };

  // Handler for joining a meeting
  const handleJoinConference = (stream) => {
    console.log('Joining conference with stream:', stream);
    
    // Show success dialog for joining meeting
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: `Successfully joined ${state.joiningMeeting.title}!`
      });
    } else {
      alert(`Successfully joined ${state.joiningMeeting.title}!`);
    }
    
    setState({
      ...state, 
      showVideoConferenceModal: false,
      joiningMeeting: null
    });
  };

  // Handler for viewing meeting minutes
  const handleViewMinutes = (meeting) => {
    setState({
      ...state, 
      viewingMinutesMeeting: meeting,
      showMeetingMinutesModal: true
    });
  };

  // Handler for sending a message to a team member
  const handleSendMessage = (messageData) => {
    console.log('Sending message to', state.selectedMember.name, ':', messageData);
    
    // Show success dialog for sending message
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: `Message sent to ${state.selectedMember.name}!`
      });
    } else {
      alert(`Message sent to ${state.selectedMember.name}!`);
    }
    
    setState({
      ...state, 
      showMessageModal: false,
      selectedMember: null
    });
  };

  // Handler for inviting a new team member
  const handleInviteMember = (inviteData) => {
    console.log('Inviting new member:', inviteData);
    
    // Show success dialog for inviting member
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: `Invitation sent to ${inviteData.email}!`
      });
    } else {
      alert(`Invitation sent to ${inviteData.email}!`);
    }
    
    setState({...state, showInviteMemberModal: false});
  };

  // Handler for posting a reply to a discussion
  const handlePostReply = (discussionId, replyContent) => {
    console.log('Posting reply to discussion', discussionId, ':', replyContent);
    
    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: discussion.replies + 1,
          repliesData: [
            ...discussion.repliesData,
            {
              id: Math.max(...discussion.repliesData.map(r => r.id)) + 1,
              author: 'You',
              timestamp: 'Just now',
              content: replyContent,
              avatar: 'YT'
            }
          ]
        };
      }
      return discussion;
    });
    
    setDiscussions(updatedDiscussions);
    
    // Show success dialog for posting reply
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: 'Reply posted successfully!'
      });
    } else {
      alert('Reply posted successfully!');
    }
    
    setState({
      ...state, 
      showDiscussionThread: false,
      selectedDiscussion: null
    });
  };

  // Handler for creating a new discussion
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
      repliesData: []
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    
    // Show success dialog for creating discussion
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: 'Discussion created successfully!'
      });
    } else {
      alert('Discussion created successfully!');
    }
    
    setState({...state, showNewDiscussionModal: false});
  };

  // Handler for downloading a file
  const handleDownloadFile = (file) => {
    console.log('Downloading file:', file.name);
    
    // Create a mock download
    const blob = new Blob(['Mock file content for ' + file.name], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Add download notification
    setDownloadNotifications(prev => [...prev, { fileName: file.name }]);
  };

  // Handler for sharing a file
  const handleShareFile = (file) => {
    console.log('Sharing file:', file.name);
    
    if (navigator.share) {
      navigator.share({
        title: file.name,
        text: `Check out this file from the ${file.project} project`,
        url: window.location.href,
      })
      .then(() => console.log('File shared successfully'))
      .catch((error) => {
        console.log('Error sharing file:', error);
        
        // Show success dialog for sharing file
        if (setSuccessDialog) {
          setSuccessDialog({
            show: true,
            message: `Share link for ${file.name} copied to clipboard!`
          });
        } else {
          alert(`Share link for ${file.name} copied to clipboard!`);
        }
      });
    } else {
      // Show success dialog for sharing file
      if (setSuccessDialog) {
        setSuccessDialog({
          show: true,
          message: `Share link for ${file.name} copied to clipboard!`
        });
      } else {
        alert(`Share link for ${file.name} copied to clipboard!`);
      }
    }
  };

  // Handler for uploading a file
  const handleFileUpload = (fileData) => {
    console.log('Uploading file:', fileData);
    
    const newFile = {
      id: Math.max(...recentFiles.map(f => f.id)) + 1,
      name: fileData.file.name,
      type: fileData.file.name.split('.').pop(),
      size: `${(fileData.file.size / 1024 / 1024).toFixed(1)} MB`,
      modified: new Date().toISOString().split('T')[0],
      project: fileData.project,
      owner: 'You'
    };
    
    setRecentFiles([newFile, ...recentFiles]);
    
    // Show success dialog for file upload
    if (setSuccessDialog) {
      setSuccessDialog({
        show: true,
        message: `File ${fileData.file.name} uploaded successfully!`
      });
    } else {
      alert(`File ${fileData.file.name} uploaded successfully!`);
    }
    
    setState({...state, showUploadFileModal: false});
  };

  // Handler for setting a state value
  const setStateValue = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return {
    handleViewProject,
    handleEditProject,
    handleSaveProject,
    handleScheduleMeeting,
    handleRescheduleMeeting,
    handleJoinConference,
    handleViewMinutes,
    handleSendMessage,
    handleInviteMember,
    handlePostReply,
    handleCreateDiscussion,
    handleDownloadFile,
    handleShareFile,
    handleFileUpload,
    setStateValue
  };
};