// Re-export react-mvx
import ReactMVx from './react-mvx';
var NestedReact = Object.create(ReactMVx);
export default NestedReact;
export * from './react-mvx';
// NestedReact backward compatibility layer
import * as ReactDOM from 'react-dom';
import Nested, { View, Record } from 'type-r';
import * as PropTypes from 'prop-types';
import subview from './view-element';
NestedReact.subview = subview;
export { subview };
import use from './component-view';
import createClass from './createClass';
Object.defineProperty(NestedReact, 'createClass', { value: createClass });
Object.defineProperty(NestedReact, 'PropTypes', { value: PropTypes });
export { PropTypes, createClass };
var BaseView;
// export hook to override base View class used...
export function useView(View) {
    BaseView = use(View);
}
var onDefine = NestedReact.Component.onDefine;
NestedReact.Component.onDefine = function (definitions, BaseClass) {
    this.View = BaseView.extend({ reactClass: this });
    return onDefine.call(this, definitions, BaseClass);
};
// Deprecated API for backward compatibility
var RecordProto = Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;
var CollectionProto = Record.Collection.prototype;
CollectionProto.hasLink = CollectionProto.linkContains;
useView(View);
// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el: { get: function () { return ReactDOM.findDOMNode(this); } },
    $el: { get: function () { return Nested.$(this.el); } },
    $: { value: function (sel) { return this.$el.find(sel); } }
};
Object.defineProperties(NestedReact.Component.prototype, BackboneViewProps);
//# sourceMappingURL=index.js.map