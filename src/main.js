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

var ValueLink = require( './value-link' );
var Link = Nested.Link = ValueLink.Link;
Nested.link = ValueLink.link;

var ModelProto = Nested.Model.prototype;

ModelProto.getLink = function( attr ){
    var model = this;

    return new Link( function( x ){
        if( arguments.length ){
            model[ attr ] = x;
        }

        return model[ attr ];
    });
};

var CollectionProto = Nested.Collection.prototype;

CollectionProto.getLink = function( model ){
    var collection = this;

    return new Link( function( x ){
        var prev = Boolean( collection.get( model ) );

        if( arguments.length ){
            var next = Boolean( x );
            if( prev !== next ){
                collection.toggle( model, x );
                return next;
            }
        }

        return prev;
    });
};
