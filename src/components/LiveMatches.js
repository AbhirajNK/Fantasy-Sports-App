const LiveMatches = () => {
  // Sample live matches data 
  const liveMatches = [
    {
      id: 1,
      t1_name: 'CSK',
      t2_name: 'MI',
      t1_image: '/logos/teams/csk.jpeg',
      t2_image: '/logos/teams/mi.jpeg',
      status: 'LIVE',
      runs: '145/3'
    },
    {
      id: 2,
      t1_name: 'RCB',
      t2_name: 'KKR',
      t1_image: '/logos/teams/rcb.jpeg',
      t2_image: '/logos/teams/kkr.jpeg',
      status: 'LIVE',
      runs: '128/5'
    },
    {
      id: 3,
      t1_name: 'CSK',
      t2_name: 'RCB',
      t1_image: '/logos/teams/csk.jpeg',
      t2_image: '/logos/teams/RCB.jpeg',
      status: 'LIVE',
      runs: '167/2'
    }
  ];

  return (
    <div className="px-4 py-4 space-y-3">
      {liveMatches.map((match) => (
        <div
          key={match.id}
          className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow border border-pink-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-red-500 uppercase">Live</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">{match.runs}</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Team 1 */}
            <div className="flex items-center gap-2">
              <img
                src={match.t1_image}
                alt={match.t1_name}
                className="w-12 h-12 object-contain"
              />
              <span className="font-bold text-gray-800 text-sm">{match.t1_name}</span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-400 font-bold text-xs">vs</span>
              <div className="text-center">
                <p className="text-xs text-gray-500">Inning 1</p>
              </div>
            </div>

            {/* Team 2 */}
            <div className="flex items-center gap-2 flex-row-reverse">
              <img
                src={match.t2_image}
                alt={match.t2_name}
                className="w-12 h-12 object-contain"
              />
              <span className="font-bold text-gray-800 text-sm">{match.t2_name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveMatches;