import React from "react";

const GameOver = ({ winner, restartGame }) => {
  return (
    <div id="game-over">
      <h2>Koniec Gry </h2>
      {winner === "Remis" ? (
        <p>Remis! Nikt nie wygrał!</p>
      ) : (
        <p>{winner} wygrał grę!</p>
      )}
      <p>
        <button onClick={restartGame}>Jeszcze raz!</button>
      </p>
    </div>
  );
};

export default GameOver;
