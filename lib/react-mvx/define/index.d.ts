import { ComponentClass } from './common';
import { StoreDefinition, StoreProto } from './store';
import { StateDefinition, StateProto } from './state';
import { ContextDefinition, ContextProto } from './context';
import { PropsDefinition, PropsProto } from './props';
export interface ComponentDefinition extends StoreDefinition, StateDefinition, ContextDefinition, PropsDefinition {
}
export interface ComponentProto extends StoreProto, StateProto, ContextProto, PropsProto {
}
export default function onDefine(this: ComponentClass<ComponentProto>, definition: ComponentDefinition, BaseClass: ComponentClass<ComponentProto>): void;
export { Node, Element, TypeSpecs } from './typeSpecs';
export { EmptyPropsChangeTokensCtor } from './pureRender';
