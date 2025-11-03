import { useState } from 'react';
import './Questions.css';

export default function Questions({ players, onBack }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Questions par catégorie
  const questionsData = {
    amical: [
      "Quel est ton plus gros regret en soirée ? 🤦",
      "T'as déjà stalké ton ex en pleine soirée ? 👀",
      "T'as déjà fait un truc gênant bourré que personne sait ? 🤦",
      "T'as déjà recraché ton shot dans ton verre discrètement ? 🍺",
      "Sois honnête : t'as déjà fait semblant d'être malade pour sécher ? 😷",
      "T'as déjà ghosté quelqu'un qui était vraiment amoureux ? 👻",
      "Avoue : tu chantes sous la douche ou pas ? 🚿",
      "T'as déjà pleuré devant un film Disney récemment ? 😭",
      "Quel est ton pire red flag en tant que personne ? 🚩",
      "T'as déjà menti sur ton âge pour rentrer en boîte ? 🎉",
      "T'as déjà fait un rêve bizarre sur quelqu'un du groupe ? 😴",
      "C'est quoi le surnom le plus débile qu'on t'a donné ? 🤪",
      "T'as déjà envoyé un message embarrassant au mauvais groupe ? 📲",
      "Combien de temps tu peux tenir sans mater ton phone ? ⏱️",
      "T'as déjà raté un exam que t'étais sûr d'avoir réussi ? 📝",
    ],
    couple: [
      "C'est qui ton crush secret dans ce groupe ? (Pas le droit de mentir) 😏",
      "Avoue : t'as déjà embrassé quelqu'un ici en secret ? 💋",
      "Quel est ton kiff le plus bizarre au lit ? 🔥",
      "Combien de personnes t'as embrassées dans ta vie ? (Chiffre exact !) 💕",
      "T'as déjà triché pendant une relation ? 😈",
      "Quel est ton fantasme inavouable ? 🙈",
      "T'as déjà envoyé un nude à la mauvaise personne ? 📱",
      "T'as déjà fait un date Tinder qui a super mal tourné ? 📅",
      "C'est quoi le pire date de ta vie ? 💔",
      "T'as déjà fait semblant de jouir ? 😬",
      "Tu préfères embrasser qui dans ce groupe ? 💋",
      "C'est quoi ton plus gros turn-off ? 🚫",
      "T'as déjà couché le premier soir ? 🌙",
      "Quel est ton body count ? (Sois honnête !) 🔢",
      "T'as déjà fait un plan à trois ? 👥",
    ]
  };

  // Toutes les questions = amical + couple
  questionsData.toutes = [...questionsData.amical, ...questionsData.couple];

  // Fonction pour mélanger un array (shuffle)
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

  // Écran de sélection de catégorie
  if (!gameStarted) {
    return (
      <div className="global-container-page">
        {/* Header */}
        <div className="global-game-header">
          <h1 className="global-game-title">QUESTIONS</h1>
        </div>

        {/* Menu de sélection */}
        <div className="global-game-content">
          <div className="questions__category-menu">
            <h2 className="questions__category-title">
              Choisis ton ambiance 🙌
            </h2>

            <button
              onClick={() => startGame('amical')}
              className="questions__category-button questions__category-button--amical"
            >
              <div className="questions__category-icon">😊</div>
              <div className="questions__category-info">
                <div className="questions__category-name">AMICAL</div>
                <div className="questions__category-desc">
                  Pour les Tigres
                </div>
                <div className="questions__category-count">
                  {questionsData.amical.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame('couple')}
              className="questions__category-button questions__category-button--couple"
            >
              <div className="questions__category-icon">🔥</div>
              <div className="questions__category-info">
                <div className="questions__category-name">COUPLE</div>
                <div className="questions__category-desc">
                  C'EST CHAUD LÀ
                </div>
                <div className="questions__category-count">
                  {questionsData.couple.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame('toutes')}
              className="questions__category-button questions__category-button--toutes"
            >
              <div className="questions__category-icon">🎲</div>
              <div className="questions__category-info">
                <div className="questions__category-name">TOUTES</div>
                <div className="questions__category-desc">
                  Mix complet, sans filtre
                </div>
                <div className="questions__category-count">
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
        <h1 className="global-game-title">QUESTIONS</h1>
      </div>

      {/* Contenu */}
      <div className="global-game-content">
        <div className="global-card questions__card-fixed">
          {/* Badge catégorie */}
          <div className="questions__category-badge">
            {selectedCategory === 'amical' && '😊 AMICAL'}
            {selectedCategory === 'couple' && '🔥 COUPLE'}
            {selectedCategory === 'toutes' && '🎲 TOUTES'}
          </div>

          {/* Joueur ciblé */}
          <div className="questions__player-section">
            <div className="global-badge-player">
              <span className="global-badge-player-name">{currentPlayer}</span>
            </div>
          </div>

          {/* Question */}
          <div className="questions__question">
            {shuffledQuestions[currentQuestionIndex]}
          </div>

          {/* Instructions */}
          <div className="questions__instructions">
            <p>👉 Réponds ou BOIS!</p>
          </div>

          {/* Bouton suivant */}
          <button onClick={nextQuestion} className="global-button-primary">
            QUESTION SUIVANTE →
          </button>

          {/* Compteur */}
          <div className="questions__counter">
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