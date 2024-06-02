import React from "react";
import Tile from "./Tile";

function Board({ puzzle, handleChange }) {
  return (
    <div className="board">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <Tile
              key={rowIndex + "-" + colIndex}
              value={col === 0 ? "" : col}
              onChange={(e) => handleChange(rowIndex, colIndex, e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
