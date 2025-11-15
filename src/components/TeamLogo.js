const TeamLogo = ({ teamId, size = 'md' }) => {
  const logo = teamId === 477 ? 'logos/players/P1.png' : 'logos/players/P2.png';
  const bgColor = teamId === 477 ? 'bg-yellow-400' : 'bg-blue-600';
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white`}>
      <img 
        src={logo} 
        alt="Player" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default TeamLogo;