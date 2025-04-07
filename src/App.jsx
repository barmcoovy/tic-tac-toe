import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (turns) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const isBoardFull = (board) => {
  for (let row of board) {
    for (let cell of row) {
      if (cell === null) {
        return false;
      }
    }
  }
  return true;
};

const determineWinner = (board, names) => {
  for (const combination of WINNING_COMBINATIONS) {
    const first = board[combination[0].row][combination[0].column];
    const second = board[combination[1].row][combination[1].column];
    const third = board[combination[2].row][combination[2].column];
    if (first && first === second && second === third) {
      return first === "X" ? names.X : names.O;
    }
  }
  return null;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [board, setBoard] = useState(initialBoard);
  const [name, setName] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const handleNameChange = (player, newName) => {
    setName((prevNames) => ({
      ...prevNames,
      [player]: newName,
    }));
  };

  const winner = determineWinner(board, name);

  const handleSelectPlayer = (rowIndex, colIndex) => {
    if (winner || isBoardFull(board) || board[rowIndex][colIndex] !== null) {
      return;
    }

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      // Update the board state
      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? currentPlayer : cell
        )
      );
      setBoard(updatedBoard);

      return updatedTurns;
    });
  };

  const restartGame = () => {
    setGameTurns([]);
    setBoard(initialBoard);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player 1"}
            symbol={"X"}
            isActive={gameTurns[0]?.player === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            initialName={"Player 2"}
            isActive={gameTurns[0]?.player === "O"}
            symbol={"O"}
            onNameChange={handleNameChange}
          />
        </ol>
        <GameBoard
          isActive={gameTurns[0]?.player === "O"}
          onSelectSquare={handleSelectPlayer}
          board={board}
        />
      </div>
      <Log turns={gameTurns} />
      {winner && <GameOver winner={winner} restartGame={restartGame} />}
      {!winner && isBoardFull(board) && (
        <GameOver winner={"Remis"} restartGame={restartGame} />
      )}
    </main>
  );
}

export default App;
