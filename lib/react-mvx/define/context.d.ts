import { TypeSpecs } from './typeSpecs';
import { ComponentClass } from './common';
export interface ContextDefinition {
    context: TypeSpecs;
    childContext: TypeSpecs;
}
export interface ContextProto {
    _context: TypeSpecs;
    _childContext: TypeSpecs;
}
export default function onDefine(this: ComponentClass<ContextProto>, {context, childContext}: ContextDefinition, BaseClass: ComponentClass<ContextProto>): void;
