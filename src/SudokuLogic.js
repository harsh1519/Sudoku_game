
const getRandomSudoku = () => {
    const randomSudoku = [];
    for (let i = 0; i < 9; i++) {
      randomSudoku[i] = Array(9).fill(0);
    }
    for (let i = 0; i < 8; i++) {
      let number = Math.floor(Math.random() * 8) + 1;
      while (!isValidPlace(randomSudoku, 0, i, number)) {
        number = Math.floor(Math.random() * 8) + 1;
      }
      if (isValidPlace(randomSudoku, 0, i, number)) {
        randomSudoku[0][i] = number;
      }
    }
    return randomSudoku;
  };
  
  const isValidPlace = (grid, row, column, number) => {
    for (let i = 0; i < 9; i++) {
      if (grid[i][column] === number) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === number) {
        return false;
      }
    }
    let localBoxRow = row - (row % 3);
    let localBoxCol = column - (column % 3);
    for (let i = localBoxRow; i < localBoxRow + 3; i++) {
      for (let j = localBoxCol; j < localBoxCol + 3; j++) {
        if (grid[i][j] === number) {
          return false;
        }
      }
    }
    return true;
  };
  
  export const generatePuzzle = () => {
    let puzzle = getRandomSudoku();
    let solution = solvePuzzle(puzzle);
    if (solution) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (Math.random() > 0.3) puzzle[i][j] = 0;
        }
      }
      return puzzle;
    } else {
      return generatePuzzle(); 
    }
  };
  
  
  export const solvePuzzle = (grid) => {
    const solvedGrid = solve(grid); 
    return solvedGrid;
  };
  
  function solve(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
            if (isValidPlace(grid, row, col, possibleNumber)) {
              grid[row][col] = possibleNumber;
              if (solve(grid)) {
                return grid; 
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return grid; 
  }
  
  export const validatePuzzle = (grid) => {
    // Check rows
    for (let row = 0; row < 9; row++) {
      if (!isValidRow(grid, row)) {
        return false;
      }
    }
  
    // Check columns
    for (let col = 0; col < 9; col++) {
      if (!isValidCol(grid, col)) {
        return false;
      }
    }
  
    // Check boxes
    if (!isValidBox(grid)) {
      return false;
    }
  
    return true;
  };
  
  
  function isValidRow(grid, row) {
    let set = new Set();
    for (let i = 0; i < 9; i++) {
        let number = grid[row][i];
        console.log(number);
        if (number < 0 || number > 9 || number===0) {
           return false;
        }
        if (set.has(number)) {
            return false;
        } else {
            number !== 0 && set.add(number);
        }
    }
    return true;
    }
  
  function isValidCol(grid, col) {
    let set = new Set();
    for (let i = 0; i < 9; i++) {
        let number = grid[i][col];
        if (number < 0 || number > 9) {
        return false;
        }
        if (set.has(number)) {
        return false;
        } else {
        number !== 0 && set.add(number);
        }
    }
    return true;
  }
  
  function isValidBox(grid) {
    for (let row = 0; row < grid.length; row += 3) {
      for (let column = 0; column < grid.length; column += 3) {
        let set = new Set();
        for (let subRow = 0; subRow < 3; subRow++) {
          for (let subCol = 0; subCol < 3; subCol++) {
            let number = grid[subRow][subCol];
            if (number < 0 || number > 9) {
              return false;
            }
            if (set.has(number)) {
              return false;
            } else {
              number !== 0 && set.add(number);
            }
          }
        }
      }
    }
    return true;
  }
  