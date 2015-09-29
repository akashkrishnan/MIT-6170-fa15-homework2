var Rules = function () {

  var that = Object.create( Rules );

  that.original = function ( alive, n ) {

    // Handle alive/dead cells separately
    if ( alive ) {
      return ( n < 3 || n > 4 ) ? 0 : 1;
    } else {
      return n === 3 ? 1 : 0;
    }

  };

  Object.freeze( that );

  return that;

};
