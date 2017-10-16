/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
import { TypeSpecs } from './typeSpecs';
import { ComponentClass } from './common';
export interface PropsDefinition {
    pureRender?: boolean;
    props: TypeSpecs;
}
export interface PropsProto {
    pureRender?: boolean;
    _props?: TypeSpecs;
    _watchers?: any;
    _changeHandlers?: any;
    PropsChangeTokens?: any;
}
export default function onDefine(this: ComponentClass<PropsProto>, {props, pureRender}: PropsDefinition, BaseClass: ComponentClass<PropsProto>): void;
