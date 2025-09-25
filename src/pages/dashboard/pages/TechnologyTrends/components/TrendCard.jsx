import React, { useState } from 'react';
import Card from '../../../../../components/common/Card'; // Updated path

const TrendCard = ({ trend, isInitiallySaved = false, onSaveChange }) => {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  
  const impactLabels = {
    'very-high': { label: 'Very High Impact', color: 'bg-red-100 text-red-800' },
    'high': { label: 'High Impact', color: 'bg-orange-100 text-orange-800' },
    'medium': { label: 'Medium Impact', color: 'bg-yellow-100 text-yellow-800' },
    'low': { label: 'Low Impact', color: 'bg-blue-100 text-blue-800' }
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    // Notify parent component about the save state change
    if (onSaveChange) {
      onSaveChange(newSavedState);
    }
    
    // In a real application, you would save this to your backend or state management
    console.log(`${newSavedState ? 'Saved' : 'Unsaved'} trend: ${trend.title}`);
    
    // Show feedback to user
    if (newSavedState) {
      // You could add a toast notification here
      console.log(`Trend "${trend.title}" has been saved to your collection`);
    }
  };

  return (
    <Card className="p-5 card-hover h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${impactLabels[trend.impact].color}`}>
          {impactLabels[trend.impact].label}
        </span>
        <span className="text-xs text-textsecondary">{trend.date}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-textprimary mb-2">{trend.title}</h3>
      <p className="text-sm text-textsecondary mb-4 flex-grow">{trend.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-textsecondary mb-1">
          <span>Relevance to your work</span>
          <span>{trend.relevance}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accentblue h-2 rounded-full"
            style={{ width: `${trend.relevance}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {trend.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-textsecondary">
        <span>Source: {trend.source}</span>
        <button 
          className={`${isSaved ? 'text-accentblue' : 'text-textsecondary'} hover:text-accentblue transition-colors`}
          onClick={handleSaveClick}
          title={isSaved ? 'Remove from saved' : 'Save for later'}
        >
          <i className={`fas ${isSaved ? 'fa-bookmark' : 'fa-bookmark-o'} mr-1`}></i>
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </Card>
  );
};

export default TrendCard;