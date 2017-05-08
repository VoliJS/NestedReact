(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nestedtypes"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["nestedtypes", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["React"] = factory(require("nestedtypes"), require("react"), require("react-dom"));
	else
		root["React"] = factory(root["Nested"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony export (immutable) */ __webpack_exports__["c"] = collectSpecs;
/* harmony export (immutable) */ __webpack_exports__["d"] = compileSpecs;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Element; });


function collectSpecs(spec, name) {
    var attributes = null;
    // Scan through local mixin, and gather specs. Refactor it later, it's not good. At all.
    for (var i = spec.mixins.length - 1; i >= 0; i--) {
        var mixin = spec.mixins[i], mixinAttrs = mixin[name];
        if (mixinAttrs) {
            attributes || (attributes = {});
            __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(attributes, mixinAttrs);
        }
    }
    // Merge it with local data.
    var specAttrs = spec[name];
    if (specAttrs) {
        if (attributes) {
            __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(attributes, specAttrs);
        }
        else {
            attributes = specAttrs;
        }
    }
    return attributes;
}
function compileSpecs(props) {
    var propTypes = {}, 
    // Create NestedTypes model definition to process props spec.
    modelProto = __WEBPACK_IMPORTED_MODULE_1_type_r__["Record"].defaults(props).prototype;
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
            if (options.changeHandlers) {
                changeHandlers || (changeHandlers = {});
                changeHandlers[name] = options.changeHandlers;
            }
            // Handle listening to props changes...
            if (options.changeEvents) {
                changeHandlers || (changeHandlers = {});
                var handlers = changeHandlers[name] || (changeHandlers[name] = []), changeEvents_1 = options.changeEvents === 'string' ? options.changeEvents : null;
                handlers.push(function (prev, next, component) {
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
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["number"];
        case String:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["string"];
        case Boolean:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["bool"];
        case Array:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["array"];
        case Function:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["func"];
        case Object:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["object"];
        case Node:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["node"];
        case Element:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["element"];
        case void 0:
        case null:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["any"];
        default:
            return __WEBPACK_IMPORTED_MODULE_0_prop_types__["instanceOf"](Type);
    }
}
//# sourceMappingURL=typeSpecs.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__link__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__component__["a"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1_type_r__, "define")) __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1_type_r__["define"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1_type_r__, "mixins")) __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__define__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__define__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__link__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__component__["b"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return assignToState; });





// extend React namespace
var ReactMVx = Object.create(__WEBPACK_IMPORTED_MODULE_0_react__);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.createClass = __WEBPACK_IMPORTED_MODULE_4__component__["a" /* createClass */];
ReactMVx.define = __WEBPACK_IMPORTED_MODULE_1_type_r__["define"];
ReactMVx.mixins = __WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"];
ReactMVx.Node = __WEBPACK_IMPORTED_MODULE_2__define__["a" /* Node */].value(null);
ReactMVx.Element = __WEBPACK_IMPORTED_MODULE_2__define__["b" /* Element */].value(null);
ReactMVx.Link = __WEBPACK_IMPORTED_MODULE_3__link__["a" /* default */];
ReactMVx.Component = __WEBPACK_IMPORTED_MODULE_4__component__["b" /* Component */];
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        this.state.assignFrom((_a = {}, _a[key] = prop && prop instanceof __WEBPACK_IMPORTED_MODULE_3__link__["a" /* default */] ? prop.value : prop, _a));
        var _a;
    };
};
/* harmony default export */ __webpack_exports__["a"] = (ReactMVx);

//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(22)();
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__props__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typeSpecs__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["b"]; });
/* harmony export (immutable) */ __webpack_exports__["c"] = process;





function process(spec, baseProto) {
    if (baseProto === void 0) { baseProto = {}; }
    // Initialize mixins placeholder...
    spec.mixins || (spec.mixins = []);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__context__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__props__["a" /* default */])(spec, baseProto);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common__["a" /* default */])(spec, baseProto);
    return spec;
}
;

//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StateMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UpdateOnNestedChangesMixin; });
/*****************
 * State
 */


function process(spec, baseProto) {
    // process state spec...
    var attributes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'state');
    if (attributes || baseProto.State) {
        var BaseModel = baseProto.State || __WEBPACK_IMPORTED_MODULE_1_type_r__["Record"];
        spec.State = attributes ? (typeof attributes === 'function' ? attributes : BaseModel.defaults(attributes)) : BaseModel;
        spec.mixins.push(StateMixin);
        spec.mixins.push(UpdateOnNestedChangesMixin);
        delete spec.state;
        delete spec.attributes;
    }
}
var StateMixin = {
    state: null,
    componentWillMount: function () {
        // props.__keepState is used to workaround issues in Backbone intergation layer
        var state = this.state = this.props.__keepState || new this.State();
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    },
    context: {
        _nestedStore: __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]
    },
    // reference global store to fix model's store locator
    getStore: function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context._archetypeStore) ||
            ((state = this.state) && state._defaultStore);
    },
    componentWillUnmount: function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        state.dispose();
        this.state = void 0;
    }
};
var UpdateOnNestedChangesMixin = {
    _onChildrenChange: function () { },
    componentDidMount: function () {
        this._onChildrenChange = this.asyncUpdate;
    }
};
//# sourceMappingURL=state.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_type_r__);
/* harmony export (immutable) */ __webpack_exports__["a"] = use;



window.Page || (window.Page = { forceResize: function () { } });
function use(View) {
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
            var options = this.prevState ? __WEBPACK_IMPORTED_MODULE_2_type_r__["tools"].fastAssign({ __keepState: this.prevState }, this.options) : this.options, element = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](this.reactClass, options), component = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(element, this.el);
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
                this.prevState = component.model;
                if (component.trigger) {
                    this.stopListening(component);
                }
                component._preventDispose = Boolean(keepModel);
                __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.unmountComponentAtNode(this.el);
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
            return this.component && this.component.model;
        }
    });
    return ComponentView;
}
//# sourceMappingURL=component-view.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mvx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
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


var notEqual = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].notEqual;
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
        return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* default */].createElement('div', {
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
}(__WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* default */].Component));
/* harmony default export */ __webpack_exports__["a"] = (BackboneView);
//# sourceMappingURL=view-element.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mvx__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "define", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "assignToState", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_element__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subview", function() { return __WEBPACK_IMPORTED_MODULE_4__view_element__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_view__ = __webpack_require__(8);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_3_prop_types__; });
/* harmony export (immutable) */ __webpack_exports__["useView"] = useView;
// Re-export react-mvx

var NestedReact = Object.create(__WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* default */]);
/* harmony default export */ __webpack_exports__["default"] = (NestedReact);

// NestedReact backward compatibility layer




NestedReact.subview = __WEBPACK_IMPORTED_MODULE_4__view_element__["a" /* default */];



var BaseView;
// export hook to override base View class used...
function useView(View) {
    BaseView = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__component_view__["a" /* default */])(View);
}
var define = NestedReact.Component.define;
NestedReact.Component.define = function (protoProps, staticProps) {
    this.View = BaseView.extend({ reactClass: this });
    return define.call(this, protoProps, staticProps);
};
function defineBackboneProxy(Component) {
}
// Deprecated API for backward compatibility
var RecordProto = __WEBPACK_IMPORTED_MODULE_2_type_r__["Record"].prototype;
RecordProto.getLink = RecordProto.linkAt;
RecordProto.deepLink = RecordProto.linkPath;
var CollectionProto = __WEBPACK_IMPORTED_MODULE_2_type_r__["Record"].Collection.prototype;
CollectionProto.hasLink = CollectionProto.linkContains;
useView(__WEBPACK_IMPORTED_MODULE_2_type_r__["View"]);
// Extend react components to have backbone-style jquery accessors
var BackboneViewProps = {
    el: { get: function () { return __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.findDOMNode(this); } },
    $el: { get: function () { return __WEBPACK_IMPORTED_MODULE_2_type_r___default.a.$(this.el); } },
    $: { value: function (sel) { return this.$el.find(sel); } }
};
Object.defineProperties(NestedReact.Component.prototype, BackboneViewProps);
//# sourceMappingURL=index.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Component; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createClass;
/**
 * React components
 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};



var reactMixinRules = {
    componentWillMount: 'reverse',
    componentDidMount: 'reverse',
    componentWillReceiveProps: 'reverse',
    shouldComponentUpdate: 'some',
    componentWillUpdate: 'reverse',
    componentDidUpdate: 'reverse',
    componentWillUnmount: 'sequence',
    state: 'merge',
    store: 'merge',
    props: 'merge',
    context: 'merge',
    childContext: 'merge',
    getChildContext: 'mergeSequence'
};
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.linkAt = function (key) {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAt(key);
    };
    Component.prototype.linkAll = function () {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAll.apply(this, arguments);
    };
    Component.define = function (protoProps, staticProps) {
        var BaseClass = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].getBaseClass(this), staticsDefinition = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].getChangedStatics(this, 'state', 'store', 'props', 'autobind', 'context', 'childContext', 'pureRender'), combinedDefinition = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].assign(staticsDefinition, protoProps || {});
        var definition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__define__["c" /* default */])(combinedDefinition, this.prototype);
        var getDefaultProps = definition.getDefaultProps, propTypes = definition.propTypes, contextTypes = definition.contextTypes, childContextTypes = definition.childContextTypes, protoDefinition = __rest(definition, ["getDefaultProps", "propTypes", "contextTypes", "childContextTypes"]);
        if (getDefaultProps)
            this.defaultProps = definition.getDefaultProps();
        if (propTypes)
            this.propTypes = propTypes;
        if (contextTypes)
            this.contextTypes = contextTypes;
        if (childContextTypes)
            this.childContextTypes = childContextTypes;
        __WEBPACK_IMPORTED_MODULE_1_type_r__["Mixable"].define.call(this, protoDefinition, staticProps);
        return this;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
Component = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_type_r__["extendable"],
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"])(reactMixinRules)
], Component);

var dontAutobind = ['state', 'store'];
/**
 * ES5 components definition factory
 */
function createClass(_a) {
    var statics = _a.statics, a_spec = __rest(_a, ["statics"]);
    // Gather all methods to pin them to `this` later.
    var methods = [];
    for (var key in a_spec) {
        if (a_spec.hasOwnProperty(key) && dontAutobind.indexOf(key) === -1 && typeof a_spec[key] === 'function' && !(a_spec[key] in Component.prototype)) {
            methods.push(key);
        }
    }
    var Subclass = Component.extend(__assign({ 
        // Override constructor to autobind all the methods...
        constructor: function () {
            Component.apply(this, this.arguments);
            for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
                var method = methods_1[_i];
                this[method] = this[method].bind(this);
            }
        } }, a_spec), statics);
    return Subclass;
}
//# sourceMappingURL=component.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony export (immutable) */ __webpack_exports__["a"] = compile;
/* unused harmony export asyncUpdate */
/**
 * Process `autobind` specs, attach async event processing and transactional support.
 */

function compile(spec, _a) {
    var _b = _a._autobind, _autobind = _b === void 0 ? [] : _b;
    // Attach autobind mixin...
    if (spec.autobind) {
        spec._autobind = spec.autobind.split(/\s+/).concat(_autobind);
        spec.mixins.push(AutobindMixin);
        delete spec.autobind;
    }
    // Attach common mixin
    spec.mixins.push(CommonMixin);
}
/***
 * Autobinding
 */
var AutobindMixin = {
    componentWillMount: function () {
        for (var _i = 0, _a = this._autobind; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this[name_1] = this[name_1].bind(this);
        }
    }
};
function asyncUpdate() {
    this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
}
function returnFalse() { return false; }
/**
 * Mixin which is attached to all components.
 */
var CommonMixin = __WEBPACK_IMPORTED_MODULE_0_type_r__["tools"].assign({
    componentWillUnmount: function () {
        // Prevent memory leaks when working with events.
        this.off();
        this.stopListening();
        // Mark component as disposed.
        this._disposed = true;
    },
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    asyncUpdate: asyncUpdate,
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction: function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        fun(this.props, this.state);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    }
}, __WEBPACK_IMPORTED_MODULE_0_type_r__["Events"]);
//# sourceMappingURL=common.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function process(spec, _a) {
    var _b = _a._context, _context = _b === void 0 ? {} : _b, _c = _a._childContext, _childContext = _c === void 0 ? {} : _c;
    // process context specs...
    var context = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'context');
    if (context) {
        spec._context = __assign({}, _context, context);
        spec.contextTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(context).propTypes;
        delete spec.context;
    }
    // and child context specs...
    var childContext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'childContext');
    if (childContext) {
        spec._childContext = __assign({}, _childContext, childContext);
        spec.childContextTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(childContext).propTypes;
        delete spec.childContext;
    }
}
//# sourceMappingURL=context.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pureRender__ = __webpack_require__(15);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
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


function process(spec, _a) {
    var pureRender = _a.pureRender, _b = _a._props, _props = _b === void 0 ? {} : _b, _c = _a._listenToPropsArray, _listenToPropsArray = _c === void 0 ? [] : _c, _d = _a._listenToPropsHash, _listenToPropsHash = _d === void 0 ? {} : _d;
    // process props spec...
    var props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'props');
    if (props) {
        var allProps = spec._props = __assign({}, _props, props);
        var _e = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["d" /* compileSpecs */])(allProps), propTypes = _e.propTypes, defaults_1 = _e.defaults, watchers = _e.watchers, changeHandlers = _e.changeHandlers;
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
        spec.mixins.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pureRender__["a" /* default */])(spec._props));
    }
}
/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
var ChangeHandlersMixin = {
    componentDidMount: handleChanges,
    componentDidUpdate: handleChanges
};
function handleChanges(prev) {
    if (prev === void 0) { prev = {}; }
    var _a = this, _changeHandlers = _a._changeHandlers, props = _a.props;
    for (var name_1 in _changeHandlers) {
        if (prev[name_1] !== props[name_1]) {
            for (var _i = 0, _b = _changeHandlers[name_1]; _i < _b.length; _i++) {
                var handler = _b[_i];
                handler(props[name_1], prev[name_1], this);
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

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createPureRenderMixin;
function createPureRenderMixin(props) {
    var ctorBody = ['var v; this._s = s && s._changeToken'], isChangedBody = ['var v; return ( s && s._changeToken !== t._s )'];
    for (var name_1 in props) {
        var propExpr = "( ( v = p." + name_1 + ") && v._changeToken ) || v";
        ctorBody.push("this." + name_1 + "= " + propExpr);
        isChangedBody.push("t." + name_1 + " !== (" + propExpr + ")");
    }
    var ChangeTokens = new Function('p', 's', ctorBody.join(';')), isChanged = new Function('t', 'p', 's', isChangedBody.join('||'));
    ChangeTokens.prototype = null;
    return {
        _changeTokens: null,
        shouldComponentUpdate: function (nextProps) {
            return isChanged(this._changeTokens, nextProps, this.state);
        },
        componentDidMount: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        },
        componentDidUpdate: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        }
    };
}
;
//# sourceMappingURL=pureRender.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["a"] = process;



function process(spec, baseProto) {
    var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* collectSpecs */])(spec, 'store');
    if (store) {
        delete spec.store;
        if (store instanceof __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]) {
            // Direct reference to an existing store. Put it to the prototype.
            spec.store = store;
            spec.mixins.push(ExternalStoreMixin);
        }
        else {
            spec.Store = store;
            spec.mixins.push(InternalStoreMixin);
            spec.mixins.push(__WEBPACK_IMPORTED_MODULE_2__state__["b" /* UpdateOnNestedChangesMixin */]);
        }
        spec.mixins.push(ExposeStoreMixin);
    }
}
/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext: {
        _nestedStore: __WEBPACK_IMPORTED_MODULE_1_type_r__["Store"]
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
        var store = __WEBPACK_IMPORTED_MODULE_2__state__["c" /* StateMixin */].getStore.call(this, key);
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
//# sourceMappingURL=store.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__valuelink_link__ = __webpack_require__(19);
/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
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


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]);
__WEBPACK_IMPORTED_MODULE_0_type_r__["Mixable"].mixTo(__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]);
/**
 * Record
 */
__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"].mixins({
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
});
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
}(__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]));
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
}(__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]));
function getLinksCache(record) {
    return record._links || (record._links = new record.Attributes({}));
}
function cacheLink(links, record, key) {
    var cached = links[key], value = record[key];
    return cached && cached.value === value ? cached
        : links[key] = new RecordLink(record, key, value);
}
/***********************************
 * Collection
 */
__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"].Collection.mixins({
    // Boolean link to the record's presence in the collection
    linkContains: function (record) {
        return new CollectionLink(this, record);
    },
    // Link to collection's property
    linkAt: function (prop) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */].value(this[prop], function (x) { return _this[prop] = x; });
    }
});
/**
 * Boolean link to presence of NestedType's record in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 */
var CollectionLink = (function (_super) {
    __extends(CollectionLink, _super);
    function CollectionLink(collection, record) {
        var _this = _super.call(this, Boolean(collection._byId[record.cid])) || this;
        _this.collection = collection;
        _this.record = record;
        return _this;
    }
    CollectionLink.prototype.set = function (x) {
        this.collection.toggle(this.record, x);
    };
    return CollectionLink;
}(__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]));
//# sourceMappingURL=link.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = helpers;
/* unused harmony export objectHelpers */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return arrayHelpers; });
var ArrayProto = Array.prototype, ObjectProto = Object.prototype;
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
            var element = iterator(link.at(key), key);
            element === void 0 || (mapped.push(element));
        }
        return mapped;
    },
    remove: function (object, key) {
        delete object[key];
        return object;
    },
    // Shallow clone plain JS object
    clone: function (object) {
        var cloned = {};
        for (var key in object) {
            cloned[key] = object[key];
        }
        return cloned;
    }
};
// `map` and `clone` helpers for arrays.
var arrayHelpers = {
    // Shallow clone array
    clone: function (array) {
        return array.slice();
    },
    remove: function (array, i) {
        array.splice(i, 1);
        return array;
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
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
/* unused harmony export CustomLink */
/* unused harmony export CloneLink */
/* unused harmony export EqualsLink */
/* unused harmony export EnabledLink */
/* unused harmony export ContainsLink */
/* unused harmony export LinkAt */
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
/**
 * Advanced React links for purely functional two-way data binding
 *
 * MIT License, (c) 2016 Vlad Balin, Volicon.
 */

// Main Link class. All links must extend it.
var Link = (function () {
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
    Link.prototype.contains = function (element) {
        return new ContainsLink(this, element);
    };
    Link.prototype.push = function () {
        var array = __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* arrayHelpers */].clone(this.value);
        Array.prototype.push.apply(array, arguments);
        this.set(array);
    };
    Link.prototype.unshift = function () {
        var array = __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* arrayHelpers */].clone(this.value);
        Array.prototype.unshift.apply(array, arguments);
        this.set(array);
    };
    Link.prototype.splice = function () {
        var array = __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* arrayHelpers */].clone(this.value);
        Array.prototype.splice.apply(array, arguments);
        this.set(array);
    };
    Link.prototype.map = function (iterator) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(this.value).map(this, iterator);
    };
    Link.prototype.removeAt = function (key) {
        var value = this.value, _ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(value);
        this.set(_.remove(_.clone(value), key));
    };
    Link.prototype.at = function (key) {
        return new LinkAt(this, key);
    };
    Link.prototype.clone = function () {
        var value = this.value;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(value).clone(value);
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
}(Link));

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
}(Link));

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
}(Link));

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
}(Link));

var ContainsLink = (function (_super) {
    __extends(ContainsLink, _super);
    function ContainsLink(parent, element) {
        var _this = _super.call(this, parent.value.indexOf(element) >= 0) || this;
        _this.parent = parent;
        _this.element = element;
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
}(Link));

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
    ;
    return LinkAt;
}(Link));

//# sourceMappingURL=link.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(20);
var invariant = __webpack_require__(21);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ })
/******/ ]);
});