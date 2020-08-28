/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.checkSolutionsAndAssignPiece = function(rowIndex, fn) {
  console.log(this);
  // debugger;
  for (var colIndex = 0; colIndex < this.attributes[rowIndex].length; colIndex++) {
    this.attributes[rowIndex][colIndex] = 1;
    if (fn.call(this, rowIndex, colIndex)) {
      this.attributes[rowIndex][colIndex] = 0;
    } else {
      return true;
    }
  }
  return false;
};

window.findNRooksSolution = function(n) {
  var solution = [];
  var newBoard = new Board({n:n});
  thisBoard = newBoard.attributes;
  for (var row in thisBoard) {
    checkSolutionsAndAssignPiece.call(newBoard, row, newBoard.hasAnyRooksConflictsOn);
    if (row !== 'n') {
      solution.push(thisBoard[row])
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// How this might look for n = 4

// Iterate through rows
  // Iterate through columns
    // Place piece
    // check for conflicts
    // if conflict
      // remove piece
      // if end of column
        // if first row
          // return answer
        // if not last row
          // rowIndex - 2
    // if no conflict
      // if last row
        // increment count
        // rowIndex - 2
      // break out of column into row loop

// Try 0,0 works
// Try 1,0 doesn't work
// Try 1,1 works
// Try 2,0 doesn't work
// Try 2,1 doesn't work
// Try 2,2 works
// Try 3,0 doesn't work remove
// Try 3,1 doesn't work
// Try 3,2 doesn't work
// Try 3,3 works
// last row - increment count if (rowIndex === n)
// end of row
// zero out place (3, 3)
// go back one row.
// find current piece indexOf?
// zero out place (2, 2)
// Try 2,3 works (indexOf + 1)
// Try 3,0 doesn't work
// Try 3,1 doesn't work
// Try 3,2 works
// last row - increment count     if (rowIndex === n)
// Try 3,3 doesn't work
// end of row
// go back one row.
// end of row
// go back one row.
// Try 1,2 works
// Try 2,0 doesn't work
// Try 2,1 works
// Try 3,0 doesn't work
// Try 3,1 doesn't work
// Try 3,2 doesn't work
// Try 3,3 works
// last row - increment count



// Try 4,0 doesn't work
// Try 4,1 doesn't work
// Try 4,2 doesn't work
// Try 4,3 doesn't work
// Try 4,4 works
// Try 3,4 works
// Try 4,0 doesn't work
// Try 4,1 doesn't work
// Try 4,2 doesn't work
// Try 4,3 doesn't work


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  debugger;
  var solutionCount = 0; //fixme

  var newBoard = new Board({n:n});
  thisBoard = newBoard.attributes;
  var lastRunFlag = false;


  // Iterate through rows
  for (var rowIndex = 0; rowIndex < Object.keys(thisBoard).length - 1; rowIndex++) {
    // Iterate through columns
    for (var colIndex = 0; colIndex < thisBoard[rowIndex].length; colIndex++) {
      // check for previous pieces
      var pieceOnRow = thisBoard[rowIndex].indexOf(1);
      if (pieceOnRow !== -1) {
        thisBoard[rowIndex][pieceOnRow] = 0;
        if (pieceOnRow >= n - 1) {
          break;
        } else {
          colIndex = pieceOnRow + 1;
        }
      }
      // Place piece
      thisBoard[rowIndex][colIndex] = 1;
      // check for conflicts
      if (newBoard.hasAnyRooksConflictsOn(rowIndex, colIndex)) {
        // if conflict
        // remove piece
        thisBoard[rowIndex][colIndex] = 0;
      } else {
        // not a conflict
        // if last row
        if (rowIndex === n - 1) {
          // increment count
          solutionCount++;
          // rowIndex - 2
          if (n === 1) {
            return solutionCount;
          } else {
            thisBoard[rowIndex][colIndex] = 0;
            rowIndex -= 2; // end of puzzle, find more solutions by moving above pieces around
          }
        }
        // break out of column into row loop
        break;
      }
      // if end of column
      if (colIndex === thisBoard[rowIndex].length - 1) {
        // if last row
        if (rowIndex === n - 1) {
          if (lastRunFlag) {
            return solutionCount;
          }
        }
        // if first row
        if (rowIndex === 0) {
          // return answer
          lastRunFlag = true;
          // return solutionCount;
        }
        // if not last row
        if (rowIndex !== n - 1) {
          rowIndex -= 2; // no pieces can be placed in this row, try the row above.
        }
      }
    }
  }
      // if no conflict



  // for (var rowIndex = 0; rowIndex < Object.keys(thisBoard).length - 1; rowIndex++) {
  //   if (rowIndex === n) {
  //     // unassin it here

  //     thisBoard[rowIndex][colIndex] = 0
  //     thisBoard[rowIndex][colIndex + 1] = 1
  //     //  assign it to the next one
  //     solutionCount++;
  //     //  also remove piece and try next space
  //     // check if no conflict and increase solutionCount again.. ad nauseaum
  //   }
  //   } else {
  //     if (checkSolutionsAndAssignPiece.call(newBoard, rowIndex + 1, newBoard.hasAnyRooksConflictsOn)) {
  //   }
  //   // if (rowIndex !== 'n') {
  //   //   solution.push(thisBoard[rowIndex])
  //   // }
  // }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
