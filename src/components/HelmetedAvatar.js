const HelmetedAvatar = ({ player, badge }) => {
  if (!player) return null;
  
  const bgColor = player.team_id === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  const logo = player.team_id === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  
  return (
    <div className="relative">
      <div className={`${bgColor} w-14 h-14 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white`}>
        <img 
          src={logo} 
          alt="Player" 
          className="w-full h-full object-cover"
        />
      </div>
      {badge && (
        <div className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
          {badge}
        </div>
      )}
      <p className="text-xs text-center mt-1 font-medium">{player.short_name?.split(' ')[0] || player.name?.split(' ')[0]}</p>
    </div>
  );
};

export default HelmetedAvatar;