var React = require( 'react' ),
    ReactDOM = require( 'react-dom' );

var NestedReact = module.export = Object.create( React );

NestedReact.use = function( Backbone ){
    // listenToProps, listenToState, model, attributes, Model
    NestedReact.createClass = require( './createClass' ).use( Backbone );

    // React component for attaching views
    NestedReact.subview = require( './view-element' ).use( Backbone );

    // Extend react components to have jquery accessors
    var BaseComponent = React.createClass({ render : function(){} }).type,
        $ = Backbone.$;

    Object.defineProperties( BaseComponent.prototype, {
        el : { get : function(){ return ReactDOM.findDOMNode( this ); } },
        $el : { get : function(){ return $( this.el ); } },
        $ : { value : function( sel ){ return this.$el.find( sel ); } }
    });
}
