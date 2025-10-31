import { useState, useEffect } from 'react';
import './PlayerSetup.css';

export default function PlayerSetup({ onStart }) {
  const [players, setPlayers] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Charger les joueurs sauvegardés au démarrage
  useEffect(() => {
    const savedPlayers = localStorage.getItem('foie-filtre-players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  // Sauvegarder les joueurs à chaque modification
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('foie-filtre-players', JSON.stringify(players));
    }
  }, [players]);

  const addPlayer = () => {
    const trimmedName = currentName.trim();
    
    // Vérifications
    if (!trimmedName) {
      setErrorMessage('Entre un blaze d\'abord ! 🙄');
      return;
    }

    // Vérifier si le nom existe déjà (insensible à la casse)
    const nameExists = players.some(
      player => player.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameExists) {
      setErrorMessage('Ce blaze est déjà pris ! ❌');
      setCurrentName('');
      return;
    }

    // Ajouter le joueur
    setPlayers([...players, trimmedName]);
    setCurrentName('');
    setErrorMessage('');
  };

  const removePlayer = (index) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    
    // Si plus de joueurs, effacer la sauvegarde
    if (newPlayers.length === 0) {
      localStorage.removeItem('foie-filtre-players');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="player-setup">
      {/* Logo */}
      <div className="player-setup__logo-container">
        <h1 className="player-setup__main-title">3 FOIE FILTRÉS</h1>
        <img
          src="/logo.png"
          alt="3 Foie Filtrés"
          className="player-setup__logo"
        />
      </div>

      {/* Section principale */}
      <div className="player-setup__content">
        <h2 className="player-setup__title">
          QUI JOUE CE SOIR ? 🎉
        </h2>

        {/* Input + bouton */}
        <div className="player-setup__input-group">
          <input
            type="text"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
              setErrorMessage(''); 
            }}
            onKeyPress={handleKeyPress}
            placeholder="Lâche un blaze..."
            className="player-setup__input"
          />
          <button
            onClick={addPlayer}
            className="player-setup__add-button"
          >
            ✓
          </button>
        </div>

        {/* Message d'erreur */}
        {errorMessage && (
          <p className="player-setup__error-message">
            {errorMessage}
          </p>
        )}

        {/* Liste des joueurs */}
        {players.length > 0 && (
          <div className="player-setup__players-section">
            <h3 className="player-setup__players-title">
              JOUEURS ({players.length}) :
            </h3>
            <div className="player-setup__players-list">
              {players.map((player, index) => (
                <div key={index} className="player-setup__player-item">
                  <span className="player-setup__player-name">
                    {index + 1}. {player}
                  </span>
                  <button
                    onClick={() => removePlayer(index)}
                    className="player-setup__remove-button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton commencer */}
        {players.length > 1 && (
          <button
            onClick={() => onStart(players)}
            className="player-setup__start-button"
          >
            COMMENCER 🍻
          </button>
        )}

        {/* Message d'attente */}
        {players.length === 0 && (
          <p className="player-setup__waiting-message">
            Ajoute au moins 2 joueurs pour commencer !
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="player-setup__footer">
        <p className="player-setup__footer-text">
          Pensé et développé avec ❤️ par Ro et Jo !
        </p>
      </div>
    </div>
  );
}