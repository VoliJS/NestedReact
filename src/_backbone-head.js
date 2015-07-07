(function( root, factory ){
    if( typeof exports === 'object' ){
        module.exports = factory( require( 'backbone' ), require( 'react' ) );
    }
    else if( typeof define === 'function' && define.amd ){
        define( [ 'backbone', 'react' ], factory );
    }
    else{
        root.React = factory( root.Backbone, root.React );
    }
}( this, 