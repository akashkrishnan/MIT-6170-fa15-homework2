/**
 * Constructs and returns a GameOfLife object.
 *
 * @param {Board} board - Board object
 * @returns {GameOfLife} - GameOfLife object
 * @constructor
 */
var GameOfLife = function ( board ) {

  var that = Object.create( GameOfLife );

  // Initialize board
  that.board = board;

  Object.freeze( that );
  return that;

};
