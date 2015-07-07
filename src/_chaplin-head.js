(function( root, factory ){
    if( typeof exports === 'object' ){
        module.exports = factory( require( 'chaplin' ), require( 'react' ) );
    }
    else if( typeof define === 'function' && define.amd ){
        define( [ 'chaplin', 'react' ], factory );
    }
    else{
        root.React = factory( root.Nested, root.React );
    }
}( this, 