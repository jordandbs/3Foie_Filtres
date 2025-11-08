import { useState } from "react";
import "./Questions.css";

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
      "T'as déjà ghosté quelqu'un qui était vraiment amoureux ? 👻",
      "Quel est ton pire red flag en tant que personne ? 🚩",
      "T'as déjà menti sur ton âge pour rentrer en boîte ? 🎉",
      "T'as déjà fait un rêve bizarre sur quelqu'un du groupe ? 😴",
      "C'est quoi le surnom le plus débile qu'on t'a donné ? 🤪",
      "As-tu déjà inventé une excuse bidon pour éviter de sortir ?",
      "As-tu déjà ri tellement fort que tu as fait du bruit bizarre ?",
      "As-tu déjà oublié le prénom de quelqu’un en plein face à face ?",
      "As-tu déjà fait semblant de comprendre une blague que tu n’avais pas comprise ?",
      "As-tu déjà pris un selfie dont tu n’étais pas fier du tout ?",
      "As-tu déjà stalké quelqu’un juste parce que tu t’ennuyais ?",
      "As-tu déjà fait une blague qui a fait un malaise ?",
      "As-tu déjà volé de la bouffe à quelqu’un sans qu’il le sache ?",
      "As-tu déjà cassé quelque chose puis fait comme si de rien n’était ?",
      "As-tu déjà envoyé un message à la mauvaise personne ?",
      "As-tu déjà menti en disant 'je suis en route' alors que tu n’étais pas prêt ?",
      "As-tu déjà oublié où tu avais rangé ton propre téléphone ?",
      "As-tu déjà ri à ton propre message avant qu’il soit envoyé ?",
      "As-tu déjà mis trop de temps à répondre puis dit 'désolé j’ai dormi' ?",
      "As-tu déjà fait genre que tu connaissais une chanson pour suivre tout le monde ?",
      "As-tu déjà lâché un fou rire au pire moment possible ?",
      "As-tu déjà fait semblant d’être occupé pour éviter quelqu’un ?",
      "As-tu déjà regretté une coupe de cheveux quelques heures après l’avoir faite ?",
      "As-tu déjà envoyé un vocal que tu as voulu supprimer immédiatement ?",
      "As-tu déjà promis 'j’arrive dans 5 minutes' alors que clairement non ?",
      "As-tu déjà reproduit une scène de film seul chez toi ?",
      "As-tu déjà changé de trottoir pour éviter quelqu’un ?",
      "As-tu déjà paniqué en voyant une ancienne story revenir dans tes archives ?",
      "As-tu déjà fait semblant d’écrire pour éviter de répondre ?",
      "As-tu déjà cherché quelqu’un sur les réseaux sans avoir son nom ?",
      "As-tu déjà oublié un mot simple et fait genre c’était profond ?",
      "As-tu déjà pensé à une réponse drôle 10 minutes trop tard ?",
      "As-tu déjà inventé un rire juste pour suivre les autres ?",
      "As-tu déjà dit 'à toi aussi' à quelqu’un qui t’a souhaité bon appétit ?",
      "As-tu déjà gardé un secret juste pour paraître mystérieux ?",
      "As-tu déjà screenshot ton propre message pour l’envoyer à quelqu’un d’autre ?",
      "As-tu déjà mis un timer juste pour ne pas répondre trop vite ?",
      "As-tu déjà dit 'j’écoute' alors que tu n’écoutais pas du tout ?",
      "As-tu déjà prétendu aimer un film dont tout le monde parlait ?",
      "As-tu déjà perdu un débat mais continué quand même ?",
      "As-tu déjà passé 1h à choisir une photo pour au final ne rien poster ?",
      "As-tu déjà essayé de marcher normalement après avoir trébuché pour sauver la dignité ?",
      "As-tu déjà fait style que ton message n’était pas destiné à la mauvaise personne ?",
      "As-tu déjà eu la flemme de répondre mais été actif partout ailleurs ?",
      "As-tu déjà dit 'je meurs' sans vraiment rire ?",
      "As-tu déjà oublié de répondre à quelqu’un alors que tu avais lu le message ?",
      "As-tu déjà fait une liste de choses à faire puis n’en faire aucune ?",
      "As-tu déjà demandé 'hein ?' puis compris la phrase juste après ?",
      "As-tu déjà eu un fou rire silencieux qui fait mal aux abdos ?",
      "As-tu déjà pensé à quelque chose de drôle en pleine situation sérieuse ?",
      "As-tu déjà eu une conversation entière avec toi-même dans ta tête ?",
      "As-tu déjà fait genre que tu savais danser ?",
      "As-tu déjà essayé d’expliquer une blague et tout ruiner ?",
      "As-tu déjà regretté instantanément une story postée ?",
    ],
    couple: [
      "BODYCOUNT",
      "Quel est ton kiff le plus bizarre au lit ? 🔥",
      "T'as déjà fait semblant de jouir ? 😬",
      "C'est quoi le pire date de ta vie ? 💔",
      "T'as déjà couché le premier soir ? 🌙",
      "Combien de personnes t'as embrassées dans ta vie ?",
      "T'as déjà triché pendant une relation ? 😈",
      "Quel est ton fantasme inavouable ? 🙈",
      "As-tu déjà couché avec quelqu’un sans retenir son nom ?",
      "As-tu déjà eu deux partenaires différents dans la même journée ?",
      "As-tu déjà screenshot une conversation pour l’envoyer à quelqu’un d’autre ?",
      "As-tu déjà été la personne cachée dans une relation ?",
      "As-tu déjà pensé à quelqu’un d’autre pendant l’acte ?",
      "As-tu déjà menti sur ton bodycount ?",
      "As-tu déjà utilisé quelqu’un pour rendre une autre personne jalouse ?",
      "As-tu déjà ghosté juste après avoir obtenu ce que tu voulais ?",
      "As-tu déjà regretté un nude envoyé ?",
      "As-tu déjà appelé “ami” quelqu’un avec qui tu couchais ?",
      "As-tu déjà fait l’amour dans un lieu public ?",
      "As-tu déjà fait un walk of shame ?",
      "As-tu déjà dit “je t’aime” sans le penser ?",
      "As-tu déjà pleuré après avoir couché ?",
      "As-tu déjà bloqué quelqu’un pendant qu’il t’écrivait ?",
      "As-tu déjà donné une fausse identité ?",
      "As-tu déjà fouillé un téléphone pendant que l’autre dormait ?",
      "As-tu déjà réécouté tes vocaux pour t’analyser ?",
      "As-tu déjà embrassé quelqu’un pour éviter de parler ?",
      "As-tu déjà été dans une relation en sachant que tu méritais mieux ?",
      "As-tu déjà gardé des messages que tu aurais dû supprimer ?",
      "As-tu déjà parlé à deux personnes en même temps en laissant planer le flou ?",
      "As-tu déjà relu de vieux messages juste pour ressentir à nouveau quelque chose ?",
      "As-tu déjà surveillé quelqu’un sur les réseaux pour te rassurer ou te faire mal ?",
      "As-tu déjà voulu envoyer “tu me manques” mais tu t’es retenu ?",
      "As-tu déjà prétendu être prêt(e) pour une relation alors que non ?",
      "As-tu déjà eu un crush sans aucun signe en retour ?",
      "As-tu déjà fait croire que tu avais d’autres options juste pour exister ?",
      "As-tu déjà laissé revenir quelqu’un que tu aurais dû bloquer ?",
      "As-tu déjà espéré le retour de quelqu’un juste pour pouvoir dire non ?",
      "As-tu déjà couché juste pour ressentir quelque chose ?",
      "As-tu déjà comparé ton image à celle de l’ex de ton crush ?",
      "As-tu déjà supprimé un message par panique ?",
      "As-tu déjà envoyé un “bonne nuit” juste pour provoquer ?",
      "As-tu déjà liké une vieille photo par accident et paniqué ?",
      "As-tu déjà embrassé quelqu’un dont tu ne te rappelles presque plus ?",
      "As-tu déjà fait semblant de dormir pour éviter une discussion ?",
      "As-tu déjà fantasmé sur quelqu’un dans le groupe ?",
      "As-tu déjà coupé un lien sans explication pour éviter le face à face ?",
      "As-tu déjà ignoré un message pour garder le contrôle ?",
      "As-tu déjà créé du manque intentionnellement chez quelqu’un ?",
      "As-tu déjà laissé quelqu’un attendre exprès avant de répondre ?",
      "As-tu déjà gardé quelqu’un comme plan B ?",
      "As-tu déjà donné de l’espoir sans intention derrière ?",
      "As-tu déjà commencé une relation juste pour éviter la solitude ?",
      "As-tu déjà relu ton propre “ok” dix fois avant de l’envoyer ?",
      "As-tu déjà dit “je ne suis pas jaloux(se)” en l’étant vraiment ?",
      "As-tu déjà stalké la nouvelle relation de ton ex ?",
      "As-tu déjà profité de quelqu’un qui t’aimait plus que toi ?",
      "As-tu déjà utilisé le silence comme arme ?",
    ],
  };

  // Toutes les questions
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
              onClick={() => startGame("amical")}
              className="questions__category-button questions__category-button--amical"
            >
              <div className="questions__category-icon">😊</div>
              <div className="questions__category-info">
                <div className="questions__category-name">AMICAL</div>
                <div className="questions__category-desc">Pour les Tigres</div>
                <div className="questions__category-count">
                  {questionsData.amical.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame("couple")}
              className="questions__category-button questions__category-button--couple"
            >
              <div className="questions__category-icon">🔥</div>
              <div className="questions__category-info">
                <div className="questions__category-name">COUPLE</div>
                <div className="questions__category-desc">C'EST CHAUD LÀ</div>
                <div className="questions__category-count">
                  {questionsData.couple.length} questions
                </div>
              </div>
            </button>

            <button
              onClick={() => startGame("toutes")}
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
            {selectedCategory === "amical" && "😊 AMICAL"}
            {selectedCategory === "couple" && "🔥 COUPLE"}
            {selectedCategory === "toutes" && "🎲 TOUTES"}
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
            <p>👉 Réponds HONNETEMENT ou BOIS!</p>
            <p>Pas de réponse 1 gorgée Mensonge 2 gorgées</p>
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
        <button
          onClick={() => setGameStarted(false)}
          className="global-game-back-button"
        >
          ← Changer de catégorie
        </button>
      </div>
    </div>
  );
}
