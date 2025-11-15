const CaptainSelectionItem = ({ player, isCaptain, isViceCaptain, onSelectCaptain, onSelectViceCaptain }) => {
  const getTeamColor = (teamId) => {
    return teamId === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  };

  const getTeamLogo = (teamId) => {
    return teamId === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  };

  const bgColor = getTeamColor(player.team_id);
  const logo = getTeamLogo(player.team_id);
  
  return (
    <div className="bg-white rounded-lg p-3 flex items-center justify-between border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
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
      <div className="flex items-center gap-3">
        <button
          onClick={onSelectCaptain}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
            isCaptain
              ? 'bg-pink-500 border-pink-500 text-white scale-110 shadow-lg'
              : 'border-gray-300 text-gray-400 hover:border-pink-300 hover:scale-105'
          }`}
        >
          C
        </button>
        <button
          onClick={onSelectViceCaptain}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
            isViceCaptain
              ? 'bg-pink-500 border-pink-500 text-white scale-110 shadow-lg'
              : 'border-gray-300 text-gray-400 hover:border-pink-300 hover:scale-105'
          }`}
        >
          VC
        </button>
      </div>
    </div>
  );
};

export default CaptainSelectionItem;