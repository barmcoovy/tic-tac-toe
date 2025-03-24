import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [activePlayer, setActivePlayer] = useState("X");

  const handleSelectPlayer = () => {
    setActivePlayer((activePlayer) => {
      return activePlayer === "X" ? "O" : "X";

      setGameTurns((prevTurns) => {
        return updatedTurns;
      });
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectPlayer}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
