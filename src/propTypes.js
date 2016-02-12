var Nested = require( 'nestedtypes' );

function parseProps( props ){
    var propTypes = {},
        defaults, defaultsProto,
        modelProto = Nested.Model.defaults( props ).prototype;

    modelProto.forEachAttr( modelProto.__attributes, function( spec, name ){
        propTypes[ name ] = translateType( spec.type );
        if( spec.value !== void 0 ){
            defaults || ( defaults = {} );
            defaults[ name ] = props[ name ];
        }
    });

    if( defaults ){
        defaultsProto = Nested.Model.defaults( defaults ).prototype;
    }

    return {
        propTypes : propTypes,
        model : defaultsProto
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