/**
 * Constructs and returns a Board object. The Board object also renders itself in the DOM.
 *
 * @param {HTMLElement} container - the board will be rendered into this container element
 * @param {number} [rows=20] - positive number of rows of cells to show
 * @param {number} [cols=20] - positive number of columns of cells to show
 * @returns {Board} - constructed Board object
 * @constructor
 */
var Board = function ( container, rows, cols ) {

  var that = Object.create( Board );

  // Initialize row and column counts
  rows = rows || 20;
  cols = cols || 20;

  // Contains divs that represent each cell
  var cells;

  /**
   *
   * @param e
   */
  var clickListener = function ( e ) {

    // Ensure no simulation
    if ( !container.hasAttribute( 'simulating' ) ) {

      // Ensure a cell was clicked
      var cell = e.target;
      if ( cell.hasAttribute( 'cell' ) ) {

        // Check if cell is alive
        if ( cell.hasAttribute( 'alive' ) ) {
          cell.removeAttribute( 'alive' );
        } else {
          cell.setAttribute( 'alive', '' );
        }

      }

    }

  };

  /**
   * Gets or sets the number of rows in the board. If a value is specified, the number of rows is set; if a value is
   * not specified, the current number of rows is returned.
   *
   * @param {number} [num] - new number of rows
   * @returns {Board|number} - itself or the number of rows, depending on the provided argument
   */
  that.rows = function ( num ) {

    // Check if we need to set the value of rows
    if ( num != null ) {

      // Ensure valid type of value to set
      if ( typeof num === 'number' ) {
        rows = num;
      } else {
        console.error( 'Received invalid argument type. Expected number but found ' + typeof num + '.' );
      }

      return that;

    } else {
      return rows;
    }

  };

  /**
   * Gets or sets the number of columns in the board. If a value is specified, the number of columns is set; if a
   * value is not specified, the current number of columns is returned.
   *
   * @param {number} [num] - new number of columns
   * @returns {Board|number} - itself or the number of columns, depending on the provided argument
   */
  that.cols = function ( num ) {

    // Check if we need to set the value of rows
    if ( num != null ) {

      // Ensure valid type of value to set
      if ( typeof num === 'number' ) {
        cols = num;
      } else {
        console.error( 'Received invalid argument type. Expected number but found ' + typeof num + '.' );
      }

      return that;

    } else {
      return cols;
    }

  };

  /**
   * Clears any previous cells and adds cells to the board with the specified dimensions (rows, cols).
   *
   * @returns {Board} - itself
   */
  that.build = function () {

    // Clear previous cells if they exist
    if ( cells ) {
      that.dispose();
    }

    cells = new Array( rows );

    // Initialize cells and neighbors array
    var x, y, row, cell;
    for ( y = 0; y < rows; y++ ) {

      // Create a row
      row = document.createElement( 'div' );
      row.setAttribute( 'row', '' );

      // Populate the row with cells
      cells[ y ] = new Array( cols );
      for ( x = 0; x < cols; x++ ) {
        cell = cells[ y ][ x ] = document.createElement( 'div' );
        cell.setAttribute( 'cell', '' );
        cell.setAttribute( 'x', x );
        cell.setAttribute( 'y', y );
        row.appendChild( cell );
      }

      // Add row to board
      container.appendChild( row );

    }

    // Listen to click events
    container.addEventListener( 'click', clickListener );

    return that;

  };

  /**
   * Populates cells in the board, randomly doing so if a model isn't provided.
   *
   * @param {Array.<Array.<number>>} [model] - 2d array of numbers representing the alive state of each cell; 1 is
   * alive; 0 is dead; dimensions must match rows and cols for this board.
   * @returns {Board} - itself
   */
  that.setPopulation = function ( model ) {

    // Ensure board has been built
    if ( cells ) {

      var alive;

      // Loops through rows
      cells.forEach( function ( row, y ) {

        // Loop through columns
        row.forEach( function ( cell, x ) {

          // Randomly generate cell's living state
          alive = model ? model[ y ][ x ] : Math.round( Math.random() );
          if ( alive ) {
            cell.setAttribute( 'alive', '' );
          } else {
            cell.removeAttribute( 'alive' );
          }

        } );

      } );

    } else {
      console.error( 'Board has not been built. Please call build() before calling this function.' );
    }

    return that;

  };

  /**
   * Constructs and returns a new 2d array representing the Board's data model.
   *
   * @returns {Array.<Array.<number>>|Board} - 1 is alive; 0 is dead; itself if board has not been built with build()
   */
  that.getPopulation = function () {

    // Ensure board has been built
    if ( cells ) {

      var pop = new Array( rows );

      // Loop through rows
      cells.forEach( function ( row, y ) {

        pop[ y ] = new Array( cols );

        // Loop through columns
        row.forEach( function ( cell, x ) {
          pop[ y ][ x ] = cell.hasAttribute( 'alive' ) ? 1 : 0;
        } );

      } );

      return pop;

    } else {

      console.error( 'Board has not been built. Please call build() before calling this function.' );

      return that;

    }

  };

  /**
   * Computes and returns the number of living neighbors, including itself.
   *
   * @param {number} x - x-coordinate of cell
   * @param {number} y - y-coordinate of cell
   * @returns {number|Board} - number of living neighbors or itself, if the board has not been built with build()
   */
  that.getNumNeighbors = function ( x, y ) {

    // Ensure board has been build
    if ( cells ) {

      var n = 0;

      var x1 = Math.max( x - 1, 0 );
      var x2 = Math.min( x + 2, cols );
      var y1 = Math.max( y - 1, 0 );
      var y2 = Math.min( y + 2, rows );

      for ( x = x1; x < x2; x++ ) {
        for ( y = y1; y < y2; y++ ) {
          n += cells[ y ][ x ].hasAttribute( 'alive' );
        }
      }

      return n;

    } else {

      console.error( 'Board has not been built. Please call build() before calling this function.' );

      return that;

    }

  };

  /**
   * @callback mapCallback
   * @param {number} alive - cell's current alive state: 0 or 1
   * @param {number} n - the number of living neighbors, including itself
   * @returns {number} - cell's new alive state: 0 or 1
   */

  /**
   * Applies a function to each cell in the board. The operation is atomic, so previous changes do not affect future
   * changes within the same map call.
   *
   * @param {mapCallback} fn - function to apply to each cell in this Board
   * @returns {Board} - itself
   */
  that.map = function ( fn ) {

    // Ensure board has been built
    if ( cells ) {

      // Ensure fn is a function
      if ( typeof fn === 'function' ) {

        var pop = new Array( rows );

        // Loop through rows
        cells.forEach( function ( row, y ) {

          pop[ y ] = new Array( cols );

          // Loop through columns
          row.forEach( function ( cell, x ) {
            pop[ y ][ x ] = fn( cell.hasAttribute( 'alive' ), that.getNumNeighbors( x, y ) );
          } );

        } );

        that.setPopulation( pop );

      } else {
        console.error( 'Received invalid argument type. Expected function but found ' + typeof fn + '.' );
      }

    } else {
      console.error( 'Board has not been built. Please call build() before calling this function.' );
    }

    return that;

  };

  /**
   * Shows (or hides) gridlines.
   *
   * @param {boolean} [show=true] - whether to show to hide gridlines
   * @returns {Board} - itself
   */
  that.gridlines = function ( show ) {

    // Show/hide gridlines by adding/removing attribute
    if ( show || typeof show == null ) {
      container.setAttribute( 'show-gridlines', '' );
    } else {
      container.removeAttribute( 'show-gridlines' );
    }

    return that;

  };

  /**
   * Sets the simulation state of the board.
   *
   * @param {boolean} [simulating=true] - whether or not board is under simulation
   * @returns {Board} - itself
   */
  that.setSimulating = function ( simulating ) {

    // Show/hide gridlines by adding/removing attribute
    if ( simulating || typeof simulating == null ) {
      container.setAttribute( 'simulating', '' );
    } else {
      container.removeAttribute( 'simulating' );
    }

    return that;

  };

  /**
   * Removes all elements created by this instance from its container.
   */
  that.dispose = function () {

    // Remove click event listener
    container.removeEventListener( 'tap', clickListener );

    // Get each row and remove it
    cells.forEach( function ( row ) {
      container.removeChild( row[ 0 ].parentElement );
      row = null;
    } );

    cells = null;

  };

  Object.freeze( that );
  return that;

};
