/**
 * Constructs and returns a GameOfLife object that follows original rules.
 *
 * @param {Board} board - Board object
 * @returns {GameOfLife} - GameOfLife object
 * @constructor
 */
var GameOfLife = function ( board ) {

  var that = Object.create( GameOfLife );

  var population = board.getPopulation();
  var simulationInterval;
  var rules = OriginalRules();

  var simulator = function () {

    // Update board's population
    board.update( rules.isCellAlive );

  };

  /**
   * Sets the rules of the game.
   *
   * @param {Rules} r - rules of the game
   * @returns {GameOfLife} - itself
   */
  that.rules = function ( r ) {

    // Ensure valid arguments
    if ( r instanceof Rules ) {
      rules = r;
    } else {
      console.error( 'Received invalid argument. Expected object instance of Rules.' );
    }

    return that;

  };

  /**
   * Starts simulating the population indefinitely.
   *
   * @param {number} [interval=25] - updates occur at this interval in milliseconds
   * @returns {GameOfLife} - itself
   */
  that.startSimulation = function ( interval ) {

    if ( simulationInterval ) {
      clearInterval( simulationInterval );
    }
    population = board.getPopulation();
    board.setSimulating( true );
    simulationInterval = setInterval( simulator, interval || 25 );

    return that;

  };

  /**
   * Pauses simulating the population indefinitely.
   *
   * @returns {GameOfLife} - itself
   */
  that.pauseSimulation = function () {

    if ( simulationInterval ) {
      clearInterval( simulationInterval );
    }
    board.setSimulating( false );

    return that;

  };

  /**
   * Stops any ongoing simulation and resets the population to how it was when last the simulation started.
   *
   * @returns {GameOfLife} - itself
   */
  that.resetSimulation = function () {

    that.pauseSimulation();
    board.setPopulation( population );

    return that;

  };

  Object.freeze( that );
  return that;

};
