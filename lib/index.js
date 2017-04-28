var _this = this;
import React from './react-mvx';
export default React;
export * from './react-mvx';
import ReactDOM from 'react-dom';
import { $, View } from 'type-r';
import subview from './view-element';
export { subview };
import use from './component-view';
var BaseView;
// export hook to override base View class used...
export function useView(View) {
    BaseView = use(View);
}
var define = React.Component.define;
React.Component.define = function (protoProps, staticProps) {
    defineBackboneProxy(this);
    return define.call(this, protoProps, staticProps);
};
function defineBackboneProxy(Component) {
    Object.defineProperty(Component, 'View', {
        get: function () {
            return this._View || (this._View = BaseView.extend({ reactClass: Component }));
        }
    });
}
useView(View);
// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el: { get: function () { return ReactDOM.findDOMNode(_this); } },
    $el: { get: function () { return $(_this.el); } },
    $: { value: function (sel) { return _this.$el.find(sel); } }
};
Object.defineProperties(React.Component.prototype, BackboneViewProps);
//# sourceMappingURL=index.js.map