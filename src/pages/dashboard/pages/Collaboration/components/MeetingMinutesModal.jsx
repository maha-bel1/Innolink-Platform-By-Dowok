import React from 'react';

const MeetingMinutesModal = ({ meeting, teamMembers, onClose }) => {
  const getParticipantNames = (participantIds) => {
    return participantIds.map(id => {
      const participant = teamMembers.find(m => m.id === id);
      return participant ? participant.name : 'Unknown';
    });
  };

  const handleDownloadMinutes = () => {
    if (!meeting.minutes) return;

    // Create meeting minutes content
    const minutesContent = `
MEETING MINUTES
===============

Meeting: ${meeting.title}
Date: ${new Date(meeting.date).toLocaleDateString()}
Time: ${meeting.startTime} - ${meeting.endTime}
Type: ${meeting.type}
${meeting.location ? `Location: ${meeting.location}` : ''}

ATTENDEES
---------
${getParticipantNames(meeting.participants).join(', ')}

MEETING SUMMARY
---------------
${meeting.minutes.summary}

${meeting.minutes.actionItems && meeting.minutes.actionItems.length > 0 ? `
ACTION ITEMS
------------
${meeting.minutes.actionItems.map((item, index) => `${index + 1}. ${item}`).join('\n')}
` : ''}

${meeting.minutes.attachments && meeting.minutes.attachments.length > 0 ? `
ATTACHMENTS
-----------
${meeting.minutes.attachments.join(', ')}
` : ''}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and trigger download
    const blob = new Blob([minutesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-minutes-${meeting.title.toLowerCase().replace(/\s+/g, '-')}-${meeting.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Meeting Minutes</h2>
              <p className="text-purple-100 text-sm mt-1">{meeting.title}</p>
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
          {meeting.minutes ? (
            <div className="space-y-6">
              {/* Meeting Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                  <p className="text-textprimary">{new Date(meeting.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
                  <p className="text-textprimary">{meeting.startTime} - {meeting.endTime}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                  <p className="text-textprimary capitalize">{meeting.type}</p>
                </div>
                {meeting.location && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                    <p className="text-textprimary">{meeting.location}</p>
                  </div>
                )}
              </div>

              {/* Attendees */}
              <div>
                <h3 className="text-lg font-semibold text-textprimary mb-3">Attendees</h3>
                <div className="flex flex-wrap gap-2">
                  {getParticipantNames(meeting.participants).map((name, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meeting Summary */}
              <div>
                <h3 className="text-lg font-semibold text-textprimary mb-3">Meeting Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-textsecondary">{meeting.minutes.summary}</p>
                </div>
              </div>

              {/* Action Items */}
              {meeting.minutes.actionItems && meeting.minutes.actionItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-textprimary mb-3">Action Items</h3>
                  <ul className="space-y-2">
                    {meeting.minutes.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span className="text-textsecondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attachments */}
              {meeting.minutes.attachments && meeting.minutes.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-textprimary mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {meeting.minutes.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-file text-gray-400 mr-2"></i>
                          <span className="text-textsecondary">{attachment}</span>
                        </div>
                        <button 
                          className="text-accentblue hover:text-blue-600"
                          onClick={() => {
                            // Create a mock download for attachments
                            const blob = new Blob([`Mock content for ${attachment}`], { type: 'application/octet-stream' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = attachment;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-file-alt text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-textprimary mb-2">No minutes recorded</h3>
              <p className="text-textsecondary">Meeting minutes haven't been added for this meeting yet.</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            {meeting.minutes && (
              <button 
                onClick={handleDownloadMinutes}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <i className="fas fa-download mr-2"></i>Download Minutes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingMinutesModal;