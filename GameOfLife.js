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
    console.log( 'next' );
  };

  that.startSimulation = function () {
    if ( simulationInterval ) {
      clearInterval( simulationInterval );
    }
    population = board.getPopulation();
    board.setSimulating( true );
    simulationInterval = setInterval( simulator, 500 );
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
