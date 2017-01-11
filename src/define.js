var Nested = require( 'nestedtypes' ),
    React = require( 'react' ),
    pureRender = require( './purerender-mixin' ),
    propTypes  = require( './propTypes' ),
    tools = Nested.tools;

module.exports = function processSpec( spec, a_baseProto ){
    var baseProto = a_baseProto || {};
    spec.mixins || ( spec.mixins = [] );

    processStore( spec, baseProto );
    processState( spec, baseProto );
    processContext( spec, baseProto );
    processProps( spec, baseProto );
    processListenToProps( spec, baseProto );
    processAutobind( spec, baseProto );

    spec.mixins.push( EventsMixin );

    return spec;
};

/***
 * Throttled asynchronous version of forceUpdate.
 */
var _queue = null;

function asyncUpdate(){
    // For some weird reason async update doesn't work. Input's state is being messed up.
    // Just call forceUpdate for now.
    this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
}

function returnFalse(){ return false; }

/**
 * Mixin which is attached to all components.
 */
var EventsMixin = tools.assign( {
    componentWillUnmount : function(){
        // Prevent memory leaks when working with events.
        this.off();
        this.stopListening();

        // Mark component as disposed.
        this._disposed = true;
    },

    asyncUpdate : asyncUpdate,

    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     *
     * @param fun - takes
     */
    transaction : function( fun ){
        var shouldComponentUpdate = this.shouldComponentUpdate,
              isRoot = shouldComponentUpdate !== returnFalse;

        if( isRoot ){
            this.shouldComponentUpdate = returnFalse;
        }

        fun( this.props, this.state );

        if( isRoot ){
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    },

    deferRender : function(){
        var $ = Nested.$,
            promise = $.when.apply( $, arguments ),
            originalRender = this.render;

        this.render = this.loading || defaultLoading;

        var _this = this;
        promise.always( function(){
            _this.render = originalRender;
            _this.asyncUpdate();
        } );

        return promise;
    }
}, Nested.Events );

function defaultLoading() {
    return React.createElement("div", null);
}

/***
 * Autobinding
 */
function processAutobind( spec, baseProto ){
    if( spec.autobind ){
        spec._autobind = spec.autobind.split( /\s+/ ).concat( baseProto._autobind || [] );
        spec.mixins.push( AutoBindMixin );
        delete spec.autobind;
    }
}

var AutoBindMixin = {
    componentWillMount : function(){
        var autobind = this._autobind;
        
        for( var i = 0; i < autobind.length; i++ ){
            var name = autobind[ i ];
            this[ name ] = this[ name ].bind( this );
        }
    }
};

function processContext( spec, baseProto ){
    // process context specs...
    var context = getTypeSpecs( spec, 'context' );
    if( context ){
        spec._context = tools.defaults( context, baseProto._context || {} );
        spec.contextTypes = propTypes.parseProps( context ).propTypes;
        delete spec.context;
    }

    var childContext = getTypeSpecs( spec, 'childContext' );
    if( childContext ){
        spec._childContext = tools.defaults( childContext, baseProto._childContext || {} );
        spec.childContextTypes = propTypes.parseProps( childContext ).propTypes;
        delete spec.childContext;
    }
}

// Store spec.

function processStore( spec, baseProto ){
    var store = getTypeSpecs( spec, 'store' );
    if( store ){
        delete spec.store;

        if( store instanceof Nested.Store ){
            // Direct reference to an existing store. Put it to the prototype.
            spec.store = store;
            spec.mixins.push( ExternalStoreMixin );
        }
        else {
            spec.Store = store;
            spec.mixins.push( InternalStoreMixin );
            spec.mixins.push( UpdateOnNestedChangesMixin );
        }

        spec.mixins.push( ExposeStoreMixin );
    }
}

var UpdateOnNestedChangesMixin = {
    _onChildrenChange : function(){},

    componentDidMount : function(){
        this._onChildrenChange = this.asyncUpdate;
    }
};

/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext : {
        _nestedStore : Nested.Store
    },

    getChildContext : function(){
        return { _nestedStore : this.store };
    },

    getStore : function(){
        return this.store;
    }
};

/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
var ExternalStoreMixin = {
    componentDidMount : function(){
        // Start UI updates on state changes.
        this.listenTo( this.store, 'change', this.asyncUpdate );
    }
};

var InternalStoreMixin = {
    componentWillMount : function(){
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },

    // Will be called by the store when the lookup will fail.
    get : function( key ){
        // Ask upper store.
        var store = ModelStateMixin.getStore.call( this, key );
        return store && store.get( key );
    },

    componentWillUnmount : function(){
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = null;
    }
};

/*****************
 * State
 */
function processState( spec, baseProto ){
    // process state spec...
    var attributes = getTypeSpecs( spec, 'state' ) || getTypeSpecs( spec, 'attributes' );
    if( attributes || spec.Model || baseProto.Model ){
        var BaseModel = baseProto.Model || spec.Model || Nested.Model;
        spec.Model    = attributes ? (
            typeof attributes === 'function' ? attributes : BaseModel.extend( { defaults : attributes } )
        ): BaseModel;

        spec.mixins.push( ModelStateMixin );
        spec.mixins.push( UpdateOnNestedChangesMixin );

        delete spec.state;
        delete spec.attributes;
    }
}

var ModelStateMixin = {
    model         : null,

    componentWillMount : function(){
        var state = this.state = this.model = this.props._keepState || new this.Model();
        state._owner = this;
        state._ownerKey = 'state';
    },

    context : {
        _nestedStore : Nested.Store
    },

    // reference global store to fix model's store locator
    getStore : function(){
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;

        return  ( ( context = this.context ) && context._nestedStore ) ||
                ( ( state = this.state ) && state._defaultStore );
    },

    componentWillUnmount : function(){
        // Release the state model.
        this._preventDispose /* hack for component-view to preserve the state */ || this.model.dispose();
    }
};

function processProps( spec, baseProto ){
    // process props spec...
    var props = getTypeSpecs( spec, 'props' );

    if( props ){
        spec._props = tools.defaults( props, baseProto._props || {} );
        var parsedProps = propTypes.parseProps( props );

        spec.propTypes = parsedProps.propTypes;

        if( parsedProps.defaults ){
            spec.getDefaultProps = function(){
                return parsedProps.defaults;
            }
        }

        delete spec.props;
    }

    // compile pure render mixin
    if( spec.propTypes && ( spec.pureRender || baseProto.pureRender ) ){
        spec.mixins.push( pureRender( spec.propTypes ) );
    }
}

function processListenToProps( spec, baseProto ){
    // process listenToProps spec
    var listenToProps = spec.listenToProps;
    if( listenToProps ){
        if( typeof listenToProps === 'string' ){
            spec._listenToPropsArray = listenToProps.split( /\s+/ ).concat( baseProto._listenToPropsArray || [] );
            spec.mixins.unshift( ListenToPropsArrayMixin );
        }
        else{
            spec._listenToPropsHash = tools.defaults( listenToProps, baseProto._listenToPropsHash || {} );
            spec.mixins.unshift( ListenToPropsMixin );
        }

        delete spec.listenToProps; 
    }
}

var ListenToPropsMixin = {
    componentDidMount  : regHashPropsListeners,
    componentDidUpdate : regHashPropsListeners
};

function regHashPropsListeners( a_prevProps ){
    var prevProps = a_prevProps || {},
        updateOn  = this._listenToPropsHash;

    for( var prop in updateOn ){
        registerPropsListener( this, prevProps, prop, updateOn[ prop ] );
    }
}

var ListenToPropsArrayMixin = {
    componentDidMount  : regArrayPropListeners,
    componentDidUpdate : regArrayPropListeners
};

function regArrayPropListeners( a_prevProps ){
    var prevProps = a_prevProps || {},
        updateOn  = this._listenToPropsArray;

    for( var i = 0; i < updateOn.length; i++ ){
        registerPropsListener( this, prevProps, updateOn[ i ] )
    }
}

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
                component.listenTo( emitter, events || emitter._changeEventName, asyncUpdate );
            }
        }
    }
}

function getTypeSpecs( spec, name ){
    var attributes = null;

    // Scan through local mixin, and gather specs. Refactor it later, it's not good. At all.
    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
        var mixin      = spec.mixins[ i ],
            mixinAttrs = mixin[ name ];

        if( mixinAttrs ){
            attributes || ( attributes = {} );
            Object.assign( attributes, mixinAttrs );
        }
    }

    // Merge it with local data.
    var specAttrs = spec[ name ];
    if( specAttrs ){
        if( attributes ){
            Object.assign( attributes, specAttrs );
        }
        else{
            attributes = specAttrs;
        }
    }

    return attributes;
}