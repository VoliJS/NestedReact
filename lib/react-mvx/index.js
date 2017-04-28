import * as React from 'react';
import { define, mixins } from 'type-r';
import { Node, Element } from './define';
import Link from './link';
import { Component, createClass } from './component';
// extend React namespace
var ReactMVx = Object.create(React);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.createClass = createClass;
ReactMVx.define = define;
ReactMVx.mixins = mixins;
ReactMVx.Node = Node.value(null);
ReactMVx.Element = Element.value(null);
ReactMVx.Link = Link;
ReactMVx.Component = Component;
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        this.state.assignFrom((_a = {}, _a[key] = prop && prop instanceof Link ? prop.value : prop, _a));
        var _a;
    };
};
export default ReactMVx;
export { createClass, define, mixins, Node, Element, Link, Component, assignToState };
//# sourceMappingURL=index.js.map