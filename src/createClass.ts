import { Component } from './react-mvx'

const dontAutobind = [
    'State', 'Store', 'constructor', 
    'componentWillMount','componentDidMount','componentWillReceiveProps','shouldComponentUpdate',
    'componentWillUpdate','componentDidUpdate','componentWillUnmount',
    'render', 'getDefaultProps', 'getChildContext'
];

/**
 * ES5 components definition factory
 */
export default function createClass< P, S>( { statics, ...a_spec } : React.ComponentSpec<P, S> ) : React.ClassicComponentClass<P>{
    // Gather all methods to pin them to `this` later.
    const methods = [];

    const Subclass : any = Component.extend({
        // Override constructor to autobind all the methods...
        constructor(){
            Component.apply( this, arguments );

            for( let method of methods ){
                this[ method ] = this[ method ].bind( this );
            }
        },
        ...a_spec
    }, statics );

    // Need to bind methods from mixins as well, so populate it here.
    const Proto = Subclass.prototype;
    for( let key in Proto ){
        if( Proto.hasOwnProperty( key ) && dontAutobind.indexOf( key ) === -1 && typeof Proto[ key ] === 'function' ){
            methods.push( key );
        }
    }

    return Subclass;
}