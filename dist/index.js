(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('nestedtypes'), require('prop-types'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'nestedtypes', 'prop-types', 'react-dom'], factory) :
	(factory((global.ReactMVx = {}),global.React,global.Nested,global.PropTypes,global.ReactDOM));
}(this, (function (exports,React,Nested,PropTypes,ReactDOM) { 'use strict';

var Nested__default = 'default' in Nested ? Nested['default'] : Nested;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/*****************
 * State
 */
function process(definition, BaseComponentClass) {
    var prototype = this.prototype;
    var state = definition.state, State = definition.State;
    if (typeof state === 'function') {
        State = state;
        state = void 0;
    }
    if (state) {
        var BaseClass = State || prototype.State || Nested.Record;
        var ComponentState = (function (_super) {
            __extends(ComponentState, _super);
            function ComponentState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ComponentState;
        }(BaseClass));
        ComponentState.attributes = state;
        ComponentState = __decorate([
            Nested.define
        ], ComponentState);
        prototype.State = ComponentState;
    }
    else if (State) {
        prototype.State = State;
    }
    if (state || State) {
        this.mixins.merge([StateMixin, UpdateOnNestedChangesMixin]);
    }
}
var StateMixin = {
    //state : null,
    _initializeState: function () {
        // props.__keepState is used to workaround issues in Backbone intergation layer
        var state = this.state = this.props.__keepState || new this.State();
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    },
    context: {
        _nestedStore: Nested.Store
    },
    // reference global store to fix model's store locator
    getStore: function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context._nestedStore) ||
            ((state = this.state) && state._defaultStore);
    },
    componentWillUnmount: function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    }
};
var UpdateOnNestedChangesMixin = {
    _onChildrenChange: function () { },
    componentDidMount: function () {
        this._onChildrenChange = this.asyncUpdate;
    }
};

function onDefine$2(definition, BaseClass) {
    var store = definition.store, StoreClass = definition.Store;
    if (store && store instanceof Nested.Store) {
        // Direct reference to an existing store. Put it to the prototype.
        this.prototype.store = store;
        this.mixins.merge([ExternalStoreMixin, ExposeStoreMixin]);
    }
    else if (store || definition.Store) {
        if (typeof store === 'function') {
            StoreClass = store;
            store = void 0;
        }
        if (store) {
            var BaseClass_1 = StoreClass || this.prototype.Store || Nested.Store;
            var InternalStore = (function (_super) {
                __extends(InternalStore, _super);
                function InternalStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InternalStore;
            }(BaseClass_1));
            InternalStore.attrbutes = store;
            InternalStore = __decorate([
                Nested.define
            ], InternalStore);
            
            this.prototype.Store = InternalStore;
        }
        else if (StoreClass) {
            this.prototype.Store = StoreClass;
        }
        this.mixins.merge([InternalStoreMixin, UpdateOnNestedChangesMixin, ExposeStoreMixin]);
    }
}
/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext: {
        _nestedStore: Nested.Store
    },
    getChildContext: function () {
        return { _nestedStore: this.store };
    },
    getStore: function () {
        return this.store;
    },
    // Will be called by the store when the lookup will fail.
    get: function (key) {
        // Ask upper store.
        var store = StateMixin.getStore.call(this, key);
        return store && store.get(key);
    }
};
/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
var ExternalStoreMixin = {
    componentDidMount: function () {
        // Start UI updates on state changes.
        this.listenTo(this.store, 'change', this.asyncUpdate);
    }
};
var InternalStoreMixin = {
    componentWillMount: function () {
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },
    componentWillUnmount: function () {
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = void 0;
    }
};

function compileSpecs(props) {
    var propTypes = {}, 
    // Create NestedTypes model definition to process props spec.
    modelProto = Nested.Record.defaults(props).prototype;
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
                defaults[name] = spec.convert(value, void 0, null, {});
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
var Element = (function () {
    function Element() {
    }
    return Element;
}());
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

function onDefine$3(_a, BaseClass) {
    var context = _a.context, childContext = _a.childContext;
    var prototype = this.prototype;
    if (context) {
        // Merge in inherited members...
        prototype._context = Nested.tools.defaults(context, BaseClass.prototype._context || {});
        // Compile to propTypes...
        this.contextTypes = compileSpecs(context).propTypes;
    }
    if (childContext) {
        prototype._childContext = Nested.tools.defaults(childContext, BaseClass.prototype._childContext);
        this.childContextTypes = compileSpecs(childContext).propTypes;
    }
}

function createChangeTokensConstructor(props) {
    var propNames = Object.keys(props);
    var PropsChangeTokens = new Function('p', 's', "\n        var v;\n        this._s = s && s._changeToken;\n        " + propNames.map(function (name) { return "\n            this." + name + " = ( ( v = p." + name + ") && v._changeToken ) || v;\n        "; }).join('') + "\n    ");
    PropsChangeTokens.prototype._hasChanges = new Function('p', 's', "\n        var v;\n        return ( ( s && s._changeToken ) !== this._s ) " + propNames.map(function (name) { return " ||\n            this." + name + " !== ( ( ( v = p." + name + ") && v._changeToken ) || v )\n        "; }).join('') + ";\n    ");
    return PropsChangeTokens;
}

var EmptyPropsChangeTokensCtor = createChangeTokensConstructor({});
var PureRenderMixin = {
    shouldComponentUpdate: function (nextProps) {
        return this._propsChangeTokens._hasChanges(nextProps, this.state);
    },
    componentDidMount: updateChangeTokens,
    componentDidUpdate: updateChangeTokens
};
function updateChangeTokens() {
    this._propsChangeTokens = new this.PropsChangeTokens(this.props, this.state);
}

/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
function onDefine$4(_a, BaseClass) {
    var props = _a.props, pureRender = _a.pureRender;
    var prototype = this.prototype;
    // process props spec...
    if (props) {
        // Merge with inherited members...
        prototype._props = Nested.tools.defaults(props, BaseClass.prototype._props || {});
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

function onDefine$1(definition, BaseClass) {
    // Initialize mixins placeholder...
    onDefine$2.call(this, definition, BaseClass);
    process.call(this, definition, BaseClass);
    onDefine$3.call(this, definition, BaseClass);
    onDefine$4.call(this, definition, BaseClass);
    Nested.Messenger.onDefine.call(this, definition, BaseClass);
}

var ArrayProto = Array.prototype;
var ObjectProto = Object.prototype;
function helpers(value) {
    if (value && typeof value === 'object') {
        switch (Object.getPrototypeOf(value)) {
            case ArrayProto: return arrayHelpers;
            case ObjectProto: return objectHelpers;
        }
    }
    return dummyHelpers;
}
// Do nothing for types other than Array and plain Object.
var dummyHelpers = {
    clone: function (value) { return value; },
    map: function (link, fun) { return []; },
    remove: function (value) { return value; }
};
// `map` and `clone` for plain JS objects
var objectHelpers = {
    // Map through the link to object
    map: function (link, iterator) {
        var mapped = [];
        for (var key in link.value) {
            var element$$1 = iterator(link.at(key), key);
            element$$1 === void 0 || (mapped.push(element$$1));
        }
        return mapped;
    },
    remove: function (object$$1, key) {
        delete object$$1[key];
        return object$$1;
    },
    // Shallow clone plain JS object
    clone: function (object$$1) {
        var cloned = {};
        for (var key in object$$1) {
            cloned[key] = object$$1[key];
        }
        return cloned;
    }
};
// `map` and `clone` helpers for arrays.
var arrayHelpers = {
    // Shallow clone array
    clone: function (array$$1) {
        return array$$1.slice();
    },
    remove: function (array$$1, i) {
        array$$1.splice(i, 1);
        return array$$1;
    },
    // Map through the link to array
    map: function (link, iterator) {
        var length = link.value.length, mapped = Array(length);
        for (var i = 0, j = 0; i < length; i++) {
            var y = iterator(link.at(i), i);
            y === void 0 || (mapped[j++] = y);
        }
        mapped.length === j || (mapped.length = j);
        return mapped;
    }
};

/**
 * Advanced React links for purely functional two-way data binding
 *
 * MIT License, (c) 2016 Vlad Balin, Volicon.
 */
// Main Link class. All links must extend it.
var Link$1 = (function () {
    // create 
    function Link(value) {
        this.value = value;
    }
    // Create custom link to arbitrary value
    Link.value = function (value, set) {
        return new CustomLink(value, set);
    };
    Object.defineProperty(Link.prototype, "validationError", {
        // DEPRECATED: Old error holder for backward compatibility with Volicon code base
        get: function () { return this.error; },
        enumerable: true,
        configurable: true
    });
    Link.prototype.onChange = function (handler) {
        var _this = this;
        return new CloneLink(this, function (x) {
            handler(x);
            _this.set(x);
        });
    };
    Object.defineProperty(Link.prototype, "props", {
        // <input { ...link.props } />
        get: function () {
            var _this = this;
            return typeof this.value === 'boolean' ? {
                checked: this.value,
                onChange: function (e) { return _this.set(Boolean(e.target.checked)); }
            } : {
                value: this.value,
                onChange: function (e) { return _this.set(e.target.value); }
            };
        },
        enumerable: true,
        configurable: true
    });
    // DEPRECATED: Old React method for backward compatibility
    Link.prototype.requestChange = function (x) {
        this.set(x);
    };
    // Immediately update the link value using given transform function.
    Link.prototype.update = function (transform, e) {
        var next = transform(this.clone(), e);
        next === void 0 || this.set(next);
    };
    // Create new link which applies transform function on set.
    Link.prototype.pipe = function (handler) {
        var _this = this;
        return new CloneLink(this, function (x) {
            var next = handler(x, _this.value);
            next === void 0 || _this.set(next);
        });
    };
    // Create UI event handler function which will update the link with a given transform function.
    Link.prototype.action = function (transform) {
        var _this = this;
        return function (e) { return _this.update(transform, e); };
    };
    Link.prototype.equals = function (truthyValue) {
        return new EqualsLink(this, truthyValue);
    };
    Link.prototype.enabled = function (defaultValue) {
        return new EnabledLink(this, defaultValue || "");
    };
    // Array-only links methods
    Link.prototype.contains = function (element$$1) {
        return new ContainsLink(this, element$$1);
    };
    Link.prototype.push = function () {
        var array$$1 = arrayHelpers.clone(this.value);
        Array.prototype.push.apply(array$$1, arguments);
        this.set(array$$1);
    };
    Link.prototype.unshift = function () {
        var array$$1 = arrayHelpers.clone(this.value);
        Array.prototype.unshift.apply(array$$1, arguments);
        this.set(array$$1);
    };
    Link.prototype.splice = function () {
        var array$$1 = arrayHelpers.clone(this.value);
        Array.prototype.splice.apply(array$$1, arguments);
        this.set(array$$1);
    };
    Link.prototype.map = function (iterator) {
        return helpers(this.value).map(this, iterator);
    };
    Link.prototype.removeAt = function (key) {
        var value = this.value, _ = helpers(value);
        this.set(_.remove(_.clone(value), key));
    };
    Link.prototype.at = function (key) {
        return new LinkAt(this, key);
    };
    Link.prototype.clone = function () {
        var value = this.value;
        return helpers(value).clone(value);
    };
    Link.prototype.pick = function () {
        var links = {};
        for (var i = 0; i < arguments.length; i++) {
            var key = arguments[i];
            links[key] = new LinkAt(this, key);
        }
        return links;
    };
    /**
     * Validate link with validness predicate and optional custom error object. Can be chained.
     */
    Link.prototype.check = function (whenValid, error) {
        if (!this.error && !whenValid(this.value)) {
            this.error = error || whenValid.error || defaultError;
        }
        return this;
    };
    return Link;
}());
var CustomLink = (function (_super) {
    __extends(CustomLink, _super);
    function CustomLink(value, set) {
        var _this = _super.call(this, value) || this;
        _this.set = set;
        return _this;
    }
    CustomLink.prototype.set = function (x) { };
    return CustomLink;
}(Link$1));
var CloneLink = (function (_super) {
    __extends(CloneLink, _super);
    function CloneLink(parent, set) {
        var _this = _super.call(this, parent.value) || this;
        _this.set = set;
        var error = parent.error;
        if (error)
            _this.error = error;
        return _this;
    }
    CloneLink.prototype.set = function (x) { };
    return CloneLink;
}(Link$1));
var EqualsLink = (function (_super) {
    __extends(EqualsLink, _super);
    function EqualsLink(parent, truthyValue) {
        var _this = _super.call(this, parent.value === truthyValue) || this;
        _this.parent = parent;
        _this.truthyValue = truthyValue;
        return _this;
    }
    EqualsLink.prototype.set = function (x) {
        this.parent.set(x ? this.truthyValue : null);
    };
    return EqualsLink;
}(Link$1));
var EnabledLink = (function (_super) {
    __extends(EnabledLink, _super);
    function EnabledLink(parent, defaultValue) {
        var _this = _super.call(this, parent.value != null) || this;
        _this.parent = parent;
        _this.defaultValue = defaultValue;
        return _this;
    }
    EnabledLink.prototype.set = function (x) {
        this.parent.set(x ? this.defaultValue : null);
    };
    return EnabledLink;
}(Link$1));
var ContainsLink = (function (_super) {
    __extends(ContainsLink, _super);
    function ContainsLink(parent, element$$1) {
        var _this = _super.call(this, parent.value.indexOf(element$$1) >= 0) || this;
        _this.parent = parent;
        _this.element = element$$1;
        return _this;
    }
    ContainsLink.prototype.set = function (x) {
        var _this = this;
        var next = Boolean(x);
        if (this.value !== next) {
            var arr = this.parent.value, nextValue = x ? arr.concat(this.element) : arr.filter(function (el) { return el !== _this.element; });
            this.parent.set(nextValue);
        }
    };
    return ContainsLink;
}(Link$1));
var defaultError = 'Invalid value';
/**
 * Link to array or object element enclosed in parent link.
 * Performs purely functional update of the parent, shallow copying its value on `set`.
 */
var LinkAt = (function (_super) {
    __extends(LinkAt, _super);
    function LinkAt(parent, key) {
        var _this = _super.call(this, parent.value[key]) || this;
        _this.parent = parent;
        _this.key = key;
        return _this;
    }
    LinkAt.prototype.remove = function () {
        this.parent.removeAt(this.key);
    };
    // Set new element value to parent array or object, performing purely functional update.
    LinkAt.prototype.set = function (x) {
        var _this = this;
        if (this.value !== x) {
            this.parent.update(function (value) {
                value[_this.key] = x;
                return value;
            });
        }
    };
    
    return LinkAt;
}(Link$1));

/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
Nested.Mixable.mixins.populate(Link$1);
/**
 * Record
 */
Nested.MixinsState.get(Nested.Record).merge([{
        // Link to the record's attribute by its key.
        linkAt: function (key) {
            return cacheLink(getLinksCache(this), this, key);
        },
        // Link to the attribute of the record's tree by symbolic path.
        linkPath: function (path, options) {
            return new RecordDeepLink(this, path, options);
        },
        // Link all (or listed) attributes and return links cache.
        linkAll: function () {
            var links = getLinksCache(this);
            if (arguments.length) {
                for (var i = 0; i < arguments.length; i++) {
                    cacheLink(links, this, arguments[i]);
                }
            }
            else {
                var attributes = this.attributes;
                for (var key in attributes) {
                    attributes[key] === void 0 || cacheLink(links, this, key);
                }
            }
            return links;
        }
    }]);
/**
 * Link to Type-R's record attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Links are cached in the records
 */
var RecordLink = (function (_super) {
    __extends(RecordLink, _super);
    function RecordLink(record, attr, value) {
        var _this = _super.call(this, value) || this;
        _this.record = record;
        _this.attr = attr;
        return _this;
    }
    RecordLink.prototype.set = function (x) {
        this.record[this.attr] = x;
    };
    Object.defineProperty(RecordLink.prototype, "error", {
        get: function () {
            return this._error === void 0 ?
                this.record.getValidationError(this.attr) :
                this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    return RecordLink;
}(Link$1));
var RecordDeepLink = (function (_super) {
    __extends(RecordDeepLink, _super);
    function RecordDeepLink(record, path, options) {
        var _this = _super.call(this, record.deepGet(path)) || this;
        _this.record = record;
        _this.path = path;
        _this.options = options;
        return _this;
    }
    Object.defineProperty(RecordDeepLink.prototype, "error", {
        get: function () {
            if (this._error === void 0) {
                this._error = this.record.deepValidationError(this.path) || null;
            }
            return this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordDeepLink.prototype, "_changeToken", {
        get: function () {
            return this.record._changeToken;
        },
        enumerable: true,
        configurable: true
    });
    RecordDeepLink.prototype.set = function (x) {
        this.record.deepSet(this.path, x, this.options);
    };
    return RecordDeepLink;
}(Link$1));
function getLinksCache(record) {
    return record._links || (record._links = new record.AttributesCopy({}));
}
function cacheLink(links, record, key) {
    var cached = links[key], value = record[key];
    return cached && cached.value === value ? cached
        : links[key] = new RecordLink(record, key, value);
}
/***********************************
 * Collection
 */
Nested.MixinsState.get(Nested.Record.Collection).merge([{
        // Boolean link to the record's presence in the collection
        linkContains: function (record) {
            return new CollectionLink(this, record);
        },
        // Link to collection's property
        linkAt: function (prop) {
            var _this = this;
            return Link$1.value(this[prop], function (x) { return _this[prop] = x; });
        }
    }]);
/**
 * Boolean link to presence of NestedType's record in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 */
var CollectionLink = (function (_super) {
    __extends(CollectionLink, _super);
    function CollectionLink(collection, record) {
        var _this = _super.call(this, Boolean(collection.get(record))) || this;
        _this.collection = collection;
        _this.record = record;
        return _this;
    }
    CollectionLink.prototype.set = function (x) {
        this.collection.toggle(this.record, x);
    };
    return CollectionLink;
}(Link$1));

/**
 * React-Type-R component base class. Overrides React component.
 */
exports.Component = (function (_super) {
    __extends(Component$$1, _super);
    function Component$$1(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._initializeState();
        return _this;
    }
    Component$$1.prototype.linkAt = function (key) {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAt(key);
    };
    Component$$1.prototype.linkAll = function () {
        // Quick and dirty hack to suppres type error - refactor later.
        var state = this.state;
        return state.linkAll.apply(state, arguments);
    };
    Component$$1.prototype.linkPath = function (path) {
        return this.state.linkPath(path);
    };
    Object.defineProperty(Component$$1.prototype, "links", {
        get: function () {
            return this.state._links;
        },
        enumerable: true,
        configurable: true
    });
    Component$$1.prototype._initializeState = function () {
        this.state = null;
    };
    Component$$1.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    Component$$1.prototype.componentWillUnmount = function () {
        this.dispose();
    };
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    Component$$1.prototype.transaction = function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        var _a = this, state = _a.state, store = _a.store, withStore = store ? function (state) { return store.transaction(function () { return fun(state); }); } : fun;
        state ? state.transaction(withStore) : withStore(state);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    };
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    Component$$1.prototype.asyncUpdate = function () {
        this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
    };
    return Component$$1;
}(React.Component));
exports.Component.onDefine = onDefine$1;
exports.Component = __decorate([
    Nested.define({
        PropsChangeTokens: EmptyPropsChangeTokensCtor
    }),
    Nested.definitions({
        // Definitions to be extracted from mixins and statics and passed to `onDefine()`
        state: Nested.mixinRules.merge,
        State: Nested.mixinRules.value,
        store: Nested.mixinRules.merge,
        Store: Nested.mixinRules.value,
        props: Nested.mixinRules.merge,
        context: Nested.mixinRules.merge,
        childContext: Nested.mixinRules.merge,
        pureRender: Nested.mixinRules.protoValue
    }),
    Nested.mixinRules({
        // Apply old-school React mixin rules.
        componentWillMount: Nested.mixinRules.classLast,
        componentDidMount: Nested.mixinRules.classLast,
        componentWillReceiveProps: Nested.mixinRules.classLast,
        componentWillUpdate: Nested.mixinRules.classLast,
        componentDidUpdate: Nested.mixinRules.classLast,
        componentWillUnmount: Nested.mixinRules.classFirst,
        // And a bit more to fix inheritance quirks.
        shouldComponentUpdate: Nested.mixinRules.some,
        getChildContext: Nested.mixinRules.defaults
    })
    // Component can send and receive events...
    ,
    Nested.mixins(Nested.Messenger)
], exports.Component);
function returnFalse() { return false; }
// Looks like React guys _really_ want to deprecate it. But no way.
// We will work around their attempt.
Object.defineProperty(exports.Component.prototype, 'isMounted', {
    value: function isMounted() {
        return !this._disposed;
    }
});

// extend React namespace
var ReactMVx = Object.create(React);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.define = Nested.define;
ReactMVx.mixins = Nested.mixins;
ReactMVx.Node = Node.value(null);
ReactMVx.Element = Element.value(null);
ReactMVx.Link = Link$1;
ReactMVx.Component = exports.Component;
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        var source = prop && prop instanceof Link$1 ? prop.value : prop;
        this.state.assignFrom((_a = {}, _a[key] = source, _a));
        if (source && source._changeToken) {
            this.state[key]._changeToken = source._changeToken;
        }
        var _a;
    };
};

var notEqual = Nested.tools.notEqual;
var BackboneView = (function (_super) {
    __extends(BackboneView, _super);
    function BackboneView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveRef = function (element$$1) {
            _this.root = element$$1;
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
        return ReactMVx.createElement('div', {
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
}(exports.Component));

window.Page || (window.Page = { forceResize: function () { } });
function use(View$$1) {
    var dispose = View$$1.prototype.dispose || function () { }, setElement = View$$1.prototype.setElement;
    var ComponentView = View$$1.extend({
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
            var options = this.prevState ? Nested.tools.fastAssign({ __keepState: this.prevState }, this.options) : this.options, element$$1 = React.createElement(this.reactClass, options), component = ReactDOM.render(element$$1, this.el);
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

var dontAutobind = [
    'State', 'Store', 'constructor',
    'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate',
    'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount',
    'render', 'getDefaultProps', 'getChildContext'
];
/**
 * ES5 components definition factory
 */
function createClass(_a) {
    var statics = _a.statics, a_spec = __rest(_a, ["statics"]);
    // Gather all methods to pin them to `this` later.
    var methods = [];
    var Subclass = exports.Component.extend(__assign({ 
        // Override constructor to autobind all the methods...
        constructor: function () {
            exports.Component.apply(this, arguments);
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

// Re-export react-mvx
var NestedReact = Object.create(ReactMVx);
// NestedReact backward compatibility layer
NestedReact.subview = BackboneView;
Object.defineProperty(NestedReact, 'createClass', { value: createClass });
Object.defineProperty(NestedReact, 'PropTypes', { value: PropTypes });
var BaseView;
// export hook to override base View class used...
function useView(View$$1) {
    BaseView = use(View$$1);
}
var onDefine = NestedReact.Component.onDefine;
NestedReact.Component.onDefine = function (definitions$$1, BaseClass) {
    this.View = BaseView.extend({ reactClass: this });
    return onDefine.call(this, definitions$$1, BaseClass);
};
// Deprecated API for backward compatibility
var RecordProto = Nested.Record.prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;
var CollectionProto = Nested.Record.Collection.prototype;
CollectionProto.hasLink = CollectionProto.linkContains;
useView(Nested.View);
// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el: { get: function () { return ReactDOM.findDOMNode(this); } },
    $el: { get: function () { return Nested__default.$(this.el); } },
    $: { value: function (sel) { return this.$el.find(sel); } }
};
Object.defineProperties(NestedReact.Component.prototype, BackboneViewProps);

exports['default'] = NestedReact;
exports.subview = BackboneView;
exports.PropTypes = PropTypes;
exports.createClass = createClass;
exports.useView = useView;
exports.define = Nested.define;
exports.mixins = Nested.mixins;
exports.Node = Node;
exports.Element = Element;
exports.Link = Link$1;
exports.assignToState = assignToState;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
