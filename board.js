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
  that.rows = rows = rows || 20;
  that.cols = cols = cols || 20;

  // Contains divs that represent each cell
  var cells = new Array( rows );

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

  container.addEventListener( 'click', clickListener );

  /**
   * Populates cells in the board, randomly doing so if a model isn't provided.
   *
   * @param {Array.<Array.<number>>} [model] - 2d array of numbers representing the alive state of each cell; 1 is
   * alive; 0 is dead; dimensions must match rows and cols for this board.
   * @returns {Board} - itself
   */
  that.setPopulation = function ( model ) {

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

    return that;

  };

  /**
   * Constructs and returns a new 2d array representing the Board's data model.
   *
   * @returns {Array.<Array.<number>>} - 1 is alive; 0 is dead
   */
  that.getPopulation = function () {

    var pop = new Array( rows );

    // Loops through rows
    cells.forEach( function ( row, y ) {

      pop[ y ] = new Array( cols );

      // Loop through columns
      row.forEach( function ( cell, x ) {
        pop[ y ][ x ] = cell.hasAttribute( 'alive' ) ? 1 : 0;
      } );

    } );

    return pop;

  };

  /**
   * Computes and returns the number of living neighbors, including itself.
   *
   * @param {number} x - x-coordinate of cell
   * @param {number} y - y-coordinate of cell
   * @returns {number} - number of living neighbors
   */
  that.getNumNeighbors = function ( x, y ) {

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

  };

  /**
   * Shows (or hides) gridlines.
   *
   * @param {boolean} [show=true] - whether to show to hide gridlines
   * @returns {Board} - itself
   */
  that.showGridlines = function ( show ) {

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
   * Removes all elements created by this instance from its container. After being called, this instance has undefined
   * functionality.
   */
  that.dispose = function () {

    // Remove click event listener
    container.removeEventListener( 'tap', clickListener );

    // Get each row and remove it
    var y, row;
    for ( y = 0; y < rows; y++ ) {
      row = cells[ y ][ 0 ].parentElement;
      container.removeChild( row );
    }

  };

  Object.freeze( that );
  return that;

};
