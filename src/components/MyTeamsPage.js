import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import TeamCard from './TeamCard';
import TeamPreview from './TeamPreview';

const MyTeamsPage = ({ match, teams, onBack, onCreateTeam, onEditTeam, onDeleteTeam, onRegisterTeam, userBalance, onUpdateBalance, timeLeft }) => {
  const [previewTeam, setPreviewTeam] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState(new Set());

  const handleTeamCheckbox = (teamId) => {
    const newSelected = new Set(selectedTeams);
    if (newSelected.has(teamId)) {
      newSelected.delete(teamId);
    } else {
      newSelected.add(teamId);
    }
    setSelectedTeams(newSelected);
  };

  const handleRegisterSelected = () => {
    if (selectedTeams.size === 0) return;
    setShowRegisterModal(true);
  };

  const confirmRegisterSelected = () => {
    const totalDeduction = selectedTeams.size * 25;
    const newBalance = userBalance - totalDeduction;

    selectedTeams.forEach(teamId => {
      onRegisterTeam(match.id, teamId);
    });

    onUpdateBalance(newBalance);

    setSelectedTeams(new Set());
    setShowRegisterModal(null);
  };

  const selectedCount = selectedTeams.size;
  const totalCost = selectedCount * 25;
  const canRegister = selectedCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-semibold">Contest</span>
        </div>
        <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
          <span className="font-bold">{match?.match_name}</span>
          <span className="text-sm font-semibold">{timeLeft}</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="px-4 py-3 bg-white border-b">
        <p className="text-sm text-gray-600">Select a team to register</p>
      </div>

      {/* Team Cards */}
      <div className="px-4 py-4 space-y-4">
        {teams.map((team, index) => (
          <TeamCard
            key={team.id}
            team={team}
            index={index}
            matchId={match.id}
            onEdit={() => onEditTeam(team.id)}
            onDelete={() => onDeleteTeam(match.id, team.id)}
            onPreview={() => setPreviewTeam(team)}
            onRegister={() => {}}
            isRegistered={team.isRegistered}
            isSelected={selectedTeams.has(team.id)}
            onSelectChange={() => handleTeamCheckbox(team.id)}
          />
        ))}

        {teams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No teams created yet</p>
            <button
              onClick={onCreateTeam}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Create Your First Team
            </button>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      {teams.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
          <button
            onClick={onCreateTeam}
            className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-lg font-semibold hover:bg-pink-50"
          >
            Create Team
          </button>
          <button
            onClick={handleRegisterSelected}
            disabled={!canRegister}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              canRegister
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Register Team{selectedCount > 0 && `(${selectedCount})`} with ₹{totalCost}/-
          </button>
        </div>
      )}

      {/* Team Preview Modal */}
      {previewTeam && (
        <TeamPreview
          team={previewTeam}
          match={match}
          onClose={() => setPreviewTeam(null)}
          onEdit={() => {
            setPreviewTeam(null);
            onEditTeam(previewTeam.id);
          }}
          teamIndex={teams.findIndex(t => t.id === previewTeam.id)}
        />
      )}

      {/* Register Confirmation Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Confirm Registration</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to register {selectedCount} team{selectedCount > 1 ? 's' : ''}?
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Cost: ₹{totalCost}/- ({selectedCount} × ₹25/-)
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Current Balance: ₹{userBalance.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              After Registration: ₹{(userBalance - totalCost).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Registration closes in: <span className="font-bold text-pink-500">{timeLeft}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRegisterModal(null)}
                className="flex-1 border-2 border-gray-300 text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRegisterSelected}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeamsPage;