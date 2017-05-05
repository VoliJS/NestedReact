// Re-export react-mvx
import React from './react-mvx'
export default React;
export * from './react-mvx'

// NestedReact backward compatibility layer
import ReactDOM from 'react-dom'
import Nested, { View, Record } from 'type-r'
import * as NewPropTypes from 'prop-types'

import subview from './view-element'
export { subview }

import use from './component-view'

export const PropTypes = ( React as any ).PropTypes || NewPropTypes;

let BaseView;

// export hook to override base View class used...
export function useView( View ){
    BaseView = use( View );
}

const { define } = React.Component;

React.Component.define = function( protoProps, staticProps ){
    this.View = BaseView.extend( { reactClass : this } );

    return define.call( this, protoProps, staticProps );
}

function defineBackboneProxy( Component ){
    
}

// Deprecated API for backward compatibility
const RecordProto : any = Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;

useView( View );

// Extend react components to have backbone-style jquery accessors
const BackboneViewProps = {
    el  : { get : () => ReactDOM.findDOMNode( this ) },
    $el : { get : () => Nested.$( this.el ) },
    $   : { value : sel => this.$el.find( sel ) }
};

Object.defineProperties( React.Component.prototype, BackboneViewProps );
