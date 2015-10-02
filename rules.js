'use strict';

/**
 * Constructs and returns a Rules object that contains functions that define the rules of a particular game.
 *
 * @returns {Rules} - constructed Rules object
 * @constructor
 */
var Rules = function () {

  var that = Object.create( Rules.prototype );

  /**
   * Determines whether a cell is alive or not in the next generation.
   *
   * @param {number} alive - 1 if cell is currently alive; 0 if cell is currently dead
   * @param {number} n - number of living neighbors, including itself if cell is alive
   * @returns {number} - 1 if cell is going to be alive; 0 if cell is going to be dead
   */
  that.isCellAlive = function ( alive, n ) { return alive };

  Object.freeze( that );

  return that;

};

/**
 * Constructs and returns an OriginalRules object that contains functions that define the original rules of the game.
 *
 * @returns {Rules} - constructed Rules object
 * @constructor
 */
var OriginalRules = function () {

  var that = Object.create( Rules.prototype );

  /**
   * Determines whether a cell is alive or not in the next generation.
   *
   * @param {number} alive - 1 if cell is currently alive; 0 if cell is currently dead
   * @param {number} n - number of living neighbors, including itself if cell is alive
   * @returns {number} - 1 if cell is going to be alive; 0 if cell is going to be dead
   */
  that.isCellAlive = function ( alive, n ) {

    // Handle alive/dead cells separately
    switch ( n ) {
      case 0:
      case 1:
        return 0;
      case 2:
        return alive;
      case 3:
        return 1;
      default:
        return 0;
    }

  };

  Object.freeze( that );

  return that;

};
