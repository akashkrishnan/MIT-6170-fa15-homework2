/**
 * Constructs and returns a GameOfLife object.
 *
 * @param {Board} board - Board object
 * @returns {GameOfLife} - GameOfLife object
 * @constructor
 */
var GameOfLife = function ( board ) {

  var that = Object.create( GameOfLife );

  var population = board.getPopulation();
  var simulationInterval;

  var simulator = function () {

    // Get copy of populate that we can modify
    var pop = board.getPopulation();
    var n;

    // Loop through rows
    pop.forEach( function ( row, y ) {

      // Loop through cells
      row.forEach( function ( cell, x ) {

        n = board.getNumNeighbors( x, y );

        // Handle alive/dead cells separately
        if ( cell ) {
          if ( n < 3 || n > 4 ) {
            pop[ y ][ x ] = 0;
          }
        } else if ( n === 3 ) {
          pop[ y ][ x ] = 1;
        }

      } );

    } );

    // Update board's population with modified population
    board.setPopulation( pop );

  };

  that.startSimulation = function () {
    if ( simulationInterval ) {
      clearInterval( simulationInterval );
    }
    population = board.getPopulation();
    board.setSimulating( true );
    simulationInterval = setInterval( simulator, 100 );
  };

  that.pauseSimulation = function () {
    if ( simulationInterval ) {
      clearInterval( simulationInterval );
    }
    board.setSimulating( false );
  };

  that.resetSimulation = function () {
    that.pauseSimulation();
    board.setPopulation( population );
  };

  Object.freeze( that );
  return that;

};
