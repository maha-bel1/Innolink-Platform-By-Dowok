import React, { useState, useEffect, useRef } from 'react';

const VideoConferenceModal = ({ meeting, onClose, onJoin }) => {
  const [localStream, setLocalStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
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
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsScreenSharing(false);
      } else {
        // Switch to screen share
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
        
        // Handle when user stops screen share
        stream.getVideoTracks()[0].onended = async () => {
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setLocalStream(cameraStream);
          if (videoRef.current) {
            videoRef.current.srcObject = cameraStream;
          }
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
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Join Video Conference</h2>
              <p className="text-blue-100 text-sm mt-1">{meeting.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-3 rounded-full hover:bg-white/10 flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Video Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-textprimary mb-3">Preview</h3>
            <div className="bg-gray-900 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
              {localStream && isVideoEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-white text-center p-4">
                  <i className="fas fa-user text-4xl mb-3 text-gray-400"></i>
                  <p className="text-lg font-medium">Camera {localStream ? 'disabled' : 'loading...'}</p>
                  {!localStream && (
                    <p className="text-sm text-gray-300 mt-1">Requesting camera access...</p>
                  )}
                </div>
              )}
              
              {/* Connection Status */}
              <div className="absolute top-3 right-3 flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Ready to join</span>
              </div>

              {/* User Name Badge */}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">You</span>
              </div>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-textprimary mb-2">Meeting Details</h3>
            <div className="space-y-2 text-sm text-textsecondary">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(meeting.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{meeting.startTime} - {meeting.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Participants:</span>
                <span>{meeting.participants.length} people</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className="capitalize">{meeting.type}</span>
              </div>
              {meeting.location && (
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{meeting.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Audio & Video Controls */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-textprimary mb-4">Audio & Video Settings</h3>
            <div className="flex justify-center space-x-4">
              {/* Microphone Control */}
              <button
                onClick={toggleAudio}
                className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
                  isAudioEnabled 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-red-500 text-white shadow-lg'
                } hover:scale-105`}
              >
                <i className={`fas text-2xl mb-2 ${isAudioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
                <span className="text-sm font-medium">
                  {isAudioEnabled ? 'Mute' : 'Unmute'}
                </span>
              </button>
              
              {/* Camera Control */}
              <button
                onClick={toggleVideo}
                className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
                  isVideoEnabled 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-red-500 text-white shadow-lg'
                } hover:scale-105`}
              >
                <i className={`fas text-2xl mb-2 ${isVideoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
                <span className="text-sm font-medium">
                  {isVideoEnabled ? 'Stop Video' : 'Start Video'}
                </span>
              </button>
              
              {/* Screen Share Control */}
              <button
                onClick={toggleScreenShare}
                className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
                  isScreenSharing 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-300 text-gray-700 shadow-lg'
                } hover:scale-105`}
              >
                <i className="fas fa-desktop text-2xl mb-2"></i>
                <span className="text-sm font-medium">
                  {isScreenSharing ? 'Stop Share' : 'Share Screen'}
                </span>
              </button>
            </div>

            {/* Control Status */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div className={`p-2 rounded-lg ${isAudioEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <i className={`fas fa-microphone ${isAudioEnabled ? 'text-green-600' : 'text-red-600'} mr-1`}></i>
                {isAudioEnabled ? 'Audio enabled' : 'Audio muted'}
              </div>
              <div className={`p-2 rounded-lg ${isVideoEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <i className={`fas fa-video ${isVideoEnabled ? 'text-green-600' : 'text-red-600'} mr-1`}></i>
                {isVideoEnabled ? 'Video enabled' : 'Video off'}
              </div>
              <div className={`p-2 rounded-lg ${isScreenSharing ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                <i className="fas fa-desktop mr-1"></i>
                {isScreenSharing ? 'Sharing screen' : 'Screen share ready'}
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center"
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </button>
            <button
              onClick={handleJoin}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Join Meeting
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">Before joining:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Make sure your microphone and camera permissions are enabled</li>
                  <li>• Test your audio and video settings before joining</li>
                  <li>• Use headphones for better audio quality</li>
                  <li>• Ensure you have a stable internet connection</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <i className="fas fa-volume-up mb-1"></i>
              <div>Press Space to mute/unmute</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <i className="fas fa-expand mb-1"></i>
              <div>F11 for fullscreen</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <i className="fas fa-keyboard mb-1"></i>
              <div>Ctrl+D to toggle chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConferenceModal;