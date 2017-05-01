import React from './react-mvx'
export default React;
export * from './react-mvx'

import ReactDOM from 'react-dom'
import { $, View, Record } from 'type-r'

import subview from './view-element'
export { subview }

import use from './component-view'

let BaseView;

// export hook to override base View class used...
export function useView( View ){
    BaseView = use( View );
}

const { define } = React.Component;

React.Component.define = function define( protoProps, staticProps ){
    defineBackboneProxy( this );

    return define.call( this, protoProps, staticProps );
}

function defineBackboneProxy( Component ){
    Object.defineProperty( Component, 'View', {
        get(){
            return this._View || (
                this._View = BaseView.extend( { reactClass : Component } )
            );
        }
    } );
}

// Deprecated API for backward compatibility
const RecordProto : any = Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;

useView( View );

// Extend react components to have backbone-style jquery accessors
const BackboneViewProps = {
    el  : { get : () => ReactDOM.findDOMNode( this ) },
    $el : { get : () => $( this.el ) },
    $   : { value : sel => this.$el.find( sel ) }
};

Object.defineProperties( React.Component.prototype, BackboneViewProps );
