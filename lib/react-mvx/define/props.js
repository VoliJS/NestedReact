/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
import { compileSpecs } from './typeSpecs';
import { PureRenderMixin, createChangeTokensConstructor } from './pureRender';
import { tools } from 'type-r';
export default function onDefine(_a, BaseClass) {
    var props = _a.props, pureRender = _a.pureRender;
    var prototype = this.prototype;
    // process props spec...
    if (props) {
        // Merge with inherited members...
        prototype._props = tools.defaults(props, BaseClass.prototype._props || {});
        var _b = compileSpecs(props), propTypes = _b.propTypes, defaults = _b.defaults, watchers = _b.watchers, changeHandlers = _b.changeHandlers;
        this.propTypes = propTypes;
        if (defaults)
            this.defaultProps = defaults;
        if (watchers) {
            prototype._watchers = watchers;
            this.mixins.merge([WatchersMixin]);
        }
        if (changeHandlers) {
            prototype._changeHandlers = changeHandlers;
            this.mixins.merge([ChangeHandlersMixin]);
        }
        if (prototype.pureRender) {
            prototype.PropsChangeTokens = createChangeTokensConstructor(props);
        }
    }
    if (pureRender) {
        this.mixins.merge([PureRenderMixin]);
    }
}
/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
var ChangeHandlersMixin = {
    componentDidMount: function () {
        handlePropsChanges(this, {}, this.props);
    },
    componentDidUpdate: function (prev) {
        handlePropsChanges(this, prev, this.props);
    },
    componentWillUnmount: function () {
        handlePropsChanges(this, this.props, {});
    }
};
function handlePropsChanges(component, prev, next) {
    var _changeHandlers = component._changeHandlers;
    for (var name_1 in _changeHandlers) {
        if (prev[name_1] !== next[name_1]) {
            for (var _i = 0, _a = _changeHandlers[name_1]; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(next[name_1], prev[name_1], component);
            }
        }
    }
}
/**
 * Watchers works on props replacement and fires _before_ any change will be applied and UI is updated.
 * Fired in componentWillMount as well, which makes it a nice way to sync state from props.
 */
var WatchersMixin = {
    componentWillReceiveProps: function (next) {
        var _a = this, _watchers = _a._watchers, props = _a.props;
        for (var name_2 in _watchers) {
            if (next[name_2] !== props[name_2]) {
                _watchers[name_2].call(this, next[name_2], name_2);
            }
        }
    },
    componentWillMount: function () {
        var _a = this, _watchers = _a._watchers, props = _a.props;
        for (var name_3 in _watchers) {
            _watchers[name_3].call(this, props[name_3], name_3);
        }
    }
};
//# sourceMappingURL=props.js.map