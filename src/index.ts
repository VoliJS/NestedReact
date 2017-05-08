// Re-export react-mvx
import ReactMVx from './react-mvx'
const NestedReact = Object.create( ReactMVx );
export default NestedReact;
export * from './react-mvx'

// NestedReact backward compatibility layer
import ReactDOM from 'react-dom'
import Nested, { View, Record } from 'type-r'
import * as PropTypes from 'prop-types'

import subview from './view-element'
NestedReact.subview = subview;
export { subview }

import use from './component-view'

export { PropTypes };

let BaseView;

// export hook to override base View class used...
export function useView( View ){
    BaseView = use( View );
}

const { define } = NestedReact.Component;

NestedReact.Component.define = function( protoProps, staticProps ){
    this.View = BaseView.extend( { reactClass : this } );

    return define.call( this, protoProps, staticProps );
}

function defineBackboneProxy( Component ){
    
}

// Deprecated API for backward compatibility
const RecordProto : any = Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;

const CollectionProto : any = Record.Collection.prototype;
CollectionProto.hasLink = CollectionProto.linkContains;

useView( View );

// Extend react components to have backbone-style jquery accessors
const BackboneViewProps = {
    el  : { get : function(){ return ReactDOM.findDOMNode( this ) } },
    $el : { get : function(){ return Nested.$( this.el ) } },
    $   : { value : function( sel ){ return this.$el.find( sel ) } }
};

Object.defineProperties( NestedReact.Component.prototype, BackboneViewProps );
