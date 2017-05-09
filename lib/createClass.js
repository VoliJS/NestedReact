var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
import { Component } from './react-mvx';
var dontAutobind = [
    'State', 'Store', 'constructor',
    'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate',
    'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount',
    'render', 'getDefaultProps', 'getChildContext'
];
/**
 * ES5 components definition factory
 */
export default function createClass(_a) {
    var statics = _a.statics, a_spec = __rest(_a, ["statics"]);
    // Gather all methods to pin them to `this` later.
    var methods = [];
    var Subclass = Component.extend(__assign({ 
        // Override constructor to autobind all the methods...
        constructor: function () {
            Component.apply(this, this.arguments);
            for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
                var method = methods_1[_i];
                this[method] = this[method].bind(this);
            }
        } }, a_spec), statics);
    // Need to bind methods from mixins as well, so populate it here.
    var Proto = Subclass.prototype;
    for (var key in Proto) {
        if (Proto.hasOwnProperty(key) && dontAutobind.indexOf(key) === -1 && typeof Proto[key] === 'function') {
            methods.push(key);
        }
    }
    return Subclass;
}
//# sourceMappingURL=createClass.js.map