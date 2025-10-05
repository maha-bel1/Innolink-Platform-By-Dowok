import React from 'react';
import Card from '../common/Card';

const RecentActivityFeed = ({ activities }) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-textprimary font-semibold">Recent Activity</h3>
        <button className="text-xs text-accentblue hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className={`p-2 rounded-lg ${activity.color} mr-3 mt-1`}>
              <i className={`${activity.icon} text-sm`}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-textprimary">{activity.title}</p>
              <p className="text-xs text-textsecondary">{activity.description}</p>
              <p className="text-xs text-textlight mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityFeed;