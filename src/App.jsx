import { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import GameMenu from './components/GameMenu';
import Questions from './components/games/Questions';
import TuPreferes from './components/games/TuPreferes';
import PMU from './components/games/PMU';

function App() {
  const [screen, setScreen] = useState('setup'); // 'setup', 'menu', ou un ID de jeu
  const [players, setPlayers] = useState([]);

  // Page setup des joueurs
  if (screen === 'setup') {
    return (
      <PlayerSetup
        onStart={(playerList) => {
          setPlayers(playerList);
          setScreen('menu');
        }}
      />
    );
  }

  // Menu des jeux
  if (screen === 'menu') {
    return (
      <GameMenu
        players={players}
        onSelectGame={(gameId) => {
          setScreen(gameId);
        }}
      />
    );
  }

  // Jeu Questions
  if (screen === 'questions') {
    return (
      <Questions
        players={players}
        onBack={() => setScreen('menu')}
      />
    );
  }

  // Jeu Tu Préfères
  if (screen === 'tupreferes') {
    return (
      <TuPreferes
        players={players}
        onBack={() => setScreen('menu')}
      />
    );
  }

  // Jeu PMU
  if (screen === 'pmu') {
    return (
      <PMU
        players={players}
        onBack={() => setScreen('menu')}
      />
    );
  }

  // Placeholder pour les autres jeux (à remplacer au fur et à mesure)
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: '#6A8B61' }}
    >
      <div className="text-center">
        <h2 
          className="text-3xl font-black mb-4"
          style={{ color: '#F3EBD7' }}
        >
          Jeu "{screen}" en construction... 🚧
        </h2>
        <button
          onClick={() => setScreen('menu')}
          className="px-8 py-4 rounded-full text-xl font-black border-4"
          style={{ 
            backgroundColor: '#B25E3B',
            color: '#F3EBD7',
            borderColor: '#2B1C12'
          }}
        >
          ← RETOUR AU MENU
        </button>
      </div>
    </div>
  );
}

export default App;