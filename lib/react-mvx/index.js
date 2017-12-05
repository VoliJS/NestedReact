import * as React from 'react';
import { define, mixins } from 'type-r';
import { Node, Element } from './define';
import Link from './link';
import { Component } from './component';
// extend React namespace
var ReactMVx = Object.create(React);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.define = define;
ReactMVx.mixins = mixins;
ReactMVx.Node = Node.value(null);
ReactMVx.Element = Element.value(null);
ReactMVx.Link = Link;
ReactMVx.Component = Component;
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        var source = prop && prop instanceof Link ? prop.value : prop;
        this.state.assignFrom((_a = {}, _a[key] = source, _a));
        if (source && source._changeToken) {
            this.state[key]._changeToken = source._changeToken;
        }
        var _a;
    };
};
export default ReactMVx;
export { define, mixins, Node, Element, Link, Component, assignToState };
//# sourceMappingURL=index.js.map