import React, { useState } from 'react';
import Card from '../common/Card';

const ActivityChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  
  const days = [
    { day: 'Mon', height: '80%' },
    { day: 'Tue', height: '60%' },
    { day: 'Wed', height: '90%' },
    { day: 'Thu', height: '40%' },
    { day: 'Fri', height: '75%' },
    { day: 'Sat', height: '30%' },
    { day: 'Sun', height: '20%' },
  ];

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Recent Activity</h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="text-xs border border-border rounded px-2 py-1 text-textsecondary"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="h-64 flex items-end space-x-2">
        {days.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-10 bg-accentblue rounded-t-md"
              style={{ height: item.height }}
            ></div>
            <p className="text-xs text-textsecondary mt-2">{item.day}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityChart;