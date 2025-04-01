import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import Log from "./components/Log";

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
  return board.every((row) => row.every((cell) => cell !== null));
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  let board = initialBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const first = board[combination[0].row][combination[0].column];
    const second = board[combination[1].row][combination[1].column];
    const third = board[combination[2].row][combination[2].column];
    if (first && first === second && second === third) {
      winner = first;
      break;
    }
  }

  const handleSelectPlayer = (rowIndex, colIndex) => {
    if (winner || isBoardFull(board)) {
      return;
    }

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
          board={board}
        />
        {winner && (
          <div id="winner">
            <span className="highlight-player">{winner}</span> wins!
          </div>
        )}
        {!winner && isBoardFull(board) && (
          <div id="winner">
            <span className="highlight-player">It's a draw!</span>
          </div>
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
