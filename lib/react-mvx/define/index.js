import { Messenger } from 'type-r';
import onDefineStore from './store';
import onDefineState from './state';
import onDefineContext from './context';
import onDefineProps from './props';
export default function onDefine(definition, BaseClass) {
    // Initialize mixins placeholder...
    onDefineStore.call(this, definition, BaseClass);
    onDefineState.call(this, definition, BaseClass);
    onDefineContext.call(this, definition, BaseClass);
    onDefineProps.call(this, definition, BaseClass);
    Messenger.onDefine.call(this, definition, BaseClass);
}
;
export { Node, Element } from './typeSpecs';
export { EmptyPropsChangeTokensCtor } from './pureRender';
//# sourceMappingURL=index.js.map