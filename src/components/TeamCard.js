import { Share2, Edit2, Trash2 } from 'lucide-react';

const TeamCard = ({ team, index, onEdit, onDelete, onPreview, onRegister, isRegistered, isSelected, onSelectChange }) => {
  const getRoleCounts = () => {
    const counts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
    team.players.forEach(player => {
      const role = player.role.includes('Keeper') ? 'WK' :
                   player.role.includes('Batsman') ? 'BAT' :
                   player.role.includes('All-Rounder') ? 'AR' : 'BOWL';
      counts[role]++;
    });
    return counts;
  };

  const counts = getRoleCounts();
  const captain = team.players.find(p => p.id === team.captain);
  const viceCaptain = team.players.find(p => p.id === team.viceCaptain);

  const getTeamColor = (teamId) => {
    return teamId === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  };

  const getTeamLogo = (teamId) => {
    return teamId === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  };

  const registeredCount = team.isRegistered ? '1 contest joined' : '0 contest joined';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with Checkbox and Title */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <div className="flex items-center gap-3 flex-1">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onSelectChange}
            disabled={isRegistered}
            className="w-5 h-5 rounded cursor-pointer" 
          />
          <div>
            <p className="font-semibold text-sm">Team {index + 1}</p>
            <p className="text-xs text-gray-500">({registeredCount})</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600 p-1"><Share2 className="w-4 h-4" /></button>
          <button onClick={onEdit} className="text-gray-400 hover:text-gray-600 p-1"><Edit2 className="w-4 h-4" /></button>
          <button onClick={onDelete} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Captain & Vice-Captain Section */}
      <div className="px-4 py-4 flex items-center justify-between gap-6">
        {captain && (
          <div className="flex items-center gap-2 flex-1">
            <div className={`${getTeamColor(captain.team_id)} w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-white flex-shrink-0`}>
              <img 
                src={getTeamLogo(captain.team_id)} 
                alt="Captain" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-700">{captain.short_name || captain.name}</p>
              <p className="text-xs text-green-600 font-bold">Captain</p>
            </div>
          </div>
        )}

        {viceCaptain && (
          <div className="flex items-center gap-2 flex-1">
            <div className={`${getTeamColor(viceCaptain.team_id)} w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-white flex-shrink-0`}>
              <img 
                src={getTeamLogo(viceCaptain.team_id)} 
                alt="Vice-Captain" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-700">{viceCaptain.short_name || viceCaptain.name}</p>
              <p className="text-xs text-green-600 font-bold">Vice Captain</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats and Preview Button */}
      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">WK</p>
            <p className="font-bold text-sm">{counts.WK}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">BAT</p>
            <p className="font-bold text-sm">{counts.BAT}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">AR</p>
            <p className="font-bold text-sm">{counts.AR}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">BOWL</p>
            <p className="font-bold text-sm">{counts.BOWL}</p>
          </div>
        </div>
        
        <button 
          onClick={onPreview}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-pink-600 whitespace-nowrap ml-4"
        >
          Team Preview
        </button>
      </div>
    </div>
  );
};

export default TeamCard;