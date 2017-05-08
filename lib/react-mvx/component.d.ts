/// <reference types="react" />
/**
 * React components
 */
import * as React from 'react';
import { Record, Store } from 'type-r';
import Link from './Link';
import { TypeSpecs } from './define';
export declare class Component<P> extends React.Component<P, Record> {
    static state?: TypeSpecs | typeof Record;
    static store?: TypeSpecs | typeof Store;
    static props?: TypeSpecs;
    static autobind?: string;
    static context?: TypeSpecs;
    static childContext?: TypeSpecs;
    static pureRender?: boolean;
    private _disposed;
    private static propTypes;
    private static defaultProps;
    private static contextTypes;
    private static childContextTypes;
    static extend: (spec: object, statics?: object) => Component<any>;
    linkAt(key: string): Link<any>;
    linkAll(...keys: string[]): {
        [key: string]: Link<any>;
    };
    static define(protoProps: any, staticProps: any): typeof Component;
    readonly state: Record;
    readonly store?: Store;
    assignToState(x: any, key: any): void;
    isMounted: () => boolean;
}
/**
 * ES5 components definition factory
 */
export declare function createClass<P, S>({statics, ...a_spec}: React.ComponentSpec<P, S>): React.ClassicComponentClass<P>;
