import { useState } from 'react';
import MatchCard from './MatchCard';
import LiveMatches from './LiveMatches';

const MatchesPage = ({ matches, onSelectMatch, registeredTeams = {} }) => {
  const [activeSport, setActiveSport] = useState('cricket');
  const [activeTab, setActiveTab] = useState('matches');
  const [filterType, setFilterType] = useState('all'); 

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'bg-red-500' },
    { id: 'football', name: 'Football', icon: '⚽', color: 'bg-blue-900' },
    { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'bg-blue-900' },
    { id: 'rugby', name: 'Rugby', icon: '🏉', color: 'bg-blue-900' },
    { id: 'hockey', name: 'Hockey', icon: '🏑', color: 'bg-blue-900' }
  ];

  const filteredMatches = matches.filter(match => {
    if (filterType === 'joined') {
      return registeredTeams[match.id] && registeredTeams[match.id].some(team => team.isRegistered);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header with User Profile */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
              NK
            </div>
            <div>
              <p className="text-white text-sm font-medium">NK ABHIRAJ</p>
            </div>
          </div>
          {/* Balance */}
          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">₹</span>
            </div>
            <div>
              <p className="text-white text-xs opacity-70">BALANCE</p>
              <p className="text-white text-sm font-bold">₹12,120.99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Categories */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4 py-3">
        <div className="flex justify-between gap-2">
          {sports.map(sport => (
            <button
              key={sport.id}
              onClick={() => setActiveSport(sport.id)}
              className="flex flex-col items-center gap-1"
            >
              <div className={`w-12 h-12 rounded-full ${sport.id === activeSport ? sport.color : 'bg-blue-800'} flex items-center justify-center text-xl transition-all`}>
                {sport.icon}
              </div>
              <span className={`text-xs ${sport.id === activeSport ? 'text-white font-semibold' : 'text-white/70'}`}>
                {sport.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Advertisement Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4 pb-4">
        <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 rounded-xl p-4 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white text-xs font-bold mb-1">MAKE YOUR TEAM & PLAY</p>
            <p className="text-white text-2xl font-bold mb-1">WIN UPTO ₹1,00,000</p>
            <p className="text-white text-xs">Make your dream team now!</p>
          </div>
          {/* Player Images Placeholder */}
          <div className="absolute right-0 bottom-0 flex items-end">
            <div className="w-24 h-24 bg-blue-600/30 rounded-tl-full"></div>
            <div className="w-20 h-20 bg-green-600/30 rounded-tl-full"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-3 px-1 ${activeTab === 'matches' ? 'text-white border-b-2 border-pink-500 font-semibold' : 'text-white/60'}`}
          >
            Matches
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-3 px-1 ${activeTab === 'live' ? 'text-white border-b-2 border-pink-500 font-semibold' : 'text-white/60'}`}
          >
            Live
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 px-1 ${activeTab === 'completed' ? 'text-white border-b-2 border-pink-500 font-semibold' : 'text-white/60'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'matches' && (
        <>
          {/* Filter Buttons */}
          <div className="bg-white px-4 py-3 border-b">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-2 rounded-full text-sm font-semibold ${
                  filterType === 'all'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('joined')}
                className={`px-6 py-2 rounded-full text-sm font-semibold ${
                  filterType === 'joined'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Joined
              </button>
            </div>
          </div>

          {/* Match Cards */}
          <div className="px-4 py-4 space-y-3">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match, index) => (
                <MatchCard key={match.id} match={match} index={index} onClick={() => onSelectMatch(match)} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filterType === 'joined' ? 'No contests joined yet' : 'No matches available'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'live' && (
        <LiveMatches />
      )}

      {activeTab === 'completed' && (
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500">No completed matches</p>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;