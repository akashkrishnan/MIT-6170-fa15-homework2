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

    // Update board's population
    board.map( function ( alive, x, y ) {

      var n = board.getNumNeighbors( x, y );

      // Handle alive/dead cells separately
      if ( alive ) {
        return ( n < 3 || n > 4 ) ? 0 : 1;
      } else {
        return n === 3 ? 1 : 0;
      }

    } );

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
