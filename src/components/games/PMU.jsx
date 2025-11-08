import { useState } from 'react';
import './PMU.css';

export default function PMU({ players, onBack }) {
  const [gamePhase, setGamePhase] = useState('betting'); // 'betting', 'racing', 'results'
  const [bets, setBets] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedSuit, setSelectedSuit] = useState(null);
  
  // État de la course
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [horsePositions, setHorsePositions] = useState({
    '♣': 0,
    '♠': 0,
    '♦': 0,
    '♥': 0
  });
  const [finishedHorses, setFinishedHorses] = useState([]); // [{suit: '♣', position: 1}, ...]
  const [levelCards, setLevelCards] = useState([
    { revealed: false, card: null },
    { revealed: false, card: null },
    { revealed: false, card: null },
    { revealed: false, card: null },
    { revealed: false, card: null }
  ]);

  const suits = ['♣', '♠', '♦', '♥'];
  const suitNames = {
    '♣': 'Trèfle',
    '♠': 'Pique',
    '♦': 'Carreau',
    '♥': 'Cœur'
  };
  const suitColors = {
    '♣': '#2B1C12',
    '♠': '#2B1C12',
    '♦': '#B25E3B',
    '♥': '#B25E3B'
  };

  // Étape 1 : Choisir la couleur
  const selectSuit = (suit) => {
    setSelectedSuit(suit);
  };

  // Étape 2 : Choisir le nombre de gorgées
  const placeBet = (gorgées) => {
    const newBets = { ...bets };
    newBets[players[currentPlayerIndex]] = { suit: selectedSuit, gorgées };
    setBets(newBets);
    setSelectedSuit(null);

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      startRace();
    }
  };

  // Créer un deck et démarrer la course
  const startRace = () => {
    const newDeck = [];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R'];
    
    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({ suit, value });
      });
    });

    // Mélanger le deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    setDeck(newDeck);
    setGamePhase('racing');
  };

  // Tirer une carte
  const drawCard = () => {
    if (deck.length === 0) {
      setGamePhase('results');
      return;
    }

    const card = deck[0];
    const newDeck = deck.slice(1);
    setDeck(newDeck);
    setCurrentCard(card);
    setDrawnCards([card, ...drawnCards]);

    // Avancer le cheval de cette couleur
    const newPositions = { ...horsePositions };
    newPositions[card.suit] = newPositions[card.suit] + 1;

    // Vérifier si tous les chevaux ont dépassé ce niveau
    const minPosition = Math.min(...Object.values(newPositions));
    
    // Révéler les cartes de niveau que tous les chevaux ont dépassées
    const newLevelCards = [...levelCards];
    for (let i = 0; i < 5; i++) {
      if (minPosition > i && !newLevelCards[i].revealed) {
        // Tirer une carte pour ce niveau
        if (newDeck.length > 0) {
          const levelCard = newDeck[0];
          newDeck.splice(0, 1);
          newLevelCards[i] = { revealed: true, card: levelCard };
          
          // Le cheval de cette couleur recule
          newPositions[levelCard.suit] = Math.max(0, newPositions[levelCard.suit] - 1);
        }
      }
    }

    setHorsePositions(newPositions);
    setLevelCards(newLevelCards);
    setDeck(newDeck);
  };

  const getWinners = () => {
    const maxPosition = Math.max(...Object.values(horsePositions));
    const winningSuits = Object.entries(horsePositions)
      .filter(([_, pos]) => pos === maxPosition)
      .map(([suit, _]) => suit);

    return players.filter(player => {
      const bet = bets[player];
      return winningSuits.includes(bet.suit);
    });
  };

  const resetGame = () => {
    setGamePhase('betting');
    setBets({});
    setCurrentPlayerIndex(0);
    setSelectedSuit(null);
    setDeck([]);
    setCurrentCard(null);
    setDrawnCards([]);
    setHorsePositions({ '♣': 0, '♠': 0, '♦': 0, '♥': 0 });
    setLevelCards([
      { revealed: false, card: null },
      { revealed: false, card: null },
      { revealed: false, card: null },
      { revealed: false, card: null },
      { revealed: false, card: null }
    ]);
  };

  // ÉCRAN 1 : PARIS
  if (gamePhase === 'betting') {
    const currentPlayer = players[currentPlayerIndex];

    return (
      <div className="global-container-page">
        <div className="global-game-header">
          <h1 className="global-game-title">PMU 🏇</h1>
        </div>

        <div className="global-game-content">
          <div className="global-card pmu__betting-card">
            <div className="pmu__player-turn">
              <div className="global-badge-player">
                <span className="global-badge-player-name">{currentPlayer}</span>
              </div>
              <p className="pmu__turn-info">
                Joueur {currentPlayerIndex + 1} / {players.length}
              </p>
            </div>

            {!selectedSuit ? (
              <>
                <h2 className="pmu__step-title">Choisis ton cheval 🎯</h2>
                <div className="pmu__suits-grid">
                  {suits.map(suit => (
                    <button
                      key={suit}
                      onClick={() => selectSuit(suit)}
                      className="pmu__suit-button"
                      style={{ borderColor: suitColors[suit] }}
                    >
                      <div 
                        className="pmu__suit-icon"
                        style={{ color: suitColors[suit] }}
                      >
                        {suit}
                      </div>
                      <div className="pmu__suit-name">{suitNames[suit]}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="pmu__selected-suit">
                  <div 
                    className="pmu__selected-icon"
                    style={{ color: suitColors[selectedSuit] }}
                  >
                    {selectedSuit}
                  </div>
                  <div className="pmu__selected-name">{suitNames[selectedSuit]}</div>
                </div>

                <h2 className="pmu__step-title">Combien de gorgées tu mises ? 🍺</h2>
                <div className="pmu__gorgées-grid">
                  {[1, 2, 3, 4, 5].map(gorgées => (
                    <button
                      key={gorgées}
                      onClick={() => placeBet(gorgées)}
                      className="pmu__gorgées-button"
                    >
                      {gorgées} 🍺
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedSuit(null)}
                  className="pmu__back-selection"
                >
                  ← Changer de cheval
                </button>
              </>
            )}

            {/* Récap des paris */}
            {Object.keys(bets).length > 0 && (
              <div className="pmu__bets-summary">
                <h3>Paris :</h3>
                {Object.entries(bets).map(([player, bet]) => (
                  <p key={player}>
                    <span style={{ color: suitColors[bet.suit] }}>{bet.suit}</span> {player} ({bet.gorgées} 🍺)
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="global-game-footer">
          <button onClick={onBack} className="global-game-back-button">
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  // ÉCRAN 2 : COURSE
  if (gamePhase === 'racing') {
    return (
      <div className="global-container-page">
        <div className="global-game-header">
          <h1 className="global-game-title">PMU 🏇</h1>
        </div>

        <div className="pmu__racing-content">
          {/* Carte piochée */}
          <div className="pmu__drawn-card-container">
            {currentCard ? (
              <div 
                className="pmu__drawn-card pmu__drawn-card--show"
                style={{ borderColor: suitColors[currentCard.suit] }}
              >
                <div className="pmu__card-value">{currentCard.value}</div>
                <div 
                  className="pmu__card-suit"
                  style={{ color: suitColors[currentCard.suit] }}
                >
                  {currentCard.suit}
                </div>
              </div>
            ) : (
              <div className="pmu__drawn-card pmu__drawn-card--back">
                🎴
              </div>
            )}
          </div>

          {/* Piste de course */}
          <div className="pmu__track-container">
            {/* Ligne d'arrivée */}
            <div className="pmu__finish-line">🏁 ARRIVÉE</div>

            {/* Niveaux */}
            <div className="pmu__levels">
              {[4, 3, 2, 1, 0].map(level => (
                <div key={level} className="pmu__level-row">
                  <div className="pmu__level-number">{level + 1}</div>
                  <div className="pmu__level-card-slot">
                    {levelCards[level].revealed ? (
                      <div 
                        className="pmu__level-card"
                        style={{ borderColor: suitColors[levelCards[level].card.suit] }}
                      >
                        <span style={{ color: suitColors[levelCards[level].card.suit] }}>
                          {levelCards[level].card.suit}
                        </span>
                        {levelCards[level].card.value}
                      </div>
                    ) : (
                      <div className="pmu__level-card pmu__level-card--hidden">
                        ?
                      </div>
                    )}
                  </div>
                  
                  {/* Chevaux à ce niveau */}
                  <div className="pmu__horses-at-level">
                    {suits.map(suit => (
                      horsePositions[suit] === level && (
                        <div 
                          key={suit}
                          className="pmu__horse-token"
                          style={{ color: suitColors[suit] }}
                        >
                          A{suit}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Ligne de départ */}
            <div className="pmu__start-line">DÉPART</div>
          </div>

          {/* Contrôles */}
          <div className="pmu__controls">
            <div className="pmu__deck-info">
              Cartes restantes : {deck.length}
            </div>
            
            <button 
              onClick={drawCard}
              className="global-button-primary"
            >
              TIRER UNE CARTE 🎴
            </button>
          </div>
        </div>

        <div className="global-game-footer">
          <button onClick={resetGame} className="global-game-back-button">
            ← Recommencer
          </button>
        </div>
      </div>
    );
  }

  // ÉCRAN 3 : RÉSULTATS
  if (gamePhase === 'results') {
    const winners = getWinners();
    
    return (
      <div className="global-container-page">
        <div className="global-game-header">
          <h1 className="global-game-title">RÉSULTATS 🏆</h1>
        </div>

        <div className="global-game-content">
          <div className="pmu__results-container">
            <h2 className="pmu__results-title">Positions finales</h2>
            
            {/* Classement */}
            <div className="pmu__ranking">
              {Object.entries(horsePositions)
                .sort(([, a], [, b]) => b - a)
                .map(([suit, position], index) => (
                  <div key={suit} className="pmu__rank-item">
                    <div className="pmu__rank-position">#{index + 1}</div>
                    <div 
                      className="pmu__rank-suit"
                      style={{ color: suitColors[suit] }}
                    >
                      {suit} {suitNames[suit]}
                    </div>
                    <div className="pmu__rank-score">Niveau {position}</div>
                  </div>
                ))}
            </div>

            {winners.length > 0 ? (
              <>
                <h2 className="pmu__winners-title">🎉 GAGNANTS 🎉</h2>
                {winners.map(winner => {
                  const bet = bets[winner];
                  return (
                    <div key={winner} className="pmu__winner-card">
                      <div className="pmu__winner-name">{winner}</div>
                      <div className="pmu__winner-details">
                        <span style={{ color: suitColors[bet.suit] }}>
                          {bet.suit}
                        </span> {suitNames[bet.suit]}
                      </div>
                      <div className="pmu__winner-prize">
                        Distribue {bet.gorgées} gorgée{bet.gorgées > 1 ? 's' : ''} ! 🍺
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="pmu__no-winner">
                <h2>😢 Aucun gagnant !</h2>
                <p>Tous les perdants boivent 2 gorgées ! 🍺🍺</p>
              </div>
            )}

            <button 
              onClick={resetGame}
              className="global-button-primary"
            >
              NOUVELLE COURSE 🏇
            </button>
          </div>
        </div>

        <div className="global-game-footer">
          <button onClick={onBack} className="global-game-back-button">
            ← Retour au menu
          </button>
        </div>
      </div>
    );
  }
}