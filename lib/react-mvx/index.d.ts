/// <reference types="react" />
import * as React from 'react';
import { define, mixins, mixinRules, ChainableAttributeSpec } from 'type-r';
import { Node, Element } from './define';
import Link from './link';
import { Component } from './component';
interface ReactMVx {
    default: ReactMVx;
    define: typeof define;
    mixins: typeof mixins;
    mixinRules: typeof mixinRules;
    Component: typeof Component;
    Link: typeof Link;
    Node: ChainableAttributeSpec;
    Element: ChainableAttributeSpec;
    assignToState(key: string): any;
}
declare const ReactMVx: ReactMVx & typeof React;
declare const assignToState: (key: string) => (prop: any) => void;
export default ReactMVx;
export { define, mixins, Node, Element, Link, Component, assignToState };
