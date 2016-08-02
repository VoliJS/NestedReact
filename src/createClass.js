var React      = require( 'react' ),
    Nested     = require( 'nestedtypes' ),
    pureRender = require( './purerender-mixin' ),
    propTypes  = require( './propTypes' );

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
        updateOn  = this.listenToProps;

    for( var prop in updateOn ){
        registerPropsListener( this, prevProps, prop, updateOn[ prop ] );
    }
}

var ListenToProps = {
    componentDidMount  : regHashPropsListeners,
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

var ModelState = {
    model         : null,

    _onChildrenChange : function(){
        forceUpdate.call( this );
    },

    componentWillMount : function(){
        this.model = this.props._keepState || new this.Model();
        return this.model;
    },

    componentDidMount : function(){
        this.model._owner = this;
    },

    // reference global store to fix model's store locator
    getStore : function(){
        return this.model._defaultStore;
    },

    componentWillUnmount : function(){
        this.model._owner = null;
    }
};

function createClass( spec ){
    var component = React.createClass( compileSpec( spec ) );

    // attach lazily evaluated backbone View class
    Object.defineProperty( component, 'View', {
        get : function(){
            return this._View || ( this._View = Nested._BaseView.extend( { reactClass : component } ) );
        }
    } );

    return component;
}

function compileSpec( spec ){
    var mixins = spec.mixins || ( spec.mixins = [] );

    // process context specs...
    var context = getTypeSpecs( spec, 'context' );
    if( context ){
        spec.contextTypes = propTypes.parseProps( context ).propTypes;
        delete spec.context;
    }

    var childContext = getTypeSpecs( spec, 'childContext' );
    if( childContext ){
        spec.childContextTypes = propTypes.parseProps( childContext ).propTypes;
        delete spec.childContext;
    }

    // process state spec...
    var attributes = getTypeSpecs( spec, 'attributes', 'state' );
    if( attributes ){
        var BaseModel = spec.Model || Nested.Model;
        spec.Model    = BaseModel.extend( { defaults : attributes } );
        delete spec.state;
    }

    if( spec.Model ) mixins.push( ModelState );

    // process props spec...
    var props = getTypeSpecs( spec, 'props' );

    if( props ){
        var parsedProps = propTypes.parseProps( props );

        spec.propTypes = parsedProps.propTypes;

        if( parsedProps.defaults ){
            spec.getDefaultProps = function(){
                return parsedProps.defaults;
            }
        }

        delete spec.props;
    }

    // process listenToProps spec
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

    // add Events capabilities
    mixins.push( Events );

    // compile pure render mixin
    if( spec.propTypes && spec.pureRender ){
        mixins.push( pureRender( spec.propTypes ) );
    }

    return spec;
}

function getTypeSpecs( spec, name1, name2 ){
    var attributes = null;

    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
        var mixin      = spec.mixins[ i ],
            mixinAttrs = mixin[ name1 ] || ( name2 && mixin[ name2 ] );

        if( mixinAttrs ){
            attributes || ( attributes = {} );
            Object.assign( attributes, mixinAttrs );
        }
    }

    var specAttrs = spec[ name1 ] || ( name2 && spec[ name2 ] );
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

module.exports = createClass;

var tools = Nested.tools;

Nested.Mixable.mixTo( React.Component );
React.Component.define = function( protoProps, staticProps ){
    var staticsDefinition = tools.getChangedStatics( this, 'state', 'props', 'context', 'childContext', 'listenToProps', 'listenToState', 'pureRender' ),
        definition = tools.assign( staticsDefinition, protoProps || {}, {
            properties : {
                View : function(){
                    return this._View || ( this._View = Nested._BaseView.extend( { reactClass : component } ) );
                }
            }
        } );

    Nested.Mixable.define.call( this, compileSpec( definition ), staticProps );

    return this;
}

React.Component.mixinRules({
    componentWillMount : 'reverse',
    componentDidMount : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate : 'some',
    componentWillUpdate : 'reverse',
    componentDidUpdate : 'reverse',
    componentWillUnmount : 'sequence',
});