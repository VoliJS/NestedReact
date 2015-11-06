var React    = require( 'react' ),
    Nested   = require( 'nestedtypes' );

function forceUpdate(){ this.forceUpdate(); }

var Events = Object.assign( {
    componentWillUnmount : function(){
        this.stopListening();
    }
}, Nested.Events );

var ListenToProps = {
    componentDidMount : function(){
        var props    = this.props,
            updateOn = this.listenToProps;

        for( var prop in updateOn ){
            var emitter = props[ prop ];
            emitter && this.listenTo( emitter, updateOn[ prop ], forceUpdate );
        }
    }
};

var ModelState = {
    listenToState : 'change',
    model         : null,

    getInitialState : function(){
        this.model = new this.Model();
        // enable owner references in the model to access component props
        this.model._owner = this;

        return this.model;
    },

    // reference global store to fix model's store locator
    getStore : function(){
        this.model._defaultStore;
    },

    componentDidMount : function(){
        var events = this.listenToState;
        events && this.listenTo( this.model, events, forceUpdate );
    },

    componentWillUnmount : function(){
        this.model._owner = null;
        this.model.stopListening();
    }
};

function createClass( spec ){
    var mixins = spec.mixins || ( spec.mixins = [] );

    var attributes = getModelAttributes( spec );
    if( attributes ){
        var BaseModel = spec.Model || Nested.Model;
        spec.Model    = BaseModel.extend( { defaults : attributes } );
    }

    if( spec.Model ) mixins.push( ModelState );

    if( spec.listenToProps ) mixins.unshift( ListenToProps );

    mixins.push( Events );

    var component  = React.createClass( spec );

    // attach lazily evaluated backbone View class
    var NestedReact = this;

    Object.defineProperty( component, 'View', {
        get : function(){
            return this._View || ( this._View = NestedReact._BaseView.extend( { reactClass : component } ) );
        }
    });

    return component;
}

function getModelAttributes( spec ){
    var attributes = null;

    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
        var mixin = spec.mixins[ i ];
        if( mixin.attributes ){
            attributes || ( attributes = {} );
            Object.assign( attributes, mixin.attributes );
        }
    }

    if( spec.attributes ){
        if( attributes ){
            Object.assign( attributes, spec.attributes );
        }
        else{
            attributes = spec.attributes;
        }
    }

    return attributes;
}

module.exports = createClass;
