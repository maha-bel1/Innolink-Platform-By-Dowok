import React from 'react';
import Card from "../../../../../components/common/Card";

const SourceCard = ({ title, sources, type }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'journal': return 'fa-book';
      case 'patent': return 'fa-file-alt';
      case 'conference': return 'fa-calendar';
      default: return 'fa-rss';
    }
  };

  const getMetric = (source, type) => {
    switch (type) {
      case 'journal':
        return source.articles ? `${source.articles} new articles` : 'No new content';
      case 'patent':
        return source.patents ? `${source.patents} new patents` : 'No new patents';
      case 'conference':
        return source.nextEvent ? `Next: ${source.nextEvent}` : 'No upcoming events';
      default:
        return source.lastUpdate ? `Updated: ${source.lastUpdate}` : '';
    }
  };

  return (
    <Card className="p-5 card-hover">
      <div className="flex items-center mb-4">
        <i className={`fas ${getIcon(type)} text-accentblue mr-2`}></i>
        <h3 className="text-lg font-semibold text-textprimary">{title}</h3>
      </div>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="flex justify-between items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-textprimary font-medium">{source.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${source.statusColor}`}>
                  {source.status}
                </span>
              </div>
              <div className="text-xs text-textsecondary">
                {getMetric(source, type)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SourceCard;