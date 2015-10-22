var React = require( 'react' ),
    ReactDOM = require( 'react-dom' );

var NestedReact = module.exports = Object.create( React );

NestedReact.use = function( Backbone ){
    // listenToProps, listenToState, model, attributes, Model
    NestedReact.createClass = require( './createClass' ).use( Backbone );

    // React component for attaching views
    NestedReact.subview = require( './view-element' );

    // Extend react components to have jquery accessors
    var BaseComponent = Object.getPrototypeOf( React.createClass({ render : function(){} }).prototype ),
        $ = Backbone.$;

    Object.defineProperties( BaseComponent, {
        el : { get : function(){ return ReactDOM.findDOMNode( this ); } },
        $el : { get : function(){ return $( this.el ); } },
        $ : { value : function( sel ){ return this.$el.find( sel ); } }
    });
}
