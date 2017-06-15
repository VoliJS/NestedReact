/**
 * React components
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { extendable, mixinRules, tools, Mixable } from 'type-r';
import processSpec from './define';
var reactMixinRules = {
    componentWillMount: 'reverse',
    componentDidMount: 'reverse',
    componentWillReceiveProps: 'reverse',
    shouldComponentUpdate: 'some',
    componentWillUpdate: 'reverse',
    componentDidUpdate: 'reverse',
    componentWillUnmount: 'sequence',
    state: 'merge',
    store: 'merge',
    props: 'merge',
    context: 'merge',
    childContext: 'merge',
    getChildContext: 'mergeSequence'
};
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.linkAt = function (key) {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAt(key);
    };
    Component.prototype.linkAll = function () {
        // Quick and dirty hack to suppres type error - refactor later.
        var state = this.state;
        return state.linkAll.apply(state, arguments);
    };
    Component.prototype.linkPath = function (path) {
        return this.state.linkPath(path);
    };
    Object.defineProperty(Component.prototype, "links", {
        get: function () {
            return this.state._links;
        },
        enumerable: true,
        configurable: true
    });
    Component.define = function (protoProps, staticProps) {
        var BaseClass = tools.getBaseClass(this), staticsDefinition = tools.getChangedStatics(this, 'state', 'store', 'props', 'context', 'childContext', 'pureRender'), combinedDefinition = tools.assign(staticsDefinition, protoProps || {});
        var definition = processSpec(combinedDefinition, this.prototype);
        var getDefaultProps = definition.getDefaultProps, propTypes = definition.propTypes, contextTypes = definition.contextTypes, childContextTypes = definition.childContextTypes, protoDefinition = __rest(definition, ["getDefaultProps", "propTypes", "contextTypes", "childContextTypes"]);
        if (getDefaultProps)
            this.defaultProps = definition.getDefaultProps();
        if (propTypes)
            this.propTypes = propTypes;
        if (contextTypes)
            this.contextTypes = contextTypes;
        if (childContextTypes)
            this.childContextTypes = childContextTypes;
        Mixable.define.call(this, protoDefinition, staticProps);
        return this;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    return Component;
}(React.Component));
Component = __decorate([
    extendable,
    mixinRules(reactMixinRules)
], Component);
export { Component };
// Looks like React guys _really_ want to deprecated it. But no way.
// We will work around their attempt.
Object.defineProperty(Component.prototype, 'isMounted', {
    value: function isMounted() {
        return !this._disposed;
    }
});
//# sourceMappingURL=component.js.map