import { ComponentClass } from './common'
import { Messenger } from 'type-r'

import onDefineStore, { StoreDefinition, StoreProto } from './store'
import onDefineState, { StateDefinition, StateProto } from './state'
import onDefineContext, { ContextDefinition, ContextProto } from './context'
import onDefineProps, { PropsDefinition, PropsProto } from './props'

export interface ComponentDefinition extends StoreDefinition, StateDefinition, ContextDefinition, PropsDefinition {}
export interface ComponentProto extends StoreProto, StateProto, ContextProto, PropsProto {}

export default function onDefine( this : ComponentClass<ComponentProto>, definition : ComponentDefinition, BaseClass : ComponentClass<ComponentProto> ){
    // Initialize mixins placeholder...
    onDefineStore.call( this, definition, BaseClass );
    onDefineState.call( this, definition, BaseClass );
    onDefineContext.call( this, definition, BaseClass );
    onDefineProps.call( this, definition, BaseClass );

    Messenger.onDefine.call( this, definition, BaseClass );
};

export { Node, Element, TypeSpecs } from './typeSpecs'
export { EmptyPropsChangeTokensCtor } from './pureRender'