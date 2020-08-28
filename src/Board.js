// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      // debugger;
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflictsOn: function(rowIndex, colIndex) {
      return this.hasRowConflictAt(rowIndex) || this.hasColConflictAt(colIndex);
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex),rowIndex, colIndex) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex),rowIndex, colIndex)
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let thisRow = this.attributes[rowIndex];
      let accumulator = 0;
      if (Array.isArray(thisRow)) {
        for (let value of thisRow) {
          accumulator += value;
          if (accumulator > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let theseRows = this.attributes;
      for (let key in theseRows) {
        if (this.hasRowConflictAt(key)) {
          return true;
        }
      }
      return false; // fixme
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      let theseRows = this.attributes;
      var accumulator = 0;
      for (let i = 0; i < theseRows.n; i++) {
        accumulator += this.attributes[i][colIndex]; // Number(row[colIndex]);
        if (accumulator > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let theseRows = this.attributes;
      for (let i = 0; i < theseRows.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },
    //


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      let theseRows = this.attributes;
      let accumulator = 0;
      for (let rowIndex = 0; rowIndex < theseRows.n; rowIndex++) {
        for (let colIndex = 0; colIndex < theseRows[rowIndex].length; colIndex++) {
          if (theseRows[rowIndex][colIndex] === 1) {
            if (this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex) === majorDiagonalColumnIndexAtFirstRow) {
              accumulator++;
              if (accumulator > 1) {
                return true;
              }
            }
          }
        }

      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let theseRows = this.attributes;
      for (let i = 0; i < this.attributes.n; i++) {
        // Potential bug for not checking rest of row
        var colIndex = this.attributes[i].indexOf(1);
        if (colIndex !== -1) {
          var md = this._getFirstRowColumnIndexForMajorDiagonalOn(i, colIndex);
          if (this.hasMajorDiagonalConflictAt(md, i, colIndex)) {
            return true;
          }
        }
      }
      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      let theseRows = this.attributes;
      let accumulator = 0;
      for (let rowIndex = 0; rowIndex < theseRows.n; rowIndex++) {
        for (let colIndex = 0; colIndex < theseRows[rowIndex].length; colIndex++) {
          if (theseRows[rowIndex][colIndex] === 1) {
            if (this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex) === minorDiagonalColumnIndexAtFirstRow) {
              accumulator++;
              if (accumulator > 1) {
                return true;
              }
            }
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let theseRows = this.attributes;
      for (let i = 0; i < this.attributes.n; i++) {
        // Potential bug for not checking rest of row
        var colIndex = this.attributes[i].indexOf(1);
        if (colIndex !== -1) {
          var md = this._getFirstRowColumnIndexForMinorDiagonalOn(i, colIndex);
          if (this.hasMinorDiagonalConflictAt(md, i, colIndex)) {
            return true;
          }
        }
      }
      return false; // fixme
    }
    /*--------------------  End of Helper Functions  ---------------------*/

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
