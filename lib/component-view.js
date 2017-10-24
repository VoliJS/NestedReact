import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tools } from 'type-r';
window.Page || (window.Page = { forceResize: function () { } });
export default function use(View) {
    var dispose = View.prototype.dispose || function () { }, setElement = View.prototype.setElement;
    var ComponentView = View.extend({
        reactClass: null,
        props: {},
        element: null,
        initialize: function (props) {
            // memorise arguments to pass to React
            this.options = props || {};
        },
        setElement: function () {
            this.unmountComponent(true);
            return setElement.apply(this, arguments);
        },
        // cached instance of react component...
        component: null,
        prevState: null,
        resize: function () {
            window.Page.forceResize();
        },
        render: function () {
            var options = this.prevState ? tools.fastAssign({ __keepState: this.prevState }, this.options) : this.options, element = React.createElement(this.reactClass, options), component = ReactDOM.render(element, this.el);
            this.component || this.mountComponent(component);
        },
        mountComponent: function (component) {
            this.component = component;
            this.prevState = null;
            component.trigger && this.listenTo(component, 'all', function () {
                this.trigger.apply(this, arguments);
            });
        },
        unmountComponent: function (keepModel) {
            var component = this.component;
            if (component) {
                this.prevState = component.state;
                if (component.trigger) {
                    this.stopListening(component);
                }
                component._preventDispose = Boolean(keepModel);
                ReactDOM.unmountComponentAtNode(this.el);
                this.component = null;
            }
        },
        dispose: function () {
            this.unmountComponent();
            return dispose.apply(this, arguments);
        }
    });
    Object.defineProperty(ComponentView.prototype, 'model', {
        get: function () {
            this.component || this.render();
            return this.component && this.component.state;
        }
    });
    return ComponentView;
}
//# sourceMappingURL=component-view.js.map