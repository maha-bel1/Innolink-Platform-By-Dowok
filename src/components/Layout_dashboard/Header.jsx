import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-textprimary">Dashboard</h2>
        <p className="text-textsecondary">Welcome to your personal InnoLink space</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <i className="fas fa-search text-textlight absolute left-3 top-2.5"></i>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accentblue w-64"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fas fa-bell text-textsecondary"></i>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accentred rounded-full flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </span>
          </div>
          
          <div className="h-10 w-10 rounded-full bg-accentblue flex items-center justify-center">
            <span className="font-semibold text-white">SM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;