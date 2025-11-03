import './GameMenu.css';

export default function GameMenu({ players, onSelectGame }) {
  const games = [
    { id: 'questions', name: 'Questions', icon: '⁉', desc: 'Réponds vite ou bois !' },
    { id: 'pmu', name: 'PMU', icon: '🏇', desc: 'Parie et bois !' },
    { id: 'palmier', name: 'Palmier', icon: '🌴', desc: 'Enchaîne ou trinque !' },
    { id: 'puissance_4', name: 'Puissance 4', icon: '🔴🟡', desc: 'Aligne ou descends !' },
    { id: 'action_verite', name: 'Action ou Vérité', icon: '💪', desc: 'Défis débiles à faire' },
    { id: 'deja_jamais', name: 'J\'ai déjà j\'ai jamais', icon: '🎯', desc: 'Avoue ou bois !' },
    { id: 'quipourrait', name: 'Qui pourrait', icon: '👈', desc: 'Désigne le coupable' },
    { id: 'tupreferes', name: 'Tu préfères', icon: '🌟', desc: 'Choisis ton camp' },
    { id: 'pong', name: 'BièrePong', icon: '🍺', desc: 'Vise juste !' },
    { id: 'chess', name: 'Chess', icon: '♟', desc: 'Échec et shot' },
    { id: 'poule', name: 'Poule??', icon: '🐔', desc: 'Mystère...' },
    { id: 'choose', name: 'Pose ton doigt', icon: '☝', desc: 'Pose le doigt puis bois !' },
  ];

  return (
    <div className="game-menu">
      <div className="game-menu__container">
        {/* Header */}
        <div className="game-menu__header">
          <h2 className="game-menu__title">
            CHOISIS TON JEU
          </h2>
          <div className="game-menu__players-badge">
            <span className="game-menu__players-text">
              {players.length} JOUEUR{players.length > 1 ? 'S' : ''} 🍺
            </span>
          </div>
        </div>

        {/* Grille des jeux */}
        <div className="game-menu__games-grid">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="game-menu__game-card"
            >
              <div className="game-menu__game-header">
                <div className="game-menu__game-icon">{game.icon}</div>
                <div className="game-menu__game-title-wrapper">
                  <h3 className="game-menu__game-title">
                    {game.name}
                  </h3>
                </div>
                <div className="game-menu__game-arrow">→</div>
              </div>
              <p className="game-menu__game-desc">
                {game.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Bouton retour */}
        <button
          onClick={() => window.location.reload()}
          className="game-menu__back-button"
        >
          ← CHANGER LES JOUEURS
        </button>
      </div>
    </div>
  );
}
