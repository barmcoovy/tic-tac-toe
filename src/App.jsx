import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

const deriveActivePlayer = (turns) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState("X");

  const handleSelectPlayer = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player 1"}
            symbol={"X"}
            isActive={gameTurns[0]?.player === "X"}
          />
          <Player
            initialName={"Player 2"}
            isActive={gameTurns[0]?.player === "O"}
          />
        </ol>
        <GameBoard
          isActive={gameTurns[0]?.player === "O"}
          onSelectSquare={handleSelectPlayer}
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
    </main>
  );
}

export default App;
