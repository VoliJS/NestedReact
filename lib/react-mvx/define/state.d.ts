/*****************
 * State
 */
import { Record, Store } from 'type-r';
import { ComponentClass } from './common';
export interface StateDefinition {
    state?: object | typeof Record;
    State?: typeof Record;
}
export interface StateProto {
    State?: typeof Record;
}
export default function process(this: ComponentClass<StateProto>, definition: StateDefinition, BaseComponentClass: ComponentClass<StateProto>): void;
export declare const StateMixin: {
    _initializeState(): void;
    context: {
        _nestedStore: typeof Store;
    };
    getStore(): any;
    componentWillUnmount(): void;
};
export declare const UpdateOnNestedChangesMixin: {
    _onChildrenChange(): void;
    componentDidMount(): void;
};
