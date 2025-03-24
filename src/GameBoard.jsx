import React from "react";

const GameBoard = () => {
  const board = [
    ["o", null, null],
    [null, null, null],
    ["x", null, null],
  ];
  return (
    <ul id="game-board">
      {board.map((row, index) => {
        return (
          <li key={index}>
            <ol>
              {row.map((value, index) => {
                return (
                  <li key={index}>
                    <button>{value}</button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ul>
  );
};

export default GameBoard;
