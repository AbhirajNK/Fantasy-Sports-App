const MatchCard = ({ match, index, onClick }) => {
  const bgColors = ['bg-blue-50', 'bg-pink-50', 'bg-orange-50'];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div onClick={onClick} className={`${bgColor} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100`}>
      <p className="text-xs text-gray-500 mb-2 font-semibold">{match.event_name}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <img src={match.t1_image} alt={match.t1_short_name} className="w-16 h-16 object-contain" />
          <span className="font-bold text-gray-800 text-lg">{match.t1_short_name}</span>
        </div>
        <span className="text-gray-400 font-bold text-sm mx-2">vs</span>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="font-bold text-gray-800 text-lg">{match.t2_short_name}</span>
          <img src={match.t2_image} alt={match.t2_short_name} className="w-16 h-16 object-contain" />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        {new Date(match.match_date).toLocaleString('en-IN', { 
          day: 'numeric', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </p>
    </div>
  );
};

export default MatchCard;