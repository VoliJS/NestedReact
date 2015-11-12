var React    = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Nested   = require( 'nestedtypes' ),
    $        = Nested.$;

// extend React namespace
var NestedReact = module.exports = Object.create( React );

// listenToProps, listenToState, model, attributes, Model
NestedReact.createClass = require( './createClass' );

var ComponentView = require( './component-view' );

// export hook to override base View class used...
NestedReact.useView = function( View ){
    NestedReact._BaseView = ComponentView.use( View );
};

NestedReact.useView( Nested.View );

// React component for attaching views
NestedReact.subview = require( './view-element' );

// Extend react components to have backbone-style jquery accessors
var Component     = React.createClass( { render : function(){} } ),
    BaseComponent = Object.getPrototypeOf( Component.prototype );

Object.defineProperties( BaseComponent, {
    el  : { get : function(){ return ReactDOM.findDOMNode( this ); } },
    $el : { get : function(){ return $( this.el ); } },
    $   : { value : function( sel ){ return this.$el.find( sel ); } }
} );

var Link = NestedReact.Link = require( './value-link' );
Nested.link = Link.link;

var ModelProto = Nested.Model.prototype,
    LinkAttr   = Link.Attr;

ModelProto.getLink = function( attr ){ return new LinkAttr( this, attr ); };

var CollectionProto = Nested.Collection.prototype,
    LinkHas         = Link.CollectionHas;

CollectionProto.getLink = function( model ){
    return new LinkHas( this, model );
};
