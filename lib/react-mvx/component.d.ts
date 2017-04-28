/// <reference types="react" />
/**
 * React components
 */
import * as React from 'react';
import { Record, Store } from 'type-r';
import Link from './Link';
import { TypeSpecs } from './define';
export declare abstract class Component<P> extends React.Component<P, Record> {
    static state?: TypeSpecs | typeof Record;
    static store?: TypeSpecs | typeof Store;
    static props?: TypeSpecs;
    static autobind?: string;
    static context?: TypeSpecs;
    static childContext?: TypeSpecs;
    static pureRender?: boolean;
    private static propTypes;
    private static defaultProps;
    private static contextTypes;
    private static childContextTypes;
    static extend: (spec: object) => Component<any>;
    linkAt(key: string): Link<any>;
    linkAll(...keys: string[]): {
        [key: string]: Link<any>;
    };
    static define(protoProps: any, staticProps: any): typeof Component;
    readonly state: Record;
    readonly store?: Store;
    assignToState(x: any, key: any): void;
}
/**
 * ES5 components definition factory
 */
export declare function createClass(a_spec: any): Component<any>;
