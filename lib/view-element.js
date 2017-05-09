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
import React from './react-mvx';
import { tools } from 'type-r';
var notEqual = tools.notEqual;
var BackboneView = (function (_super) {
    __extends(BackboneView, _super);
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
}(React.Component));
export default BackboneView;
//# sourceMappingURL=view-element.js.map