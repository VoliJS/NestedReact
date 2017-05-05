var _this = this;
// Re-export react-mvx
import React from './react-mvx';
export default React;
export * from './react-mvx';
// NestedReact backward compatibility layer
import ReactDOM from 'react-dom';
import Nested, { View, Record } from 'type-r';
import * as NewPropTypes from 'prop-types';
import subview from './view-element';
export { subview };
import use from './component-view';
export var PropTypes = React.PropTypes || NewPropTypes;
var BaseView;
// export hook to override base View class used...
export function useView(View) {
    BaseView = use(View);
}
var define = React.Component.define;
React.Component.define = function (protoProps, staticProps) {
    this.View = BaseView.extend({ reactClass: this });
    return define.call(this, protoProps, staticProps);
};
function defineBackboneProxy(Component) {
}
// Deprecated API for backward compatibility
var RecordProto = Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;
useView(View);
// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el: { get: function () { return ReactDOM.findDOMNode(_this); } },
    $el: { get: function () { return Nested.$(_this.el); } },
    $: { value: function (sel) { return _this.$el.find(sel); } }
};
Object.defineProperties(React.Component.prototype, BackboneViewProps);
//# sourceMappingURL=index.js.map