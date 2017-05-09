/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { collectSpecs, compileSpecs } from './typeSpecs';
import createPureRenderMixin from './pureRender';
export default function process(spec, _a) {
    var pureRender = _a.pureRender, _b = _a._props, _props = _b === void 0 ? {} : _b, _c = _a._listenToPropsArray, _listenToPropsArray = _c === void 0 ? [] : _c, _d = _a._listenToPropsHash, _listenToPropsHash = _d === void 0 ? {} : _d;
    // process props spec...
    var props = collectSpecs(spec, 'props');
    if (props) {
        var allProps = spec._props = __assign({}, _props, props);
        var _e = compileSpecs(allProps), propTypes = _e.propTypes, defaults_1 = _e.defaults, watchers = _e.watchers, changeHandlers = _e.changeHandlers;
        spec.propTypes = propTypes;
        if (defaults_1)
            spec.getDefaultProps = function () { return defaults_1; };
        if (watchers) {
            spec.mixins.unshift(WatchersMixin);
            spec._watchers = watchers;
        }
        if (changeHandlers) {
            spec.mixins.unshift(ChangeHandlersMixin);
            spec._changeHandlers = changeHandlers;
        }
        delete spec.props;
    }
    // compile pure render mixin
    if (spec._props && (spec.pureRender || pureRender)) {
        spec.mixins.push(createPureRenderMixin(spec._props));
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