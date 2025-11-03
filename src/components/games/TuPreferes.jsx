import { useState } from 'react';
import './TuPreferes.css';

export default function TuPreferes({ players, onBack }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Questions par catégorie
  const questionsData = {
    amical: [
      { option1: "Perdre ton phone 📱", option2: "Perdre ton portefeuille 💳" },
      { option1: "Être toujours en retard ⏰", option2: "Attendre tout le temps 😴" },
      { option1: "Parler comme Yoda 🗣️", option2: "Respirer comme Darth Vader 😮‍💨" },
      { option1: "Ne plus jamais manger de pizza 🍕", option2: "Ne plus jamais manger de burgers 🍔" },
      { option1: "Avoir le hoquet H24 🤧", option2: "Éternuer toutes les 5 min 🤧" },
      { option1: "Vivre sans Netflix 📺", option2: "Vivre sans Spotify 🎵" },
      { option1: "Avoir toujours trop chaud 🥵", option2: "Avoir toujours trop froid 🥶" },
      { option1: "Ne jamais pouvoir mentir 🤥", option2: "Ne jamais savoir la vérité 🙈" },
      { option1: "Parler à haute voix 📢", option2: "Chuchoter pour toujours 🤫" },
      { option1: "Avoir 3 bras 💪💪💪", option2: "Avoir 3 jambes 🦵🦵🦵" },
      { option1: "Vivre sans Internet 📵", option2: "Vivre sans clim/chauffage 🌡️" },
      { option1: "Être célèbre sur TikTok 📱", option2: "Être riche mais inconnu 💰" },
      { option1: "Lire dans les pensées 🧠", option2: "Être invisible 👻" },
      { option1: "Vivre dans le passé ⏪", option2: "Vivre dans le futur ⏩" },
      { option1: "Combattre 100 canards 🦆", option2: "Combattre 1 cheval 🐴" },
    ],
    couple: [
      { option1: "Embrasser ton ex 💋", option2: "Embrasser ton/ta pote 😘" },
      { option1: "Plan cul incroyable 🔥", option2: "Relation stable mais fade 😐" },
      { option1: "Que tout le monde sache 👀", option2: "Garder le secret à jamais 🤐" },
      { option1: "Donner un lap dance 💃", option2: "Recevoir un lap dance 🪑" },
      { option1: "Sexe sans préliminaires ⚡", option2: "Préliminaires sans sexe 🤷" },
      { option1: "Ton crush te voit bourré 🍺", option2: "Ton crush te voit chier 💩" },
      { option1: "Ghosté après le sexe 👻", option2: "Friendzoné direct 💔" },
      { option1: "Nudes qui leak 📸", option2: "Historique de recherche public 🌐" },
      { option1: "Sexe avec lumière allumée 💡", option2: "Sexe dans le noir total 🌑" },
      { option1: "Dire 'je t'aime' trop tôt ❤️", option2: "Ne jamais le dire 🚫" },
      { option1: "Date raté mais bon sexe 🔥", option2: "Super date mais sexe nul 💤" },
      { option1: "Ton ex revient 🔄", option2: "Ton crush te DM 📩" },
      { option1: "Avouer ton body count 🔢", option2: "Montrer tes DM 📱" },
      { option1: "Crier pendant le sexe 📢", option2: "Être totalement silencieux 🤫" },
      { option1: "Partenaire qui parle trop 🗣️", option2: "Partenaire muet 😶" },
    ]
  };

  // Toutes les questions = amical + couple
  questionsData.toutes = [...questionsData.amical, ...questionsData.couple];

  // Fonction pour mélanger un array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Démarrer le jeu avec une catégorie
  const startGame = (category) => {
    setSelectedCategory(category);
    const questions = questionsData[category];
    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setGameStarted(true);
  };

  // Joueur aléatoire
  const getRandomPlayer = () => {
    return players[Math.floor(Math.random() * players.length)];
  };

  // Question suivante
  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Remélanger quand on a fini toutes les questions
      setShuffledQuestions(shuffleArray(questionsData[selectedCategory]));
      setCurrentQuestionIndex(0);
    }
  };

  const currentPlayer = getRandomPlayer();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Écran de sélection de catégorie
  if (!gameStarted) {
    return (
      <div className="global-container-page">
        {/* Header */}
        <div className="global-game-header">
          <h1 className="global-game-title">TU PRÉFÈRES</h1>
        </div>

        {/* Menu de sélection */}
        <div className="global-game-content">
          <div className="tupreferes__category-menu">
            <h2 className="tupreferes__category-title">
              Choisis ton ambiance 🎯
            </h2>

            <button
              onClick={() => startGame('amical')}
              className="tupreferes__category-button tupreferes__category-button--amical"
            >
              <div className="tupreferes__category-icon">😊</div>
              <div className="tupreferes__category-info">
                <div className="tupreferes__category-name">AMICAL</div>
                <div className="tupreferes__category-desc">
                  Entre potes, décontracté
                </div>
                <div className="tupreferes__category-count">
                  {questionsData.amical.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame('couple')}
              className="tupreferes__category-button tupreferes__category-button--couple"
            >
              <div className="tupreferes__category-icon">🔥</div>
              <div className="tupreferes__category-info">
                <div className="tupreferes__category-name">COUPLE</div>
                <div className="tupreferes__category-desc">
                  Hot & épicé, no limit
                </div>
                <div className="tupreferes__category-count">
                  {questionsData.couple.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame('toutes')}
              className="tupreferes__category-button tupreferes__category-button--toutes"
            >
              <div className="tupreferes__category-icon">🎲</div>
              <div className="tupreferes__category-info">
                <div className="tupreferes__category-name">TOUTES</div>
                <div className="tupreferes__category-desc">
                  Mix complet, sans filtre
                </div>
                <div className="tupreferes__category-count">
                  {questionsData.toutes.length} questions
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="global-game-footer">
          <button onClick={onBack} className="global-game-back-button">
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  // Écran de jeu
  return (
    <div className="global-container-page">
      {/* Header */}
      <div className="global-game-header">
        <h1 className="global-game-title">TU PRÉFÈRES</h1>
      </div>

      {/* Contenu */}
      <div className="global-game-content">
        <div className="global-card tupreferes__card-fixed">
          {/* Badge catégorie */}
          <div className="tupreferes__category-badge">
            {selectedCategory === 'amical' && '😊 AMICAL'}
            {selectedCategory === 'couple' && '🔥 COUPLE'}
            {selectedCategory === 'toutes' && '🎲 TOUTES'}
          </div>

          {/* Joueur ciblé */}
          <div className="tupreferes__player-section">
            <div className="global-badge-player">
              <span className="global-badge-player-name">{currentPlayer}</span>
            </div>
          </div>

          {/* Question titre */}
          <div className="tupreferes__question-title">
            Tu préfères... 🤔
          </div>

          {/* Options */}
          <div className="tupreferes__options">
            <div className="tupreferes__option tupreferes__option--1">
              <div className="tupreferes__option-number">1</div>
              <div className="tupreferes__option-text">
                {currentQuestion?.option1}
              </div>
            </div>

            <div className="tupreferes__vs">VS</div>

            <div className="tupreferes__option tupreferes__option--2">
              <div className="tupreferes__option-number">2</div>
              <div className="tupreferes__option-text">
                {currentQuestion?.option2}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="tupreferes__instructions">
            <p>👉 Choisis ton camp ou BOIS!</p>
          </div>

          {/* Bouton suivant */}
          <button onClick={nextQuestion} className="global-button-primary">
            QUESTION SUIVANTE →
          </button>

          {/* Compteur */}
          <div className="tupreferes__counter">
            Question {currentQuestionIndex + 1} / {shuffledQuestions.length}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="global-game-footer">
        <button onClick={() => setGameStarted(false)} className="global-game-back-button">
          ← Changer de catégorie
        </button>
      </div>
    </div>
  );
}