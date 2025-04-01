import React from "react";

const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn, index) => {
        const { player, square } = turn;
        const { row, col } = square;
        return (
          <li key={index}>
            <span>
              <strong>Gracz {player}</strong> postawił znak na wierszu {row} i
              kolumnie {col}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default Log;
