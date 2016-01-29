var React  = require( 'react' ),
    Nested = require( 'nestedtypes' ),
    pureRender = require( './purerender-mixin' );

function forceUpdate(){ this.forceUpdate(); }

var Events = Object.assign( {
    componentWillUnmount : function(){
        this.stopListening();
    }
}, Nested.Events );

function registerPropsListener( component, prevProps, name, events ){
    var prevEmitter = prevProps[ name ],
        emitter     = component.props[ name ];

    if( prevEmitter !== emitter ){
        prevEmitter && component.stopListening( prevEmitter );

        if( emitter ){
            if( typeof events === 'object' ){
                component.listenTo( emitter, events );
            }
            else{
                component.listenTo( emitter, events || emitter.triggerWhenChanged, forceUpdate );
            }
        }
    }
}

function regHashPropsListeners( a_prevProps ){
    var prevProps = a_prevProps || {},
        updateOn = this.listenToProps;

    for( var prop in updateOn ){
        registerPropsListener( this, prevProps, prop, updateOn[ prop ] );
    }
}

var ListenToProps = {
    componentDidMount : regHashPropsListeners,
    componentDidUpdate : regHashPropsListeners
};

function regArrayPropListeners( a_prevProps ){
    var prevProps = a_prevProps || {},
        updateOn  = this.listenToProps;

    for( var i = 0; i < updateOn.length; i++ ){
        registerPropsListener( this, prevProps, updateOn[ i ] )
    }
}

var ListenToPropsArray = {
    componentDidMount  : regArrayPropListeners,
    componentDidUpdate : regArrayPropListeners
};

function _mountState(){
    var events = this.listenToState;
    events && this.listenTo( this.model, events, forceUpdate );
}

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

    _mountState : _mountState,

    componentDidMount : _mountState,

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

    var listenToProps = spec.listenToProps;
    if( listenToProps ){
        if( typeof listenToProps === 'string' ){
            spec.listenToProps = listenToProps.split( ' ' );
            mixins.unshift( ListenToPropsArray );
        }
        else{
            mixins.unshift( ListenToProps );
        }
    }

    mixins.push( Events );

    if( spec.propTypes && spec.pureRender ){
        mixins.push( pureRender( spec.propTypes ) );
    }

    var component = React.createClass( spec );

    // attach lazily evaluated backbone View class
    var NestedReact = this;

    Object.defineProperty( component, 'View', {
        get : function(){
            return this._View || ( this._View = NestedReact._BaseView.extend( { reactClass : component } ) );
        }
    } );

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
