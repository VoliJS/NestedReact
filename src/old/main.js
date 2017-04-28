var React    = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Nested   = require( 'nestedtypes' ),
    $        = Nested.$;

// extend React namespace
var NestedReact = module.exports = Object.create( React );

// listenToProps, listenToState, model, attributes, Model
NestedReact.createClass = require( './createClass' );

NestedReact.define = Nested.define;
NestedReact.mixins = Nested.mixins;

var ComponentView = require( './component-view' );

let BaseView;

// export hook to override base View class used...
NestedReact.useView = function( View ){
    BaseView = ComponentView.use( View );

    Object.defineProperty( Component, 'View', {
        get(){
            return this._View || ( this._View = _BaseView.extend( { reactClass : Component } ) );
        }
    } );
};

NestedReact.useView( Nested.View );

// React component for attaching views
NestedReact.subview = require( './view-element' );

var propTypes  = require( './propTypes' );
NestedReact.Node = propTypes.Node.value( null );
NestedReact.Element = propTypes.Element.value( null );

// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el  : { get : function(){ return ReactDOM.findDOMNode( this ); } },
    $el : { get : function(){ return $( this.el ); } },
    $   : { value : function( sel ){ return this.$el.find( sel ); } }
};

var Component     = React.createClass( { render : function(){} } ),
    BaseComponent = Object.getPrototypeOf( Component.prototype );

Object.defineProperties( BaseComponent, BackboneViewProps );
Object.defineProperties( React.Component.prototype, BackboneViewProps );

NestedReact.Link = require( './nested-link' );
