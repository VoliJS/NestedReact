/// <reference types="react" />
import { ComponentClass as ReactComponentClass, Component } from 'react';
import { MixableConstructor, Messenger } from 'type-r';
export interface ComponentClass<Proto> extends ReactComponentClass, MixableConstructor {
    prototype: Proto & ComponentProto;
}
export declare type ComponentProto = Component & Messenger;
