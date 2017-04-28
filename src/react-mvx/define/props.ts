/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */

import { collectSpecs, compileSpecs, TypeSpecs } from './typeSpecs'
import createPureRenderMixin from './pureRender'

export interface PropsMetadata {
    pureRender? : boolean
    _props? : TypeSpecs
    _listenToPropsArray? : string[]
    _listenToPropsHash? : { [ propName : string ] : Object | string }
}

export default function process( spec, { pureRender, _props = {}, _listenToPropsArray = [], _listenToPropsHash = {} } : PropsMetadata ){
    // process props spec...
    const props = collectSpecs( spec, 'props' );
    if( props ){
        const allProps = spec._props = { ..._props, ...props };

        const { propTypes, defaults, watchers, changeHandlers } = compileSpecs( allProps );
        spec.propTypes = propTypes;

        if( defaults ) spec.getDefaultProps = () => defaults;

        if( watchers ){
            spec.mixins.unshift( WatchersMixin );
            spec._watchers = watchers;
        }

        if( changeHandlers ){
            spec.mixins.unshift( ChangeHandlersMixin );
            spec._changeHandlers = changeHandlers;
        }

        delete spec.props;
    }

    // compile pure render mixin
    if( spec._props && ( spec.pureRender || pureRender ) ){
        spec.mixins.push( createPureRenderMixin( spec._props ) );
    }
}

/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
const ChangeHandlersMixin = {
    componentDidMount  : handleChanges,
    componentDidUpdate : handleChanges
};

function handleChanges( prev = {} ){
    const { _changeHandlers, props } = this;
    
    for( let name in _changeHandlers ){
        if( prev[ name ] !== props[ name ] ){
            for( let handler of _changeHandlers[ name ] ){
                handler( props[ name ], prev[ name ], this );
            }
        }
    }
}

/**
 * Watchers works on props replacement and fires _before_ any change will be applied and UI is updated.
 * Fired in componentWillMount as well, which makes it a nice way to sync state from props.
 */
const WatchersMixin = {
    componentWillReceiveProps( next ){
        const { _watchers, props } = this;

        for( let name in _watchers ){
            if( next[ name ] !== props[ name ] ){
                _watchers[ name ].call( this, next[ name ], name );
            }        
        }
    },

    componentWillMount(){
        const { _watchers, props } = this;

        for( let name in _watchers ){
            _watchers[ name ].call( this, props[ name ], name );
        }
    }
}