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
  var nextPopulation = [
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

  // GUI Dispose
  board.dispose();
  assert.strictEqual( con.querySelectorAll( '[row]' ).length, 0, 'Rows in GUI after dispose.' );
  assert.strictEqual( con.querySelectorAll( '[cell]' ).length, 0, 'Cells in GUI after dispose.' );

} );


QUnit.module( 'Rules' );

QUnit.test( 'OriginalRules', function ( assert ) {

  var rules = OriginalRules();

  assert.strictEqual( rules.isCellAlive( 0, 0 ), 0, 'Alive: 0, Neighbors: 0' );
  assert.strictEqual( rules.isCellAlive( 0, 1 ), 0, 'Alive: 0, Neighbors: 1' );
  assert.strictEqual( rules.isCellAlive( 0, 2 ), 0, 'Alive: 0, Neighbors: 2' );
  assert.strictEqual( rules.isCellAlive( 0, 3 ), 1, 'Alive: 0, Neighbors: 3' );
  assert.strictEqual( rules.isCellAlive( 0, 4 ), 0, 'Alive: 0, Neighbors: 4' );
  assert.strictEqual( rules.isCellAlive( 0, 5 ), 0, 'Alive: 0, Neighbors: 5' );
  assert.strictEqual( rules.isCellAlive( 0, 6 ), 0, 'Alive: 0, Neighbors: 6' );
  assert.strictEqual( rules.isCellAlive( 0, 7 ), 0, 'Alive: 0, Neighbors: 7' );
  assert.strictEqual( rules.isCellAlive( 0, 8 ), 0, 'Alive: 0, Neighbors: 8' );

  assert.strictEqual( rules.isCellAlive( 1, 0 ), 0, 'Alive: 1, Neighbors: 0' );
  assert.strictEqual( rules.isCellAlive( 1, 1 ), 0, 'Alive: 1, Neighbors: 1' );
  assert.strictEqual( rules.isCellAlive( 1, 2 ), 1, 'Alive: 1, Neighbors: 2' );
  assert.strictEqual( rules.isCellAlive( 1, 3 ), 1, 'Alive: 1, Neighbors: 3' );
  assert.strictEqual( rules.isCellAlive( 1, 4 ), 0, 'Alive: 1, Neighbors: 4' );
  assert.strictEqual( rules.isCellAlive( 1, 5 ), 0, 'Alive: 1, Neighbors: 5' );
  assert.strictEqual( rules.isCellAlive( 1, 6 ), 0, 'Alive: 1, Neighbors: 6' );
  assert.strictEqual( rules.isCellAlive( 1, 7 ), 0, 'Alive: 1, Neighbors: 7' );
  assert.strictEqual( rules.isCellAlive( 1, 8 ), 0, 'Alive: 1, Neighbors: 8' );

} );


QUnit.module( 'Simulation' );

QUnit.test( 'Still Life: Block', function ( assert ) {

  var pop = [
    [ 0, 0, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 4 ).cols( 4 ).build().setPopulation( pop );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop, 'Population after update.' );
  }

} );

QUnit.test( 'Still Life: Boat', function ( assert ) {

  var pop = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 0, 0 ],
    [ 0, 1, 0, 1, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 5 ).cols( 5 ).build().setPopulation( pop );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop, 'Population after update.' );
  }

} );

QUnit.test( 'Still Life: Beehive', function ( assert ) {

  var pop = [
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 1, 0, 0 ],
    [ 0, 1, 0, 0, 1, 0 ],
    [ 0, 0, 1, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0 ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 5 ).cols( 6 ).build().setPopulation( pop );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop, 'Population after update.' );
  }

} );

QUnit.test( 'Still Life: Loaf', function ( assert ) {

  var pop = [
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 1, 0, 0 ],
    [ 0, 1, 0, 0, 1, 0 ],
    [ 0, 0, 1, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0 ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 6 ).cols( 6 ).build().setPopulation( pop );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop, 'Population after update.' );
  }

} );

QUnit.test( 'Oscillator: Blinker (period 2)', function ( assert ) {

  var pop = [
    [
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ]
    ],
    [
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ]
    ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 5 ).cols( 5 ).build().setPopulation( pop[ 0 ] );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop[ (i + 1) % 2 ], 'Population after update.' );
  }

} );

QUnit.test( 'Oscillator: Toad (period 2)', function ( assert ) {

  var pop = [
    [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 1, 1, 0 ],
      [ 0, 1, 1, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 0, 0 ],
      [ 0, 1, 0, 0, 1, 0 ],
      [ 0, 1, 0, 0, 1, 0 ],
      [ 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 6 ).cols( 6 ).build().setPopulation( pop[ 0 ] );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop[ (i + 1) % 2 ], 'Population after update.' );
  }

} );

QUnit.test( 'Oscillator: Beacon (period 2)', function ( assert ) {

  var pop = [
    [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0 ],
      [ 0, 1, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0 ],
      [ 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 6 ).cols( 6 ).build().setPopulation( pop[ 0 ] );
  var rules = OriginalRules();

  for ( var i = 0; i < 15; i++ ) {
    board.update( rules.isCellAlive );
    assert.deepEqual( board.getPopulation(), pop[ (i + 1) % 2 ], 'Population after update.' );
  }

} );

QUnit.test( 'Oscillator: Pentadecathlon (period 15)', function ( assert ) {

  var pop = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ];

  var con = document.createElement( 'div' );
  var board = Board( con ).rows( 18 ).cols( 11 ).build().setPopulation( pop );
  var rules = OriginalRules();

  var i, j;
  for ( i = 0; i < 3; i++ ) {
    for ( j = 0; j < 15; j++ ) {
      board.update( rules.isCellAlive );
    }
    assert.deepEqual( board.getPopulation(), pop, 'Population after 15 updates.' );
  }

} );
