import * as tslib_1 from "tslib";
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
    var statics = _a.statics, a_spec = tslib_1.__rest(_a, ["statics"]);
    // Gather all methods to pin them to `this` later.
    var methods = [];
    var Subclass = Component.extend(tslib_1.__assign({ 
        // Override constructor to autobind all the methods...
        constructor: function () {
            Component.apply(this, arguments);
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