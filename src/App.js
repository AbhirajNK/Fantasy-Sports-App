import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MatchesPage from './components/MatchesPage';
import MyTeamsPage from './components/MyTeamsPage';
import PickPlayersPage from './components/PickPlayersPage';
import SelectCaptainPage from './components/SelectCaptainPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('matches');
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [teams, setTeams] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10800);
  const [userBalance, setUserBalance] = useState(12120.99);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          console.log('Time finished! Restarting countdown...');
          return 10800;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  useEffect(() => {
    fetchMatches();
    loadTeamsFromStorage();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json');
      const data = await response.json();
      setMatches(data.matches.cricket || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamsFromStorage = () => {
    const savedTeams = localStorage.getItem('fantasyTeams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  };

  const saveTeamsToStorage = (updatedTeams) => {
    localStorage.setItem('fantasyTeams', JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
  };

  const goToMyTeams = (match) => {
    setSelectedMatch(match);
    setCurrentPage('myteams');
  };

  const goToPickPlayers = (match, teamId = null) => {
    setSelectedMatch(match);
    setCurrentTeamId(teamId);
    if (teamId && teams[match.id]) {
      const team = teams[match.id].find(t => t.id === teamId);
      if (team) {
        setSelectedPlayers(team.players);
      }
    } else {
      setSelectedPlayers([]);
    }
    fetchPlayers();
    setCurrentPage('pickplayers');
  };

  const goToSelectCaptain = () => {
    setCurrentPage('selectcaptain');
  };

  const saveTeam = (captain, viceCaptain) => {
    const matchId = selectedMatch.id;
    const teamId = currentTeamId || `team_${Date.now()}`;
    const newTeam = {
      id: teamId,
      players: selectedPlayers,
      captain: captain,
      viceCaptain: viceCaptain,
      createdAt: new Date().toISOString(),
      isRegistered: false
    };
    const updatedTeams = { ...teams };
    if (!updatedTeams[matchId]) {
      updatedTeams[matchId] = [];
    }
    const existingTeamIndex = updatedTeams[matchId].findIndex(t => t.id === teamId);
    if (existingTeamIndex !== -1) {
      updatedTeams[matchId][existingTeamIndex] = newTeam;
    } else {
      updatedTeams[matchId].push(newTeam);
    }
    saveTeamsToStorage(updatedTeams);
    setSelectedPlayers([]);
    setCurrentTeamId(null);
    setCurrentPage('myteams');
  };

  const registerTeam = (matchId, teamId) => {
    const updatedTeams = { ...teams };
    const teamIndex = updatedTeams[matchId].findIndex(t => t.id === teamId);
    if (teamIndex !== -1) {
      updatedTeams[matchId][teamIndex].isRegistered = true;
    }
    saveTeamsToStorage(updatedTeams);
  };

  const deleteTeam = (matchId, teamId) => {
    const updatedTeams = { ...teams };
    updatedTeams[matchId] = updatedTeams[matchId].filter(t => t.id !== teamId);
    if (updatedTeams[matchId].length === 0) {
      delete updatedTeams[matchId];
    }
    saveTeamsToStorage(updatedTeams);
  };

  const updateBalance = (newBalance) => {
    setUserBalance(newBalance);
    localStorage.setItem('userBalance', newBalance.toString());
  };

  const renderPage = () => {
    if (loading && currentPage === 'matches') {
      return <LoadingScreen />;
    }
    switch (currentPage) {
      case 'matches':
        return <MatchesPage matches={matches} onSelectMatch={goToMyTeams} registeredTeams={teams} userBalance={userBalance} />;
      case 'myteams':
        return (
          <MyTeamsPage
            match={selectedMatch}
            teams={teams[selectedMatch?.id] || []}
            onBack={() => setCurrentPage('matches')}
            onCreateTeam={() => goToPickPlayers(selectedMatch)}
            onEditTeam={(teamId) => goToPickPlayers(selectedMatch, teamId)}
            onDeleteTeam={deleteTeam}
            onRegisterTeam={registerTeam}
            userBalance={userBalance}
            onUpdateBalance={updateBalance}
            timeLeft={formatTime(timeLeft)}
          />
        );
      case 'pickplayers':
        return (
          <PickPlayersPage
            match={selectedMatch}
            players={players}
            selectedPlayers={selectedPlayers}
            onUpdatePlayers={setSelectedPlayers}
            onBack={() => setCurrentPage('myteams')}
            onContinue={goToSelectCaptain}
            loading={loading}
            timeLeft={formatTime(timeLeft)}
          />
        );
      case 'selectcaptain':
        return (
          <SelectCaptainPage
            match={selectedMatch}
            players={selectedPlayers}
            onBack={() => setCurrentPage('pickplayers')}
            onSave={saveTeam}
            timeLeft={formatTime(timeLeft)}
          />
        );
      default:
        return <MatchesPage matches={matches} onSelectMatch={goToMyTeams} registeredTeams={teams} userBalance={userBalance} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
};

export default App;