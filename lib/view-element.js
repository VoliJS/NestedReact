import * as tslib_1 from "tslib";
import React, { Component } from './react-mvx';
import { tools } from 'type-r';
var notEqual = tools.notEqual;
var BackboneView = (function (_super) {
    tslib_1.__extends(BackboneView, _super);
    function BackboneView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveRef = function (element) {
            _this.root = element;
        };
        return _this;
    }
    BackboneView.prototype.shouldComponentUpdate = function (next) {
        var props = this.props;
        return next.View !== props.View || notEqual(next.options, props.options);
    };
    BackboneView.prototype.hasUnsavedChanges = function () {
        var view = this.view;
        return view && (typeof view.hasUnsavedChanges === 'function' ? view.hasUnsavedChanges() : view.hasUnsavedChanges);
    };
    BackboneView.prototype.render = function () {
        return React.createElement('div', {
            ref: this.saveRef,
            className: this.props.className
        });
    };
    BackboneView.prototype.componentDidMount = function () {
        this._mountView();
    };
    BackboneView.prototype.componentDidUpdate = function () {
        this._dispose();
        this._mountView();
    };
    BackboneView.prototype.componentWillUnmount = function () {
        this._dispose();
    };
    BackboneView.prototype._mountView = function () {
        var el = this.root, p = this.props;
        var view = this.view = p.options ? new p.View(p.options) : new p.View();
        el.appendChild(view.el);
        view.render();
    };
    BackboneView.prototype._dispose = function () {
        var view = this.view;
        if (view) {
            if (view.dispose) {
                view.dispose();
            }
            else {
                view.stopListening();
                view.off();
            }
            this.root.innerHTML = "";
            this.view = null;
        }
    };
    return BackboneView;
}(Component));
export default BackboneView;
//# sourceMappingURL=view-element.js.map