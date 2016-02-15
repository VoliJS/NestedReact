/**
 * ES6 class Decorator, design based on base class
 * (trying to manage without mixins).
 *
 * TODO: What to do with inheritance?
 * - state: extend attributes? Common sense tells us we need to inherit model.
 * - props: inherit props? Likely, we need it too.
 * Ok, so we inherit both props and state attributes.
 * Both cases will be handled by model inheritance.
 */

var React  = require( 'react' ),
    Nested = require( 'nestedtypes' );

Object.extend.attach( React.Component );
Object.assign( React.Component.prototype, Events );

var Component = React.Component.extend( {
    Model    : null,
    autobind : null,
    listenToProps : null,

    constructor : function( props ){
        React.Component.call( this, props );

        if( this.Model ){
            this.state = this.model = new this.Model();
            this.model._owner = this;
        }

        var autobind = this.autobind;
        if( autobind ){
            for( var i = 0; i < autobind.length; i++ ){
                var name = autobind[ i ],
                    fun  = this[ name ];

                if( fun ){
                    this[ name ] = fun.bind( this );
                }
            }
        }
    },

    getStore : function(){
        return this.model._defaultStore;
    },

    componentWillReceiveProps : function( nextProps ){
        var updateOn = this.listenToProps;

        // if there are any subscription to prop changes,
        // make sure that it's up to date.
        if( updateOn ){
            var props = this.props;

            for( var i = 0; i < updateOn.length; i++ ){
                var name = updateOn[ i ],
                    prev = props[ name ],
                    next = nextProps[ name ];

                if( prev !== next ){
                    prev && this.stopListening( prev );
                    next && this.listenTo( next, next.triggerWhenChanged, forceUpdate );
                }
            }
        }
    },

    componentDidMount : function(){
        var model = this.model,
            updateOn = this.listenToProps;

        // If component has state, subscribe for state changes...
        // Likely it has, otherwise stateless component will be used.
        if( model ){
            this.listenTo( model, 'change', forceUpdate );
        }

        // If we're watching for prop changes, take care.
        if( updateOn ){
            var props    = this.props;

            for( var i = 0; i < updateOn.length; i++ ){
                var emitter = props[ updateOn[ i ] ];
                emitter && this.listenTo( emitter, emitter.triggerWhenChanged, forceUpdate );
            }
        }
    },

    componentWillUnmount : function(){
        // remove owner from the model...
        var model = this.model;
        model && ( model._owner = null );

        //TODO: Should I call dispose to our state?

        // unsubscribe from all events...
        this.stopListening();
    }
} );

function convertType( Type ){
    switch( Type ){
        case String :
            return PropTypes.string;
        case Number :
            return PropTypes.number;
        case Integer :
            return PropTypes.number;
        case Boolean :
            return PropTypes.bool;
        case Function :
            return PropTypes.func;
        case Array :
            return PropTypes.array;
        case Object :
            return PropTypes.object;
        default :
            return Type.prototype ? PropTypes.instanceOf( Type ) : Type;
    }
}

function parseProps( spec ){
    var PropsModel   = Model.defaults( spec ),
        propTypes    = {},
        defaultProps = {};

    PropsModel.prototype.forEachAttr( PropsModel.prototype.__attributes, function( spec, name ){
        if( spec.value ){
            defaultProps[ name ] = spec.value;
        }

        propTypes[ name ] = convertType( spec.type );
    } );
}

React.define = function( options ){
    return function( Class ){
        var spec = {};

        if( options.props ){
            var propSpec       = parseProps( options.props );
            Class.propTypes    = propSpec.propTypes;
            Class.defaultProps = propSpec.defaultProps;
        }

        if( options.autobind ){
            spec.autobind = options.autobind.split( /\s+/ );
        }


        var mixins = options.mixins || [];
        if( options.state ){
            mixins.push( StateMixin );
        }

        attachMixins( Class.prototype, mixins );
    }
};