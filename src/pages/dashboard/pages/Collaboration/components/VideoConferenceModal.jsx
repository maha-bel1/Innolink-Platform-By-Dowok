import React, { useState, useEffect } from 'react';

const VideoConferenceModal = ({ meeting, onClose, onJoin }) => {
  const [localStream, setLocalStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        // Fallback: continue without media devices
        setIsAudioEnabled(false);
        setIsVideoEnabled(false);
      }
    };

    initializeMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Switch back to camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        setIsScreenSharing(false);
      } else {
        // Switch to screen share
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        setIsScreenSharing(true);
        
        // Handle when user stops screen share
        stream.getVideoTracks()[0].onended = async () => {
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setLocalStream(cameraStream);
          setIsScreenSharing(false);
        };
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  const handleJoin = () => {
    onJoin(localStream);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Join Video Conference</h2>
              <p className="text-blue-100 text-sm mt-1">{meeting.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Video Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-textprimary mb-3">Preview</h3>
            <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center relative">
              {localStream && isVideoEnabled ? (
                <video
                  ref={video => {
                    if (video) video.srcObject = localStream;
                  }}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-white text-center">
                  <i className="fas fa-camera text-3xl mb-2"></i>
                  <p>{localStream ? 'Camera disabled' : 'Loading camera...'}</p>
                </div>
              )}
              
              {/* Connection Status */}
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Ready to join</span>
              </div>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-textprimary mb-2">Meeting Details</h3>
            <div className="space-y-1 text-sm text-textsecondary">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(meeting.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{meeting.startTime} - {meeting.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Participants:</span>
                <span>{meeting.participants.length} people</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="capitalize">{meeting.type}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-textprimary mb-3">Audio & Video Settings</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${
                  isAudioEnabled 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}
              >
                <i className={`fas ${isAudioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
              </button>
              
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoEnabled 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}
              >
                <i className={`fas ${isVideoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
              </button>
              
              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full ${
                  isScreenSharing 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                <i className="fas fa-desktop"></i>
              </button>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-center">
            <button
              onClick={handleJoin}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Join Meeting
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <i className="fas fa-info-circle mr-1"></i>
              Make sure your microphone and camera permissions are enabled for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConferenceModal;