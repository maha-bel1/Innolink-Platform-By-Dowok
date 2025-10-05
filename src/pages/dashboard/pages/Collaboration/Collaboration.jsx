import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../../../components/common/Card';
import CollaborationTabs from './CollaborationTabs';
import { collaborationInitialState, useCollaborationHandlers } from './CollaborationHandlers';
import NewProjectModal from './components/NewProjectModal';
import MeetingScheduler from './components/MeetingScheduler';
import MeetingRescheduler from './components/MeetingRescheduler';
import VideoConferenceModal from './components/VideoConferenceModal';
import MeetingMinutesModal from './components/MeetingMinutesModal';
import AvailabilityChecker from './components/AvailabilityChecker';
import MessageModal from './components/MessageModal';
import InviteMemberModal from './components/InviteMemberModal';
import DiscussionThread from './components/DiscussionThread';
import NewDiscussionModal from './components/NewDiscussionModal';
import UploadFileModal from './components/UploadFileModal';
import DownloadSuccessNotification from './components/DownloadSuccessNotification';
import AvailabilitySelector from './components/AvailabilitySelector';

const Collaboration = () => {
  const [state, setState] = useState(collaborationInitialState);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for success dialog
  const [successDialog, setSuccessDialog] = useState({
    show: false,
    message: ''
  });
  
  // Initialize data states
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Medical AI Diagnostics Platform',
      status: 'active',
      progress: 75,
      members: 5,
      deadline: '2023-12-15',
      description: 'Developing an AI-powered platform for medical image analysis and diagnostics.',
      team: ['SM', 'JD', 'MR', 'AK', 'LT'],
      technologies: ['AI', 'Python', 'TensorFlow', 'React'],
      completedTasks: 15,
      totalTasks: 20,
      lastUpdate: '2023-10-18'
    },
    {
      id: 2,
      title: 'Biocompatible Sensor Development',
      status: 'active',
      progress: 45,
      members: 3,
      deadline: '2024-02-28',
      description: 'Creating biodegradable sensors for continuous health monitoring.',
      team: ['SM', 'AK', 'LT'],
      technologies: ['IoT', 'Materials Science', 'Embedded Systems'],
      completedTasks: 9,
      totalTasks: 20,
      lastUpdate: '2023-10-15'
    },
    {
      id: 3,
      title: 'Drug Discovery Quantum Simulation',
      status: 'planning',
      progress: 20,
      members: 4,
      deadline: '2024-05-30',
      description: 'Using quantum computing for molecular simulation in drug discovery.',
      team: ['SM', 'JD', 'MR', 'AK'],
      technologies: ['Quantum Computing', 'Chemistry', 'Python'],
      completedTasks: 4,
      totalTasks: 20,
      lastUpdate: '2023-10-10'
    },
    {
      id: 4,
      title: 'Telemedicine Mobile Application',
      status: 'completed',
      progress: 100,
      members: 6,
      deadline: '2023-08-20',
      description: 'Mobile app for remote patient consultations and health monitoring.',
      team: ['SM', 'JD', 'MR', 'AK', 'LT', 'NP'],
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      completedTasks: 20,
      totalTasks: 20,
      lastUpdate: '2023-08-20'
    }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Sophie Martin',
      role: 'AI Research Scientist',
      avatar: 'SM',
      projects: 4,
      skills: ['AI', 'Machine Learning', 'Python'],
      status: 'online',
      availability: {
        timezone: 'Africa/Tunis',
        workingHours: { start: '09:00', end: '17:00' },
        days: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        },
        breaks: [{ start: '12:00', end: '13:00', enabled: true }]
      }
    },
    {
      id: 2,
      name: 'Dr. James Dawson',
      role: 'Biomedical Engineer',
      avatar: 'JD',
      projects: 3,
      skills: ['Biomedical', 'Electronics', 'Prototyping'],
      status: 'online',
      availability: {
        timezone: 'Africa/Tunis',
        workingHours: { start: '08:00', end: '16:00' },
        days: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        },
        breaks: [{ start: '12:30', end: '13:30', enabled: true }]
      }
    },
    {
      id: 3,
      name: 'Prof. Maria Rodriguez',
      role: 'Quantum Computing Specialist',
      avatar: 'MR',
      projects: 2,
      skills: ['Quantum Computing', 'Physics', 'Algorithms'],
      status: 'away',
      availability: {
        timezone: 'Europe/Paris',
        workingHours: { start: '10:00', end: '18:00' },
        days: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        },
        breaks: [{ start: '13:00', end: '14:00', enabled: true }]
      }
    },
    {
      id: 4,
      name: 'Dr. Ahmed Khan',
      role: 'Materials Scientist',
      avatar: 'AK',
      projects: 3,
      skills: ['Materials Science', 'Chemistry', 'Nanotech'],
      status: 'online',
      availability: {
        timezone: 'Africa/Tunis',
        workingHours: { start: '09:00', end: '17:00' },
        days: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        },
        breaks: [{ start: '12:00', end: '13:00', enabled: true }]
      }
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Software Developer',
      avatar: 'LT',
      projects: 2,
      skills: ['React', 'Node.js', 'Mobile Development'],
      status: 'offline',
      availability: {
        timezone: 'Africa/Tunis',
        workingHours: { start: '09:00', end: '17:00' },
        days: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        },
        breaks: [{ start: '12:00', end: '13:00', enabled: true }]
      }
    }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Project Kickoff Meeting',
      date: '2023-10-18',
      startTime: '10:00',
      endTime: '11:30',
      type: 'video',
      status: 'upcoming',
      participants: [1, 2, 3, 4],
      description: 'Discussion of project milestones and deliverables',
      minutes: null
    },
    {
      id: 2,
      title: 'Design Review Session',
      date: '2023-10-12',
      startTime: '14:00',
      endTime: '15:30',
      type: 'in-person',
      status: 'completed',
      participants: [1, 2, 5],
      location: 'Conference Room B',
      description: 'Review of UI/UX designs for the application',
      minutes: {
        summary: 'The team reviewed the UI/UX designs for the mobile application. Key decisions were made regarding the user flow and color scheme.',
        actionItems: [
          'Update landing page design based on feedback',
          'Create high-fidelity prototypes for user testing',
          'Schedule usability testing session for next week'
        ],
        attendees: ['Dr. Sophie Martin', 'Dr. James Dawson', 'Lisa Thompson'],
        attachments: ['design_review.pdf', 'wireframes.zip']
      }
    },
    {
      id: 3,
      title: 'Technical Architecture Discussion',
      date: '2023-10-20',
      startTime: '09:00',
      endTime: '10:30',
      type: 'hybrid',
      status: 'upcoming',
      participants: [1, 4, 5],
      description: 'Planning the technical architecture for the new platform',
      minutes: null
    }
  ]);

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'AI Model Training Results',
      author: 'Dr. Sophie Martin',
      timestamp: '2 hours ago',
      replies: 12,
      project: 'Medical AI Diagnostics Platform',
      unread: true,
      content: 'I\'ve completed the initial training of our AI model for medical image analysis. The results are promising with an accuracy of 92% on our test dataset. The model seems to perform particularly well on X-ray images but needs improvement on MRI scans.',
      repliesData: [
        {
          id: 1,
          author: 'Dr. James Dawson',
          timestamp: '1 hour ago',
          content: 'Great work Sophie! Have you tried using data augmentation techniques for the MRI scans? That might help improve performance.',
          avatar: 'JD'
        },
        {
          id: 2,
          author: 'Lisa Thompson',
          timestamp: '45 minutes ago',
          content: 'I can help with creating a more balanced dataset. Let me know if you need assistance with data preprocessing.',
          avatar: 'LT'
        }
      ]
    },
    {
      id: 2,
      title: 'Sensor Material Selection',
      author: 'Dr. Ahmed Khan',
      timestamp: '1 day ago',
      replies: 8,
      project: 'Biocompatible Sensor Development',
      unread: false,
      content: 'I\'ve been testing various biodegradable materials for our sensor prototypes. The PLA-based materials show good promise but lack the flexibility we need. I\'m considering trying a PLA-PHA blend for the next iteration.',
      repliesData: [
        {
          id: 1,
          author: 'Dr. Sophie Martin',
          timestamp: '20 hours ago',
          content: 'What about considering some hydrogel-based materials? They might provide the flexibility you\'re looking for while maintaining biocompatibility.',
          avatar: 'SM'
        },
        {
          id: 2,
          author: 'Dr. Ahmed Khan',
          timestamp: '18 hours ago',
          content: 'That\'s a good suggestion. I\'ll look into hydrogel options and run some compatibility tests.',
          avatar: 'AK'
        }
      ]
    },
    {
      id: 3,
      title: 'Quantum Computing Access',
      author: 'Prof. Maria Rodriguez',
      timestamp: '3 days ago',
      replies: 5,
      project: 'Drug Discovery Quantum Simulation',
      unread: true,
      content: 'I\'ve secured access to the IBM Quantum Experience platform for our drug discovery simulations. We have 10 hours of quantum computing time per week. Team members who will be using this resource please complete the onboarding training.',
      repliesData: [
        {
          id: 1,
          author: 'Dr. James Dawson',
          timestamp: '2 days ago',
          content: 'That\'s excellent news! I\'ve completed the training and ready to start running simulations next week.',
          avatar: 'JD'
        }
      ]
    },
    {
      id: 4,
      title: 'Project Timeline Review',
      author: 'Dr. James Dawson',
      timestamp: '1 week ago',
      replies: 15,
      project: 'Telemedicine Mobile Application',
      unread: false,
      content: 'We need to review the project timeline for the telemedicine app. The UI development is ahead of schedule but the backend integration is facing delays. Let\'s discuss how we can reallocate resources to address this.',
      repliesData: [
        {
          id: 1,
          author: 'Lisa Thompson',
          timestamp: '6 days ago',
          content: 'I can help with the backend integration. I have experience with the API framework they\'re using.',
          avatar: 'LT'
        },
        {
          id: 2,
          author: 'Dr. Sophie Martin',
          timestamp: '5 days ago',
          content: 'Let me know what specific areas need attention. I can free up some time next week to assist.',
          avatar: 'SM'
        }
      ]
    }
  ]);

  const [recentFiles, setRecentFiles] = useState([
    {
      id: 1,
      name: 'Research Paper Draft.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2023-10-15',
      project: 'Medical AI Diagnostics Platform',
      owner: 'Dr. Sophie Martin'
    },
    {
      id: 2,
      name: 'Sensor Design Specifications.docx',
      type: 'doc',
      size: '1.2 MB',
      modified: '2023-10-14',
      project: 'Biocompatible Sensor Development',
      owner: 'Dr. Ahmed Khan'
    },
    {
      id: 3,
      name: 'Quantum Algorithm Overview.pptx',
      type: 'ppt',
      size: '4.7 MB',
      modified: '2023-10-12',
      project: 'Drug Discovery Quantum Simulation',
      owner: 'Prof. Maria Rodriguez'
    },
    {
      id: 4,
      name: 'User Testing Results.xlsx',
      type: 'xls',
      size: '3.1 MB',
      modified: '2023-10-10',
      project: 'Telemedicine Mobile Application',
      owner: 'Lisa Thompson'
    }
  ]);

  // State for download notifications
  const [downloadNotifications, setDownloadNotifications] = useState([]);

  // Get sort preference from localStorage
  const [sortOrder, setSortOrder] = useState('name');
  
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setSortOrder(preferences.projectSortOrder || 'name');
    }
  }, []);

  // Sort projects based on the selected sort order
  const sortProjects = (projectsToSort, order) => {
    const sortedProjects = [...projectsToSort];
    
    switch (order) {
      case 'name':
        return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
      case 'name_desc':
        return sortedProjects.sort((a, b) => b.title.localeCompare(a.title));
      case 'date':
        return sortedProjects.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
      case 'date_asc':
        return sortedProjects.sort((a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate));
      case 'size':
        return sortedProjects.sort((a, b) => b.totalTasks - a.totalTasks);
      case 'size_asc':
        return sortedProjects.sort((a, b) => a.totalTasks - b.totalTasks);
      case 'type':
        return sortedProjects.sort((a, b) => {
          const aType = a.technologies[0] || '';
          const bType = b.technologies[0] || '';
          return aType.localeCompare(bType);
        });
      case 'status':
        return sortedProjects.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sortedProjects;
    }
  };

  // Filter projects based on current filter
  const filteredProjects = projects.filter(project => {
    if (state.filter === 'all') return true;
    return project.status === state.filter;
  });

  // Sort the filtered projects
  const sortedAndFilteredProjects = sortProjects(filteredProjects, sortOrder);

  // Prepare data object
  const data = {
    projects,
    teamMembers,
    meetings,
    discussions,
    recentFiles,
    filteredProjects: sortedAndFilteredProjects
  };

  // Prepare setData object
  const setData = {
    setProjects,
    setTeamMembers,
    setMeetings,
    setDiscussions,
    setRecentFiles
  };

  // Get handlers
  const handlers = useCollaborationHandlers(
    navigate, 
    setState, 
    state, 
    data, 
    setData,
    setDownloadNotifications,
    setSuccessDialog // Pass setSuccessDialog to handlers
  );

  useEffect(() => {
    // Check if we're coming from project detail with edit request
    if (location.state && location.state.editProject) {
      setState(prev => ({
        ...prev,
        editingProject: location.state.editProject,
        showNewProjectModal: true
      }));
      
      // Clear the state to prevent reopening the modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handler to set state values
  const setStateValue = (key, value) => {
    console.log(`Setting state: ${key} =`, value);
    setState(prev => ({ ...prev, [key]: value }));
  };

  // Handler for availability modal
  const handleAvailabilityClick = (member) => {
    setState(prev => ({
      ...prev,
      showAvailabilityModal: true,
      selectedMember: member
    }));
  };

  // Handler for saving availability
  const handleAvailabilitySave = (availabilityData) => {
    console.log('Saving availability for', state.selectedMember.name, availabilityData);
    
    // Update team member's availability
    const updatedTeamMembers = teamMembers.map(member => {
      if (member.id === state.selectedMember.id) {
        return {
          ...member,
          availability: availabilityData
        };
      }
      return member;
    });
    
    setTeamMembers(updatedTeamMembers);
    setState(prev => ({
      ...prev,
      showAvailabilityModal: false,
      selectedMember: null
    }));
    
    // Show success dialog instead of alert
    setSuccessDialog({
      show: true,
      message: `Availability settings for ${state.selectedMember.name} saved successfully!`
    });
  };

  // Handler for scheduling meeting
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
    
    // Show success dialog instead of alert
    setSuccessDialog({
      show: true,
      message: 'Meeting scheduled successfully!'
    });
  };

  // Remove download notification after 3 seconds
  useEffect(() => {
    if (downloadNotifications.length > 0) {
      const timer = setTimeout(() => {
        setDownloadNotifications(prev => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [downloadNotifications]);

  // Auto-hide success dialog after 3 seconds
  useEffect(() => {
    if (successDialog.show) {
      const timer = setTimeout(() => {
        setSuccessDialog({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successDialog.show]);

  // Debug state changes
  useEffect(() => {
    console.log('Current state:', state);
  }, [state]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textprimary">My Projects & Collaboration</h1>
        <p className="text-textsecondary">Manage projects, team members, and collaborate effectively</p>
      </div>
      
      {/* Download Success Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {downloadNotifications.map((notification, index) => (
          <DownloadSuccessNotification 
            key={index}
            fileName={notification.fileName}
            onClose={() => setDownloadNotifications(prev => prev.filter((_, i) => i !== index))}
          />
        ))}
      </div>
      
      {/* Success Dialog */}
      {successDialog.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <i className="fas fa-check text-green-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-textprimary">Success</h3>
            </div>
            <p className="text-textsecondary mb-4">{successDialog.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setSuccessDialog({ show: false, message: '' })}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        <CollaborationTabs 
          activeTab={state.activeTab}
          state={state}
          handlers={handlers}
          data={data}
          setStateValue={setStateValue}
          onAvailabilityClick={handleAvailabilityClick}
        />

        {/* Modal components */}
        {state.showNewProjectModal && (
          <NewProjectModal 
            project={state.editingProject}
            onClose={() => {
              setStateValue('showNewProjectModal', false);
              setStateValue('editingProject', null);
            }}
            onSave={handlers.handleSaveProject}
          />
        )}

        {state.showNewMeetingModal && (
          <MeetingScheduler 
            teamMembers={teamMembers} 
            onScheduleMeeting={handleScheduleMeeting}
            onClose={() => setStateValue('showNewMeetingModal', false)}
          />
        )}

        {state.showRescheduleModal && state.reschedulingMeeting && (
          <MeetingRescheduler
            meeting={state.reschedulingMeeting}
            teamMembers={teamMembers}
            onReschedule={handlers.handleRescheduleMeeting}
            onClose={() => {
              setStateValue('showRescheduleModal', false);
              setStateValue('reschedulingMeeting', null);
            }}
          />
        )}

        {state.showVideoConferenceModal && state.joiningMeeting && (
          <VideoConferenceModal
            meeting={state.joiningMeeting}
            onClose={() => {
              setStateValue('showVideoConferenceModal', false);
              setStateValue('joiningMeeting', null);
            }}
            onJoin={handlers.handleJoinConference}
          />
        )}

        {state.showMeetingMinutesModal && state.viewingMinutesMeeting && (
          <MeetingMinutesModal
            meeting={state.viewingMinutesMeeting}
            teamMembers={teamMembers}
            onClose={() => {
              setStateValue('showMeetingMinutesModal', false);
              setStateValue('viewingMinutesMeeting', null);
            }}
          />
        )}

        {state.showAvailabilityChecker && (
          <AvailabilityChecker
            teamMembers={teamMembers}
            onClose={() => setStateValue('showAvailabilityChecker', false)}
          />
        )}

        {state.showMessageModal && state.selectedMember && (
          <MessageModal
            member={state.selectedMember}
            onClose={() => {
              setStateValue('showMessageModal', false);
              setStateValue('selectedMember', null);
            }}
            onSend={handlers.handleSendMessage}
          />
        )}

        {state.showInviteMemberModal && (
          <InviteMemberModal
            onClose={() => setStateValue('showInviteMemberModal', false)}
            onInvite={handlers.handleInviteMember}
          />
        )}

        {state.showDiscussionThread && state.selectedDiscussion && (
          <DiscussionThread
            discussion={state.selectedDiscussion}
            onClose={() => {
              setStateValue('showDiscussionThread', false);
              setStateValue('selectedDiscussion', null);
            }}
            onReply={handlers.handlePostReply}
          />
        )}

        {state.showNewDiscussionModal && (
          <NewDiscussionModal
            projects={projects}
            onClose={() => {
              console.log('Closing NewDiscussionModal');
              setStateValue('showNewDiscussionModal', false);
            }}
            onCreate={handlers.handleCreateDiscussion}
          />
        )}

        {state.showUploadFileModal && (
          <UploadFileModal
            projects={projects}
            onClose={() => setStateValue('showUploadFileModal', false)}
            onUpload={handlers.handleFileUpload}
          />
        )}

        {/* Availability Modal */}
        {state.showAvailabilityModal && state.selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Set Availability</h2>
                    <p className="text-blue-100 text-sm mt-1">{state.selectedMember.name}'s working hours</p>
                  </div>
                  <button
                    onClick={() => setState(prev => ({
                      ...prev,
                      showAvailabilityModal: false,
                      selectedMember: null
                    }))}
                    className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <AvailabilitySelector 
                  onAvailabilitySave={handleAvailabilitySave}
                  initialAvailability={state.selectedMember.availability}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Collaboration;