'use strict';

QUnit.module( 'Board' );

QUnit.test( '1x1 Unpopulated', function ( assert ) {

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 1 ).cols( 1 );

  // Model
  assert.deepEqual( board.rows(), 1, 'Rows.' );
  assert.deepEqual( board.cols(), 1, 'Columns.' );

  // GUI BEFORE build
  assert.deepEqual( board.getPopulation(), board, 'Population before build.' );
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI before build.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI before build.' );
  assert.strictEqual( con.querySelectorAll( '[cell][allive]' ).length, 0, 'Living cells in GUI before build.' );

  // GUI AFTER build
  board.build();
  assert.deepEqual( board.getPopulation(), [ [ 0 ] ], 'Population after build.' );
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 1, 'Rows in GUI after build.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 1, 'Cells in GUI after build.' );
  assert.strictEqual( con.querySelectorAll( '[cell][allive]' ).length, 0, 'Living cells in GUI after build.' );

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );

QUnit.test( '1x5 Unpopulated', function ( assert ) {

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 1 ).cols( 5 ).build();

  // Model
  assert.deepEqual( board.rows(), 1, 'Rows.' );
  assert.deepEqual( board.cols(), 5, 'Columns.' );
  assert.deepEqual(
    board.getPopulation(),
    [
      [ 0, 0, 0, 0, 0 ]
    ],
    'Population.'
  );

  // GUI
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 1, 'Rows GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 5, 'Cells in GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell][alive]' ).length, 0, 'Living cells in GUI.' );

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );

QUnit.test( '5x1 Unpopulated', function ( assert ) {

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 5 ).cols( 1 ).build();

  // Model
  assert.deepEqual( board.rows(), 5, 'Rows.' );
  assert.deepEqual( board.cols(), 1, 'Columns.' );
  assert.deepEqual(
    board.getPopulation(),
    [
      [ 0 ],
      [ 0 ],
      [ 0 ],
      [ 0 ],
      [ 0 ]
    ],
    'Population.'
  );

  // GUI
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 5, 'Rows GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 5, 'Cells in GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell][alive]' ).length, 0, 'Living cells in GUI.' );

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );

QUnit.test( '5x5 Unpopulated', function ( assert ) {

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 5 ).cols( 5 ).build();

  // Model
  assert.deepEqual( board.rows(), 5, 'Rows.' );
  assert.deepEqual( board.cols(), 5, 'Columns.' );
  assert.deepEqual(
    board.getPopulation(),
    [
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ]
    ],
    'Population.'
  );

  // GUI
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 5, 'Rows GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 25, 'Cells in GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell][alive]' ).length, 0, 'Living cells in GUI.' );

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );

QUnit.test( '6x10 Populated', function ( assert ) {

  var population = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
  ];
  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 6 ).cols( 10 ).build().setPopulation( population );

  // Model
  assert.deepEqual( board.rows(), 6, 'Rows.' );
  assert.deepEqual( board.cols(), 10, 'Columns.' );
  assert.deepEqual( board.getPopulation(), population, 'Population.' );

  assert.deepEqual( board.getNumNeighbors( 0, 0 ), 0, 'Neighbors at (0,0).' );
  assert.deepEqual( board.getNumNeighbors( 9, 0 ), 0, 'Neighbors at (9,0).' );
  assert.deepEqual( board.getNumNeighbors( 9, 5 ), 0, 'Neighbors at (9,5).' );
  assert.deepEqual( board.getNumNeighbors( 0, 5 ), 0, 'Neighbors at (0,5).' );

  assert.deepEqual( board.getNumNeighbors( 2, 1 ), 1, 'Neighbors at (2,1).' );
  assert.deepEqual( board.getNumNeighbors( 3, 2 ), 3, 'Neighbors at (3,2).' );
  assert.deepEqual( board.getNumNeighbors( 2, 3 ), 3, 'Neighbors at (2,3).' );
  assert.deepEqual( board.getNumNeighbors( 1, 3 ), 1, 'Neighbors at (1,3).' );
  assert.deepEqual( board.getNumNeighbors( 0, 3 ), 1, 'Neighbors at (0,3).' );
  assert.deepEqual( board.getNumNeighbors( 3, 3 ), 2, 'Neighbors at (3,3).' );
  assert.deepEqual( board.getNumNeighbors( 4, 3 ), 2, 'Neighbors at (4,3).' );
  assert.deepEqual( board.getNumNeighbors( 5, 3 ), 0, 'Neighbors at (5,3).' );

  // GUI
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 6, 'Rows GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 60, 'Cells in GUI.' );
  assert.strictEqual( con.querySelectorAll( '[cell][alive]' ).length, 6, 'Living cells in GUI.' );

  // Next generation
  board.update( Rules().original );

  console.log( board.getPopulation() );

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );
