/**
 * props compiler.
 * Translates `props` spec to `propTypes` and `getDefaultProps` function.
 */

var Nested = require( 'nestedtypes' ),
    React  = require( 'react' );

function parseProps( props ){
    var propTypes = {},
        defaults,
        // Create NestedTypes model definition to process props spec.
        modelProto = Nested.Model.defaults( props ).prototype;

    modelProto.forEachAttr( modelProto._attributes, function( spec, name ){
        // Skip auto-generated `id` attribute.
        if( name !== 'id' ){
            // Translate props type to the propTypes guard.
            propTypes[ name ] = translateType( spec.type );

            // If default value is explicitly provided...
            if( spec.value !== void 0 ){
                //...append it to getDefaultProps function.
                defaults || ( defaults = {} );
                defaults[ name ] = spec.convert( spec.value );
            }
        }
    });

    return {
        propTypes : propTypes,
        defaults : defaults
    };
}

var PropTypes = React.PropTypes;

function Node(){}
function Element(){}

function translateType( Type ){
    switch( Type ){
        case Number :
        case Integer :
            return PropTypes.number;
        case String :
            return PropTypes.string;
        case Boolean :
            return PropTypes.bool;
        case Array :
            return PropTypes.array;
        case Function :
            return PropTypes.func;
        case Object :
            return PropTypes.object;
        case Node :
            return PropTypes.node;
        case Element :
            return PropTypes.element;
        case void 0 :
        case null :
            return PropTypes.any;
        default:
            return PropTypes.instanceOf( Type );
    }
}

exports.Node = Node;
exports.Element = Element;
exports.parseProps = parseProps;