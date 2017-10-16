import * as PropTypes from 'prop-types'
import { Record, tools, AnyType, ChangeHandler } from 'type-r'
import { ComponentProto } from './common'

export interface TypeSpecs {
    [ name : string ] : object | Function
}

export function compileSpecs( props : TypeSpecs ){
    const propTypes = {},
        // Create NestedTypes model definition to process props spec.
        modelProto = Record.defaults( props ).prototype;

    let defaults,
        watchers : { [ name : string ] : PropWatcher },
        changeHandlers : { [ name : string ] : ChangeHandler[] };

    modelProto.forEachAttr( modelProto._attributes, ( spec : AnyType, name : string ) => {
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
                    function( next, prev, component : any ){
                        prev && component.stopListening( prev );
                        next && component.listenTo( next, changeEvents || next._changeEventName, component.asyncUpdate );
                    }
                );
            }

            // If default value is explicitly provided...
            if( value !== void 0 ){
                //...append it to getDefaultProps function.
                defaults || ( defaults = {} );
                defaults[ name ] = spec.convert( value, void 0, null, {} );
            }
        }
    });

    return { propTypes, defaults, watchers, changeHandlers };
}

type PropWatcher = ( this : ComponentProto, propValue : any, propName : string ) => void

function toLocalWatcher( ref ) : PropWatcher {
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

