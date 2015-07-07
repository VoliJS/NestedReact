(function( root, factory ){
    if( typeof exports === 'object' ){
        module.exports = factory( require( 'nestedtypes' ), require( 'react' ) );
    }
    else if( typeof define === 'function' && define.amd ){
        define( [ 'nestedtypes', 'react' ], factory );
    }
    else{
        root.React = factory( root.Nested, root.React );
    }
}( this, 