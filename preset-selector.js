'use strict';

var PresetSelector = function ( container ) {

  var that = Object.create( PresetSelector.prototype );

  var presets = {
    'Still Life: Block': [
      [ 0, 0, 0, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 1, 1, 0 ],
      [ 0, 0, 0, 0 ]
    ],
    'Still Life: Boat': [
      [ 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0 ],
      [ 0, 1, 0, 1, 0 ],
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ]
    ],
    'Still Life: Beehive': [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 1, 0, 0 ],
      [ 0, 1, 0, 0, 1, 0 ],
      [ 0, 0, 1, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    'Still Life: Loaf': [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 1, 0, 0 ],
      [ 0, 1, 0, 0, 1, 0 ],
      [ 0, 0, 1, 0, 1, 0 ],
      [ 0, 0, 0, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    'Oscillator: Blinker (period 2)': [
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0 ]
    ],
    'Oscillator: Toad (period 2)': [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 1, 1, 1, 0 ],
      [ 0, 1, 1, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    'Oscillator: Beacon (period 2)': [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0 ],
      [ 0, 1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    'Oscillator: Pentadecathlon (period 15)': [
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
    ]
  };
  var selectHandlers = [];
  var button;
  var dropdown;

  if ( container ) {

    var frag = document.createDocumentFragment();

    // Create preset button
    button = document.createElement( 'div' );
    button.setAttribute( 'button', '' );
    button.innerHTML = 'Preset';

    // Set up click listener for toggle and selection
    container.addEventListener( 'click', function ( e ) {

      var l = e.target;
      if ( l ) {

        // Handle button and items differently
        if ( l === button ) {

          // Toggle dropdown
          if ( button.hasAttribute( 'active' ) ) {

            // Hide dropdown
            button.removeAttribute( 'active' );
            dropdown.style.visibility = 'hidden';

          } else {

            // Show dropdown
            l.setAttribute( 'active', '' );
            dropdown.style.visibility = 'visible';

          }

        } else if ( l.hasAttribute( 'item' ) ) {

          // Hide dropdown
          button.removeAttribute( 'active' );
          dropdown.style.visibility = 'hidden';

          // Invoke handlers
          selectHandlers.forEach( function ( handler ) {
            var name = l.getAttribute( 'value' );
            handler( name, presets[ name ] );
          } );

        }

      }

    }, false );

    // Add button to fragment
    frag.appendChild( button );

    // Create dropdown list
    dropdown = document.createElement( 'div' );
    dropdown.setAttribute( 'list', '' );

    // Add each preset name to dropdown list
    Object.keys( presets ).forEach( function ( name ) {
      dropdown.insertAdjacentHTML(
        'beforeend',
        '<div item hoverable selectable value="' + name + '">' + name + '</div>'
      );
    } );

    // Add dropdown list to fragment
    frag.appendChild( dropdown );

    container.appendChild( frag );

  }

  /**
   * Adds a handler that will be called each time a preset is selected by the user.
   *
   * @param {function} cb - handler
   * @returns {PresetSelector} - itself
   */
  that.addSelectHandler = function ( cb ) {

    if ( typeof cb === 'function' ) {
      selectHandlers.push( cb );
    } else {
      console.error( 'Received invalid argument type. Expected function but found ' + typeof cb + '.' );
    }

    return that;

  };

  /**
   * Removes all handlers that match the provided handler.
   *
   * @param {function} cb - handler
   * @returns {PresetSelector} - itself
   */
  that.removeSelectHandler = function ( cb ) {

    selectHandlers.forEach( function ( handler, i, handlers ) {
      if ( handler === cb ) {
        delete handlers[ i ];
      }
    } );

    return that;

  };

  /**
   * Returns a preset population from a preset name.
   *
   * @param {string} name - name of preset
   * @returns {Array.<Array.<number>>} - preset population
   */
  that.get = function ( name ) {
    return presets[ name ];
  };

  Object.freeze( that );

  return that;

};
