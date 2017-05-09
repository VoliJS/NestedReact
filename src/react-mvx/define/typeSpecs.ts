import * as PropTypes from 'prop-types'
import { Record, tools } from 'type-r'

export interface TypeSpecs {
    [ name : string ] : Object | Function
}

export function collectSpecs( spec, name : string ) : TypeSpecs {
    var attributes = null;

    // Scan through local mixin, and gather specs. Refactor it later, it's not good. At all.
    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
        var mixin      = spec.mixins[ i ],
            mixinAttrs = mixin[ name ];

        if( mixinAttrs ){
            attributes || ( attributes = {} );
            tools.assign( attributes, mixinAttrs );
        }
    }

    // Merge it with local data.
    var specAttrs = spec[ name ];
    if( specAttrs ){
        if( attributes ){
            tools.assign( attributes, specAttrs );
        }
        else{
            attributes = specAttrs;
        }
    }

    return attributes;
}

export function compileSpecs( props : TypeSpecs ){
    const propTypes = {},
        // Create NestedTypes model definition to process props spec.
        modelProto = Record.defaults( props ).prototype;

    let defaults, watchers, changeHandlers;

    modelProto.forEachAttr( modelProto._attributes, ( spec, name : string ) => {
        // Skip auto-generated `id` attribute.
        if( name !== 'id' ){
            const { value, type, options } = spec;

            // Translate props type to the propTypes guard.
            propTypes[ name ] = translateType( type, options.isRequired );

            if( options._onChange ){
                watchers || ( watchers = {} );
                watchers[ name ] = toLocalWatcher( options._onChange );
            }

            // Handle listening to event maps...
            if( options.changeHandlers && options.changeHandlers.length ){
                changeHandlers || ( changeHandlers = {} );
                changeHandlers[ name ] = options.changeHandlers;
            }

            // Handle listening to props changes...
            if( options.changeEvents ){
                changeHandlers || ( changeHandlers = {} );
                const handlers = changeHandlers[ name ] || ( changeHandlers[ name ] = [] ),
                    changeEvents = typeof options.changeEvents === 'string' ? options.changeEvents : null;

                handlers.push( 
                    function( next, prev, component ){
                        prev && component.stopListening( prev );
                        next && component.listenTo( next, changeEvents || next._changeEventName, component.asyncUpdate );
                    }
                );
            }

            // If default value is explicitly provided...
            if( value !== void 0 ){
                //...append it to getDefaultProps function.
                defaults || ( defaults = {} );
                defaults[ name ] = spec.convert( value );
            }
        }
    });

    return { propTypes, defaults, watchers, changeHandlers };
}

function toLocalWatcher( ref ){
    return typeof ref === 'function' ? ref : function( value, name ){
        this[ ref ] && this[ ref ]( value, name );
    }
}

export class Node {}
export class Element {}

function translateType( Type : Function, isRequired : boolean ){
    const T = _translateType( Type );
    return isRequired ? T.isRequired : T;
}

declare global {
    interface NumberConstructor {
        integer : Function
    }
}

function _translateType( Type : Function ){
    switch( Type ){
        case Number :
        case Number.integer :
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

