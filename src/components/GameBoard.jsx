import React, { useState } from "react";

const initialBoard = [
  ["O", null, null],
  [null, "X", null],
  [null, null, null],
];

export default function GameBoard({
  onSelectSquare,
  activePlayerSymbol,
  turns,
}) {
  let board = initialBoard;
  // const [board, setBoard] = useState(initialBoard);
  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setBoard((prevBoard) => {
  //     const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // };
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return (
    <ul id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ul>
  );
}
