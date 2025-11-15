import { ChevronLeft, X, Share2 } from 'lucide-react';

const TeamPreview = ({ team, match, onClose, onEdit, onDelete, teamIndex }) => {
  if (!team) return null;

  const captain = team.players.find(p => p.id === team.captain);
  const viceCaptain = team.players.find(p => p.id === team.viceCaptain);

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

  const getPlayersByRole = (roleType) => {
    return team.players.filter(p => {
      if (roleType === 'WK') return p.role.includes('Keeper');
      if (roleType === 'BAT') return p.role.includes('Batsman');
      if (roleType === 'AR') return p.role.includes('All-Rounder');
      if (roleType === 'BOWL') return p.role.includes('Bowler');
      return false;
    });
  };

  const counts = getRoleCounts();

  const getTeamColor = (teamId) => {
    return teamId === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  };

  const getTeamLogo = (teamId) => {
    return teamId === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onClose}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="font-semibold">Team {teamIndex + 1} Preview</span>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <img src={match?.t1_image} alt="" className="w-6 h-6 object-contain" />
              <span className="text-xs font-semibold">{match?.t1_short_name}</span>
            </div>
            <span className="text-xs text-white/70">vs</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">{match?.t2_short_name}</span>
              <img src={match?.t2_image} alt="" className="w-6 h-6 object-contain" />
            </div>
          </div>
        </div>

        {/* Captain & Vice-Captain Section */}
        <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <p className="text-xs font-semibold text-gray-600 mb-4">CAPTAIN & VICE-CAPTAIN</p>
          <div className="flex items-center justify-around gap-4">
            {captain && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className={`${getTeamColor(captain.team_id)} w-20 h-20 rounded-full flex items-center justify-center shadow-md overflow-hidden border-4 border-white`}>
                    <img 
                      src={getTeamLogo(captain.team_id)} 
                      alt="Captain" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs font-bold border-2 border-white">C</div>
                </div>
                <p className="text-sm font-semibold text-center">{captain.name}</p>
                <p className="text-xs text-gray-500">{captain.team_short_name} • {captain.role}</p>
              </div>
            )}

            <div className="text-2xl text-gray-300">|</div>

            {viceCaptain && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className={`${getTeamColor(viceCaptain.team_id)} w-20 h-20 rounded-full flex items-center justify-center shadow-md overflow-hidden border-4 border-white`}>
                    <img 
                      src={getTeamLogo(viceCaptain.team_id)} 
                      alt="Vice-Captain" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs font-bold border-2 border-white">VC</div>
                </div>
                <p className="text-sm font-semibold text-center">{viceCaptain.name}</p>
                <p className="text-xs text-gray-500">{viceCaptain.team_short_name} • {viceCaptain.role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Role Summary */}
        <div className="px-4 py-4 bg-white border-b">
          <p className="text-xs font-semibold text-gray-600 mb-3">TEAM COMPOSITION</p>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">WK</p>
              <p className="font-bold text-lg text-blue-600">{counts.WK}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">BAT</p>
              <p className="font-bold text-lg text-blue-600">{counts.BAT}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">AR</p>
              <p className="font-bold text-lg text-blue-600">{counts.AR}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">BOWL</p>
              <p className="font-bold text-lg text-blue-600">{counts.BOWL}</p>
            </div>
          </div>
        </div>

        {/* Players by Role */}
        <div className="px-4 py-4 space-y-4">
          {['WK', 'BAT', 'AR', 'BOWL'].map(role => {
            const players = getPlayersByRole(role);
            const roleLabel = role === 'WK' ? 'Wicket Keeper' : 
                            role === 'BAT' ? 'Batsman' : 
                            role === 'AR' ? 'All-Rounder' : 'Bowler';
            
            return players.length > 0 ? (
              <div key={role}>
                <h3 className="font-semibold text-sm text-gray-700 mb-3">{roleLabel} ({players.length})</h3>
                <div className="space-y-2">
                  {players.map(player => (
                    <div key={player.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className={`${getTeamColor(player.team_id)} w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-white flex-shrink-0`}>
                        <img 
                          src={getTeamLogo(player.team_id)} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.team_short_name}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {player.id === team.captain && (
                          <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">C</span>
                        )}
                        {player.id === team.viceCaptain && (
                          <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">VC</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-4 border-t bg-gray-50 sticky bottom-0 flex gap-3">
          <button className="text-gray-400 hover:text-gray-600"><Share2 className="w-5 h-5" /></button>
          <button
            onClick={onEdit}
            className="flex-1 border-2 border-pink-500 text-pink-500 py-2 rounded-lg font-semibold hover:bg-pink-50"
          >
            Edit Team
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPreview;