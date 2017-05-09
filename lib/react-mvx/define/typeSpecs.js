import * as PropTypes from 'prop-types';
import { Record, tools } from 'type-r';
export function collectSpecs(spec, name) {
    var attributes = null;
    // Scan through local mixin, and gather specs. Refactor it later, it's not good. At all.
    for (var i = spec.mixins.length - 1; i >= 0; i--) {
        var mixin = spec.mixins[i], mixinAttrs = mixin[name];
        if (mixinAttrs) {
            attributes || (attributes = {});
            tools.assign(attributes, mixinAttrs);
        }
    }
    // Merge it with local data.
    var specAttrs = spec[name];
    if (specAttrs) {
        if (attributes) {
            tools.assign(attributes, specAttrs);
        }
        else {
            attributes = specAttrs;
        }
    }
    return attributes;
}
export function compileSpecs(props) {
    var propTypes = {}, 
    // Create NestedTypes model definition to process props spec.
    modelProto = Record.defaults(props).prototype;
    var defaults, watchers, changeHandlers;
    modelProto.forEachAttr(modelProto._attributes, function (spec, name) {
        // Skip auto-generated `id` attribute.
        if (name !== 'id') {
            var value = spec.value, type = spec.type, options = spec.options;
            // Translate props type to the propTypes guard.
            propTypes[name] = translateType(type, options.isRequired);
            if (options._onChange) {
                watchers || (watchers = {});
                watchers[name] = toLocalWatcher(options._onChange);
            }
            // Handle listening to event maps...
            if (options.changeHandlers && options.changeHandlers.length) {
                changeHandlers || (changeHandlers = {});
                changeHandlers[name] = options.changeHandlers;
            }
            // Handle listening to props changes...
            if (options.changeEvents) {
                changeHandlers || (changeHandlers = {});
                var handlers = changeHandlers[name] || (changeHandlers[name] = []), changeEvents_1 = typeof options.changeEvents === 'string' ? options.changeEvents : null;
                handlers.push(function (next, prev, component) {
                    prev && component.stopListening(prev);
                    next && component.listenTo(next, changeEvents_1 || next._changeEventName, component.asyncUpdate);
                });
            }
            // If default value is explicitly provided...
            if (value !== void 0) {
                //...append it to getDefaultProps function.
                defaults || (defaults = {});
                defaults[name] = spec.convert(value);
            }
        }
    });
    return { propTypes: propTypes, defaults: defaults, watchers: watchers, changeHandlers: changeHandlers };
}
function toLocalWatcher(ref) {
    return typeof ref === 'function' ? ref : function (value, name) {
        this[ref] && this[ref](value, name);
    };
}
var Node = (function () {
    function Node() {
    }
    return Node;
}());
export { Node };
var Element = (function () {
    function Element() {
    }
    return Element;
}());
export { Element };
function translateType(Type, isRequired) {
    var T = _translateType(Type);
    return isRequired ? T.isRequired : T;
}
function _translateType(Type) {
    switch (Type) {
        case Number:
        case Number.integer:
            return PropTypes.number;
        case String:
            return PropTypes.string;
        case Boolean:
            return PropTypes.bool;
        case Array:
            return PropTypes.array;
        case Function:
            return PropTypes.func;
        case Object:
            return PropTypes.object;
        case Node:
            return PropTypes.node;
        case Element:
            return PropTypes.element;
        case void 0:
        case null:
            return PropTypes.any;
        default:
            return PropTypes.instanceOf(Type);
    }
}
//# sourceMappingURL=typeSpecs.js.map