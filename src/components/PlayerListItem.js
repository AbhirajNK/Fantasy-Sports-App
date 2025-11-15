const PlayerListItem = ({ player, isSelected, onToggle }) => {
  const getTeamColor = (teamId) => {
    return teamId === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  };

  const getTeamLogo = (teamId) => {
    return teamId === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  };

  const bgColor = getTeamColor(player.team_id);
  const logo = getTeamLogo(player.team_id);
  
  return (
    <div
      onClick={onToggle}
      className={`bg-white rounded-lg p-3 flex items-center justify-between cursor-pointer border ${
        isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        {/* Clean P1/P2 Avatar */}
        <div className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden border-3 border-white flex-shrink-0`}>
          <img 
            src={logo} 
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <p className="font-semibold text-sm">{player.name}</p>
          <p className="text-xs text-gray-500">{player.team_short_name} • {player.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center w-12">
          <p className="font-bold text-sm">{player.event_total_points}</p>
        </div>
        <div className="text-center w-12">
          <p className="font-bold text-sm">{player.event_player_credit}</p>
        </div>
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
          isSelected ? 'bg-pink-500 border-pink-500' : 'border-gray-300'
        }`}>
          {isSelected && <span className="text-white text-sm font-bold">✓</span>}
        </div>
      </div>
    </div>
  );
};

export default PlayerListItem;