import  { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import CaptainSelectionItem from './CaptainSelectionItem';

const SelectCaptainPage = ({ match, players, onBack, onSave, timeLeft }) => {
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  const handleSave = () => {
    if (!captain || !viceCaptain) {
      alert('Please select both Captain and Vice-Captain!');
      return;
    }
    if (captain === viceCaptain) {
      alert('Captain and Vice-Captain must be different players!');
      return;
    }
    onSave(captain, viceCaptain);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack}><ChevronLeft className="w-6 h-6" /></button>
          <span className="font-semibold">Select Captain and Vice Captain</span>
        </div>

        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <img src={match?.t1_image} alt="" className="w-10 h-10 object-contain bg-white rounded-full p-1" />
            <img src={match?.t2_image} alt="" className="w-10 h-10 object-contain bg-white rounded-full p-1" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-blue-50 border-b">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Captain</span> gets 2x points • <span className="font-semibold">Vice Captain</span> gets 1.5x points
        </p>
      </div>

      {/* Selection Summary */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Captain</p>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg ${
              captain ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200 bg-gray-50 text-gray-400'
            }`}>
              C
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Vice Captain</p>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg ${
              viceCaptain ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200 bg-gray-50 text-gray-400'
            }`}>
              VC
            </div>
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="px-4 py-4 space-y-2">
        {players.map(player => (
          <CaptainSelectionItem
            key={player.id}
            player={player}
            isCaptain={captain === player.id}
            isViceCaptain={viceCaptain === player.id}
            onSelectCaptain={() => setCaptain(player.id)}
            onSelectViceCaptain={() => setViceCaptain(player.id)}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="flex gap-3 mb-2">
          <button className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
            Team Preview
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              captain && viceCaptain
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Team
          </button>
        </div>
        <p className="text-center text-xs text-gray-500">Registration closed in: {timeLeft}</p>
      </div>
    </div>
  );
};

export default SelectCaptainPage;
