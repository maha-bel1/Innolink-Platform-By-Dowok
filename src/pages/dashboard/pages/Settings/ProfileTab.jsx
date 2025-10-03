import React, { useRef, useState } from 'react';
import Card from '../../../../components/common/Card';

const ProfileTab = ({ userData, setUserData, onSave }) => {
  const fileInputRef = useRef(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const showMessage = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setShowMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        showMessage('Invalid File', 'Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showMessage('File Too Large', 'Please select an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setUserData(prev => ({
      ...prev,
      profilePhoto: null
    }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="relative">
      {/* Message Dialog */}
      {showMessageDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={handleCloseMessageDialog}></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-textprimary mb-4">
              {dialogTitle}
            </h3>
            <p className="text-textsecondary mb-6">
              {dialogMessage}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseMessageDialog}
                className="px-4 py-2 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-textprimary mb-6">Profile Information</h2>
        
        <div className="flex items-center mb-8">
          {userData.profilePhoto ? (
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
              <img 
                src={userData.profilePhoto} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-accentblue flex items-center justify-center mr-6">
              <span className="text-white text-2xl font-semibold">{userData.profileInitials}</span>
            </div>
          )}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
              id="profile-photo-input"
            />
            <label 
              htmlFor="profile-photo-input"
              className="px-4 py-2 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm mr-3 cursor-pointer"
            >
              <i className="fas fa-camera mr-2"></i>Change Photo
            </label>
            <button 
              onClick={handleRemovePhoto}
              className="px-4 py-2 text-textsecondary hover:text-red-600 text-sm"
              disabled={!userData.profilePhoto}
            >
              <i className="fas fa-trash mr-2"></i>Remove
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-textprimary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={userData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={userData.organization}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-textprimary mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={userData.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textprimary mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accentblue"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileTab;