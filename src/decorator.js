var React  = require( 'react' ),
    Nested = require( 'nestedtypes' );

Object.extend.attach( React.Component );
Object.assign( React.Component, Events );

React.Component.extend( {
    Model    : null,
    autobind : null,

    constructor : function( props ){
        React.Component.call( this, props );

        if( this.Model ){
            this.state = new this.Model();
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