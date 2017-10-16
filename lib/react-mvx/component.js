/**
 * React-Type-R component base class. Overrides React component.
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
import * as React from 'react';
import { mixinRules, define, mixins, definitions, Messenger } from 'type-r';
import onDefine from './define';
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._initializeState();
        return _this;
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
    Component.prototype._initializeState = function () {
        this.state = null;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    Component.prototype.componentWillUnmount = function () {
        this.dispose();
    };
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    Component.prototype.transaction = function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        var _a = this, state = _a.state, store = _a.store, withStore = store ? function (state) { return store.transaction(function () { return fun(state); }); } : fun;
        state ? state.transaction(withStore) : withStore(state);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    };
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    Component.prototype.asyncUpdate = function () {
        this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
    };
    return Component;
}(React.Component));
Component.onDefine = onDefine;
Component = __decorate([
    define,
    definitions({
        // Definitions to be extracted from mixins and statics and passed to `onDefine()`
        state: mixinRules.merge,
        State: mixinRules.value,
        store: mixinRules.merge,
        Store: mixinRules.value,
        props: mixinRules.merge,
        context: mixinRules.merge,
        childContext: mixinRules.merge,
        pureRender: mixinRules.protoValue
    }),
    mixinRules({
        // Apply old-school React mixin rules.
        componentWillMount: mixinRules.classLast,
        componentDidMount: mixinRules.classLast,
        componentWillReceiveProps: mixinRules.classLast,
        componentWillUpdate: mixinRules.classLast,
        componentDidUpdate: mixinRules.classLast,
        componentWillUnmount: mixinRules.classFirst,
        // And a bit more to fix inheritance quirks.
        shouldComponentUpdate: mixinRules.some,
        getChildContext: mixinRules.defaults
    })
    // Component can send and receive events...
    ,
    mixins(Messenger)
], Component);
export { Component };
function returnFalse() { return false; }
// Looks like React guys _really_ want to deprecate it. But no way.
// We will work around their attempt.
Object.defineProperty(Component.prototype, 'isMounted', {
    value: function isMounted() {
        return !this._disposed;
    }
});
//# sourceMappingURL=component.js.map