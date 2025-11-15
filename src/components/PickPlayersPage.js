import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import PlayerListItem from './PlayerListItem';

const PickPlayersPage = ({
  match,
  players,
  selectedPlayers,
  onUpdatePlayers,
  onBack,
  onContinue,
  loading,
}) => {
  const [filter, setFilter] = useState('ALL');

  const totalCredits = selectedPlayers.reduce(
    (sum, p) => sum + p.event_player_credit,
    0
  );
  const creditsLeft = 100 - totalCredits;
  const selectedCount = selectedPlayers.length;

  const getRoleCounts = () => {
    const counts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
    selectedPlayers.forEach((player) => {
      const role = player.role.includes('Keeper')
        ? 'WK'
        : player.role.includes('Batsman')
        ? 'BAT'
        : player.role.includes('All-Rounder')
        ? 'AR'
        : 'BOWL';
      counts[role]++;
    });
    return counts;
  };

  const roleCounts = getRoleCounts();

  const getTeamDistribution = () => {
    const distribution = {};
    selectedPlayers.forEach((player) => {
      distribution[player.team_id] = (distribution[player.team_id] || 0) + 1;
    });
    return distribution;
  };

  const togglePlayer = (player) => {
    const isSelected = selectedPlayers.some((p) => p.id === player.id);

    if (isSelected) {
      onUpdatePlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      if (selectedPlayers.length >= 11) {
        alert('You can only select 11 players!');
        return;
      }

      if (totalCredits + player.event_player_credit > 100) {
        alert('Not enough credits!');
        return;
      }

      const distribution = getTeamDistribution();
      const playerTeamCount = distribution[player.team_id] || 0;
      if (playerTeamCount >= 7) {
        alert('Maximum 7 players from one team!');
        return;
      }

      const role = player.role.includes('Keeper')
        ? 'WK'
        : player.role.includes('Batsman')
        ? 'BAT'
        : player.role.includes('All-Rounder')
        ? 'AR'
        : 'BOWL';

      const limits = { WK: 5, BAT: 7, AR: 4, BOWL: 7 };
      if (roleCounts[role] >= limits[role]) {
        alert(`Maximum ${limits[role]} ${role} allowed!`);
        return;
      }

      onUpdatePlayers([...selectedPlayers, player]);
    }
  };

  const filteredPlayers = players.filter((player) => {
    if (filter === 'ALL') return true;
    if (filter === 'WK') return player.role.includes('Keeper');
    if (filter === 'BAT') return player.role.includes('Batsman');
    if (filter === 'AR') return player.role.includes('All-Rounder');
    if (filter === 'BOWL') return player.role.includes('Bowler');
    return true;
  });

  const canContinue = selectedCount === 11;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-semibold">Select Players</span>
        </div>

        {/* Team Info */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <img
              src={match?.t1_image}
              alt=""
              className="w-8 h-8 object-contain"
            />
            <img
              src={match?.t2_image}
              alt=""
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="text-sm">
            <span>Max 7 players from a team</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-3 text-sm">
          <div>
            <p className="opacity-70">Players</p>
            <p className="font-bold text-lg">{selectedCount}/11</p>
          </div>
          <div>
            <p className="opacity-70">Credits Left</p>
            <p className="font-bold text-lg">{creditsLeft.toFixed(1)}</p>
          </div>
        </div>

        {/* Progress Circles */}
        <div className="flex gap-1 mt-3 justify-center">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < selectedCount ? 'bg-pink-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Role Tabs */}
      <div className="bg-white border-b sticky top-36 z-10">
        <div className="flex gap-4 px-4 py-3 overflow-x-auto">
          {['ALL', 'WK', 'BAT', 'AR', 'BOWL'].map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                filter === role
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {role === 'ALL' ? 'All Players' : `${role} (${roleCounts[role]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Players List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-500"></div>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-2">
          {filteredPlayers.map((player) => (
            <PlayerListItem
              key={player.id}
              player={player}
              isSelected={selectedPlayers.some((p) => p.id === player.id)}
              onToggle={() => togglePlayer(player)}
            />
          ))}
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
        <button className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-lg font-semibold">
          Team Preview
        </button>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`flex-1 py-3 rounded-lg font-semibold ${
            canContinue
              ? 'bg-pink-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PickPlayersPage;