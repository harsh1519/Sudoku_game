import React, { useState, useEffect } from "react";
import Board from "./ui/Board";
import Interface from "./ui/Interface";
import { generatePuzzle, validatePuzzle, solvePuzzle } from "./SudokuLogic";

function Sudoku() {
  const [puzzle, setPuzzle] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const newPuzzle = generatePuzzle();
    setPuzzle(newPuzzle);
    setStatus("");
  }, []); 

  const handleInterface = (action) => {
    switch (action) {
      case "create":
        const newPuzzle = generatePuzzle();
        setPuzzle(newPuzzle);
        setStatus("Puzzle created");
        break;
      case "validate":
        if (validatePuzzle(puzzle)) {
          setStatus("Valid solution");
        } else {
          setStatus("Invalid solution");
        }
        break;
      case "solve":
        const solved = solvePuzzle(puzzle);
        if (solved) {
          setPuzzle(solved);
          setStatus("Puzzle solved");
        } else {
          setStatus("Unable to solve puzzle");
        }
        break;
      case "clear":
        const emptyPuzzle = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
        setPuzzle(emptyPuzzle);
        setStatus("Cleared puzzle");
        break;
      default:
        break;
    }
  };

  const handleChange = (rowIndex, colIndex, e) => {
    const newValue = parseInt(e.target.value) || 0; // Parse input value to integer or 0 if not valid
    const newPuzzle = puzzle.map((row, r) =>
      r === rowIndex ? row.map((col, c) => (c === colIndex ? newValue : col)) : row
    );
    setPuzzle(newPuzzle);
  };

  return (
    <div className="Sudoku">
      <Board puzzle={puzzle} handleChange={handleChange} />
      <Interface handleInterface={handleInterface} status={status} />
    </div>
  );
}

export default Sudoku;

