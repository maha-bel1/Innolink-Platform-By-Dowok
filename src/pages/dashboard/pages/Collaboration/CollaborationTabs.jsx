import React from 'react';
import Card from '../../../../components/common/Card';
import ProjectCard from './components/ProjectCard';
import TeamMemberCard from './components/TeamMemberCard';
import DiscussionCard from './components/DiscussionCard';
import FileCard from './components/FileCard';
import ProjectFilters from './components/ProjectFilters';
import MeetingCard from './components/MeetingCard';

const CollaborationTabs = ({ 
  activeTab, 
  state, 
  handlers, 
  data,
  setStateValue 
}) => {
  const {
    projects,
    teamMembers,
    meetings,
    discussions,
    recentFiles,
    filteredProjects
  } = data;

  const {
    handleEditProject,
    handleViewProject,
    handleDownloadFile,
    handleShareFile
  } = handlers;

  // Render Projects tab
  const renderProjectsTab = () => (
    <div className="space-y-6">
      <ProjectFilters filter={state.filter} setFilter={(filter) => setStateValue('filter', filter)} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onEdit={() => handleEditProject(project)}
            onView={() => handleViewProject(project)}
          />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <Card className="p-8 text-center">
          <i className="fas fa-folder-open text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-textsecondary mb-2">No projects found</h3>
          <p className="text-textsecondary">Try changing your filter settings or create a new project.</p>
        </Card>
      )}
    </div>
  );

  // Render Team tab
  const renderTeamTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map(member => (
        <TeamMemberCard 
          key={member.id} 
          member={member} 
          onMessage={(member) => setStateValue('selectedMember', member)}
        />
      ))}
    </div>
  );

  // Render Meetings tab
  const renderMeetingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button 
            onClick={() => setStateValue('showAvailabilityChecker', true)}
            className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50"
          >
            <i className="fas fa-calendar-check mr-2"></i>Check Availability
          </button>
          <button 
            onClick={() => setStateValue('showNewMeetingModal', true)}
            className="px-4 py-2 bg-accentgreen text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <i className="fas fa-calendar-plus mr-2"></i>New Meeting
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map(meeting => (
          <MeetingCard 
            key={meeting.id} 
            meeting={meeting} 
            teamMembers={teamMembers}
            onReschedule={(meeting) => {
              setStateValue('reschedulingMeeting', meeting);
              setStateValue('showRescheduleModal', true);
            }}
            onJoin={(meeting) => {
              setStateValue('joiningMeeting', meeting);
              setStateValue('showVideoConferenceModal', true);
            }}
            onViewMinutes={(meeting) => {
              setStateValue('viewingMinutesMeeting', meeting);
              setStateValue('showMeetingMinutesModal', true);
            }}
          />
        ))}
      </div>
      
      {meetings.length === 0 && (
        <Card className="p-8 text-center">
          <i className="fas fa-calendar-alt text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-textsecondary mb-2">No meetings scheduled</h3>
          <p className="text-textsecondary">Schedule a meeting to get started with your team collaboration.</p>
        </Card>
      )}
    </div>
  );

  // Render Discussions tab
  const renderDiscussionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setStateValue('showNewDiscussionModal', true)}
          className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>New Discussion
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {discussions.map(discussion => (
          <DiscussionCard 
            key={discussion.id} 
            discussion={discussion} 
            onViewThread={() => setStateValue('selectedDiscussion', discussion)}
            onReply={() => setStateValue('selectedDiscussion', discussion)}
          />
        ))}
      </div>
      
      {discussions.length === 0 && (
        <Card className="p-8 text-center">
          <i className="fas fa-comments text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-textsecondary mb-2">No discussions yet</h3>
          <p className="text-textsecondary">Start a discussion to collaborate with your team members.</p>
        </Card>
      )}
    </div>
  );

  // Render Files tab
  const renderFilesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setStateValue('showUploadFileModal', true)}
          className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <i className="fas fa-upload mr-2"></i>Upload File
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentFiles.map(file => (
          <FileCard 
            key={file.id} 
            file={file} 
            onDownload={() => handleDownloadFile(file)}
            onShare={() => handleShareFile(file)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          <button
            className={`px-6 py-4 font-medium text-sm ${activeTab === 'projects' ? 'text-accentblue border-b-2 border-accentblue' : 'text-textsecondary hover:text-textprimary'}`}
            onClick={() => setStateValue('activeTab', 'projects')}
          >
            <i className="fas fa-folder mr-2"></i>Projects
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${activeTab === 'team' ? 'text-accentblue border-b-2 border-accentblue' : 'text-textsecondary hover:text-textprimary'}`}
            onClick={() => setStateValue('activeTab', 'team')}
          >
            <i className="fas fa-users mr-2"></i>Team
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${activeTab === 'meetings' ? 'text-accentblue border-b-2 border-accentblue' : 'text-textsecondary hover:text-textprimary'}`}
            onClick={() => setStateValue('activeTab', 'meetings')}
          >
            <i className="fas fa-calendar mr-2"></i>Meetings
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${activeTab === 'discussions' ? 'text-accentblue border-b-2 border-accentblue' : 'text-textsecondary hover:text-textprimary'}`}
            onClick={() => setStateValue('activeTab', 'discussions')}
          >
            <i className="fas fa-comments mr-2"></i>Discussions
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${activeTab === 'files' ? 'text-accentblue border-b-2 border-accentblue' : 'text-textsecondary hover:text-textprimary'}`}
            onClick={() => setStateValue('activeTab', 'files')}
          >
            <i className="fas fa-file mr-2"></i>Files
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'projects' && renderProjectsTab()}
        {activeTab === 'team' && renderTeamTab()}
        {activeTab === 'meetings' && renderMeetingsTab()}
        {activeTab === 'discussions' && renderDiscussionsTab()}
        {activeTab === 'files' && renderFilesTab()}
      </div>
    </Card>
  );
};

export default CollaborationTabs;