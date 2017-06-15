/**
 * React components
 */

import * as React from 'react'
import { Record, Store, extendable, mergeProps, mixinRules, tools, Mixable } from 'type-r'
import Link from './Link'
import processSpec, { TypeSpecs } from './define'

const reactMixinRules : any = { // Can't type it precisely because of weird type problem in NestedReact and NestedTypes
    componentWillMount        : 'reverse',
    componentDidMount         : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate     : 'some',
    componentWillUpdate       : 'reverse',
    componentDidUpdate        : 'reverse',
    componentWillUnmount      : 'sequence',
    state                     : 'merge',
    store                     : 'merge',
    props                     : 'merge',
    context                   : 'merge',
    childContext              : 'merge',
    getChildContext           : 'mergeSequence'
};

@extendable
@mixinRules( reactMixinRules )
export class Component<P> extends React.Component<P, Record> {
    static state? : TypeSpecs | typeof Record
    static store? : TypeSpecs | typeof Store
    static props? : TypeSpecs
    static context? : TypeSpecs
    static childContext? : TypeSpecs
    static pureRender? : boolean

    private _disposed : boolean
    private static propTypes: any;
    private static defaultProps: any;
    private static contextTypes : any;
    private static childContextTypes : any;
    
    static extend : ( spec : object, statics? : object ) => Component< any >

    linkAt( key : string ) : Link<any> {
        // Quick and dirty hack to suppres type error - refactor later.
        return ( this.state as any ).linkAt( key );
    }

    linkAll( ...keys : string[] ) : { [ key : string ] : Link<any> }
    linkAll(){
        // Quick and dirty hack to suppres type error - refactor later.
        const { state } = this as any;
        return state.linkAll.apply( state, arguments );
    }

    linkPath( path : string ) : Link<any> {
        return ( this.state as any ).linkPath( path );
    }

    get links(){
        return ( this.state as any )._links;
    }

    static define( protoProps, staticProps ){
        var BaseClass          = tools.getBaseClass( this ),
            staticsDefinition = tools.getChangedStatics( this, 'state', 'store', 'props', 'context', 'childContext', 'pureRender' ),
            combinedDefinition = tools.assign( staticsDefinition, protoProps || {} );

        var definition = processSpec( combinedDefinition, this.prototype );

        const { getDefaultProps, propTypes, contextTypes, childContextTypes, ...protoDefinition } = definition;

        if( getDefaultProps ) this.defaultProps = definition.getDefaultProps();
        if( propTypes ) this.propTypes = propTypes;
        if( contextTypes ) this.contextTypes = contextTypes;
        if( childContextTypes ) this.childContextTypes = childContextTypes;

        Mixable.define.call( this, protoDefinition, staticProps );

        return this;
    }

    readonly state : Record
    readonly store? : Store

    assignToState( x, key ){
        this.state.assignFrom({ [ key ] : x });
    }

    isMounted : () => boolean
}

// Looks like React guys _really_ want to deprecated it. But no way.
// We will work around their attempt.
Object.defineProperty( Component.prototype, 'isMounted', {
    value : function isMounted(){
        return !this._disposed;
    }
})