import { useState } from 'react';
import './Questions.css';

export default function Questions({ players, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);

  const questions = [
    "Quel est ton plus gros regret en soirée ? 🤦",
    "C'est quoi le pire date de ta vie ? 💔",
    "Tu as déjà fait quoi de plus fou bourré ? 🤪",
    "Quel est ton crush secret dans ce groupe ? 😏",
    "Tu préfères embrasser qui ici ? 💋",
    "C'est quoi ton mensonge le plus gros ? 🤥",
    "Tu as déjà triché avec qui ? 😈",
    "Quel est ton kiff le plus bizarre ? 🙈",
    "Tu ferais quoi pour 1000€ ? 💰",
    "C'est quoi ton fantasme inavouable ? 🔥",
    "C'est qsdqsdq ton fantasme inavouable ? 🔥",
    "C'est qsdqsdq ton qsdqs inavouable ? 🔥",
    "C'est qsdqsdq ton qsdqs sa ? 🔥",
  ];

  const getRandomPlayer = () => {
    return players[Math.floor(Math.random() * players.length)];
  };

  const nextQuestion = () => {
    const availableQuestions = questions
      .map((q, index) => index)
      .filter(index => !usedQuestions.includes(index));

    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      setCurrentQuestionIndex(0);
    } else {
      const randomIndex = availableQuestions[
        Math.floor(Math.random() * availableQuestions.length)
      ];
      setCurrentQuestionIndex(randomIndex);
      setUsedQuestions([...usedQuestions, randomIndex]);
    }
  };

  const currentPlayer = getRandomPlayer();

  return (
    <div className="global-container-page">
      {/* Header avec titre */}
      <div className="global-game-header">
        <h1 className="global-game-title">QUESTIONS</h1>
      </div>

      {/* Contenu central avec la carte */}
      <div className="global-game-content">
        <div className="global-card questions__card-width">
          {/* Joueur ciblé */}
          <div className="questions__player-section">
            <div className="global-badge-player">
              <span className="global-badge-player-name">{currentPlayer}</span>
            </div>
          </div>

          {/* Question */}
          <div className="questions__question">
            {questions[currentQuestionIndex]}
          </div>

          {/* Instructions */}
          <div className="questions__instructions">
            <p>👉 Réponds ou BOIS !</p>
          </div>

          {/* Bouton suivant */}
          <button onClick={nextQuestion} className="global-button-primary">
            QUESTION SUIVANTE →
          </button>

          {/* Compteur */}
          <div className="questions__counter">
            Question {usedQuestions.length + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Footer avec petit bouton retour */}
      <div className="global-game-footer">
        <button onClick={onBack} className="global-game-back-button">
          ← Retour
        </button>
      </div>
    </div>
  );
}
