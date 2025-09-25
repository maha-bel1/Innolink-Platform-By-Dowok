import Card from '../../../../../components/common/Card';
import AvailabilitySelector from './AvailabilitySelector';

const TeamMemberCard = ({ member, onMessage }) => {
  const [showAvailability, setShowAvailability] = useState(false);

  const statusColors = {
    online: 'bg-green-400',
    away: 'bg-yellow-400',
    offline: 'bg-gray-400'
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    offline: 'Offline'
  };

  const handleAvailabilitySave = (availabilityData) => {
    console.log('Saving availability for', member.name, availabilityData);
    // Here you would typically send the availability data to your backend
    setShowAvailability(false);
  };

  const handleMessageClick = () => {
    onMessage(member);
  };

  return (
    <>
      <Card className="p-5 card-hover">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-accentblue flex items-center justify-center mr-3">
                <span className="text-white font-semibold">{member.avatar}</span>
              </div>
              <div className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-white ${statusColors[member.status]}`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-textprimary">{member.name}</h3>
              <p className="text-sm text-textsecondary">{member.role}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[member.status].replace('400', '100')} ${statusColors[member.status].replace('400', '800')}`}>
            {statusLabels[member.status]}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-textsecondary mb-2">
            <span>Active Projects</span>
            <span>{member.projects}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {member.skills.map(skill => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleMessageClick}
            className="flex-1 py-2 px-3 bg-surface text-textsecondary border border-border rounded-lg hover:bg-gray-50 text-sm"
          >
            <i className="fas fa-envelope mr-1"></i>Message
          </button>
          <button 
            onClick={() => setShowAvailability(true)}
            className="flex-1 py-2 px-3 bg-accentblue text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            <i className="fas fa-calendar mr-1"></i>Availability
          </button>
        </div>
      </Card>

      {/* Availability Modal */}
      {showAvailability && (
        <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Set Availability</h2>
                  <p className="text-blue-100 text-sm mt-1">{member.name}'s working hours</p>
                </div>
                <button
                  onClick={() => setShowAvailability(false)}
                  className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <AvailabilitySelector onAvailabilitySave={handleAvailabilitySave} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMemberCard;