(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nestedtypes"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["nestedtypes", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["React"] = factory(require("nestedtypes"), require("react"), require("react-dom"));
	else
		root["React"] = factory(root["Nested"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return assignToState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__link__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component__ = __webpack_require__(20);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1_type_r__, "define")) __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1_type_r__["define"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1_type_r__, "mixins")) __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__define__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__define__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__link__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__component__["a"]; });





// extend React namespace
var ReactMVx = Object.create(__WEBPACK_IMPORTED_MODULE_0_react__);
// Make it compatible with ES6 module format.
ReactMVx.default = ReactMVx;
// listenToProps, listenToState, model, attributes, Model
ReactMVx.define = __WEBPACK_IMPORTED_MODULE_1_type_r__["define"];
ReactMVx.mixins = __WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"];
ReactMVx.Node = __WEBPACK_IMPORTED_MODULE_2__define__["c" /* Node */].value(null);
ReactMVx.Element = __WEBPACK_IMPORTED_MODULE_2__define__["a" /* Element */].value(null);
ReactMVx.Link = __WEBPACK_IMPORTED_MODULE_3__link__["a" /* default */];
ReactMVx.Component = __WEBPACK_IMPORTED_MODULE_4__component__["a" /* Component */];
var assignToState = ReactMVx.assignToState = function (key) {
    return function (prop) {
        this.state.assignFrom((_a = {}, _a[key] = prop && prop instanceof __WEBPACK_IMPORTED_MODULE_3__link__["a" /* default */] ? prop.value : prop, _a));
        var _a;
    };
};
/* harmony default export */ __webpack_exports__["f"] = (ReactMVx);

//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = compileSpecs;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);


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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = onDefine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__props__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typeSpecs__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__typeSpecs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pureRender__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__pureRender__["a"]; });





function onDefine(definition, BaseClass) {
    // Initialize mixins placeholder...
    __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].call(this, definition, BaseClass);
    __WEBPACK_IMPORTED_MODULE_2__state__["c" /* default */].call(this, definition, BaseClass);
    __WEBPACK_IMPORTED_MODULE_3__context__["a" /* default */].call(this, definition, BaseClass);
    __WEBPACK_IMPORTED_MODULE_4__props__["a" /* default */].call(this, definition, BaseClass);
    __WEBPACK_IMPORTED_MODULE_0_type_r__["Messenger"].onDefine.call(this, definition, BaseClass);
}
;


//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = process;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UpdateOnNestedChangesMixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        var BaseClass = State || prototype.State || __WEBPACK_IMPORTED_MODULE_0_type_r__["Record"];
        var ComponentState = (function (_super) {
            __extends(ComponentState, _super);
            function ComponentState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ComponentState;
        }(BaseClass));
        ComponentState.attributes = state;
        ComponentState = __decorate([
            __WEBPACK_IMPORTED_MODULE_0_type_r__["define"]
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
        _nestedStore: __WEBPACK_IMPORTED_MODULE_0_type_r__["Store"]
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
//# sourceMappingURL=state.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
  module.exports = __webpack_require__(12)();
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createChangeTokensConstructor;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyPropsChangeTokensCtor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PureRenderMixin; });
function createChangeTokensConstructor(props) {
    var propNames = Object.keys(props);
    var PropsChangeTokens = new Function('p', 's', "\n        var v;\n        this._s = s && s._changeToken;\n        " + propNames.map(function (name) { return "\n            this." + name + " = ( ( v = p." + name + ") && v._changeToken ) || v;\n        "; }).join('') + "\n    ");
    PropsChangeTokens.prototype._hasChanges = new Function('p', 's', "\n        var v;\n        return ( ( s && s._changeToken ) !== this._s ) " + propNames.map(function (name) { return " ||\n            this." + name + " !== ( ( ( v = p." + name + ") && v._changeToken ) || v )\n        "; }).join('') + ";\n    ");
    return PropsChangeTokens;
}
;
var EmptyPropsChangeTokensCtor = createChangeTokensConstructor({});
var PureRenderMixin = {
    shouldComponentUpdate: function (nextProps) {
        return this._propsChangeTokens._hasChanges(nextProps);
    },
    componentDidMount: updateChangeTokens,
    componentDidUpdate: updateChangeTokens
};
function updateChangeTokens() {
    this._propsChangeTokens = new this.PropsChangeTokens(this.props, this.state);
}
//# sourceMappingURL=pureRender.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["useView"] = useView;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mvx__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "define", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "assignToState", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_element__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subview", function() { return __WEBPACK_IMPORTED_MODULE_4__view_element__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_view__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createClass__ = __webpack_require__(23);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_3_prop_types__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return __WEBPACK_IMPORTED_MODULE_6__createClass__["a"]; });
// Re-export react-mvx

var NestedReact = Object.create(__WEBPACK_IMPORTED_MODULE_0__react_mvx__["f" /* default */]);
/* harmony default export */ __webpack_exports__["default"] = (NestedReact);

// NestedReact backward compatibility layer




NestedReact.subview = __WEBPACK_IMPORTED_MODULE_4__view_element__["a" /* default */];



NestedReact.createClass = __WEBPACK_IMPORTED_MODULE_6__createClass__["a" /* default */];
Object.defineProperty(NestedReact, 'PropTypes', { value: __WEBPACK_IMPORTED_MODULE_3_prop_types__ });

var BaseView;
// export hook to override base View class used...
function useView(View) {
    BaseView = Object(__WEBPACK_IMPORTED_MODULE_5__component_view__["a" /* default */])(View);
}
var onDefine = NestedReact.Component.onDefine;
NestedReact.Component.onDefine = function (definitions, BaseClass) {
    this.View = BaseView.extend({ reactClass: this });
    return onDefine.call(this, definitions, BaseClass);
};
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onDefine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(5);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


function onDefine(definition, BaseClass) {
    var store = definition.store, StoreClass = definition.Store;
    if (store && store instanceof __WEBPACK_IMPORTED_MODULE_0_type_r__["Store"]) {
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
            var BaseClass_1 = StoreClass || this.prototype.Store || __WEBPACK_IMPORTED_MODULE_0_type_r__["Store"];
            var InternalStore = (function (_super) {
                __extends(InternalStore, _super);
                function InternalStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InternalStore;
            }(BaseClass_1));
            InternalStore.attrbutes = store;
            InternalStore = __decorate([
                __WEBPACK_IMPORTED_MODULE_0_type_r__["define"]
            ], InternalStore);
            ;
            this.prototype.Store = InternalStore;
        }
        else if (StoreClass) {
            this.prototype.Store = StoreClass;
        }
        this.mixins.merge([InternalStoreMixin, __WEBPACK_IMPORTED_MODULE_1__state__["b" /* UpdateOnNestedChangesMixin */], ExposeStoreMixin]);
    }
}
/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext: {
        _nestedStore: __WEBPACK_IMPORTED_MODULE_0_type_r__["Store"]
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
        var store = __WEBPACK_IMPORTED_MODULE_1__state__["a" /* StateMixin */].getStore.call(this, key);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onDefine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);


function onDefine(_a, BaseClass) {
    var context = _a.context, childContext = _a.childContext;
    var prototype = this.prototype;
    if (context) {
        // Merge in inherited members...
        prototype._context = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].defaults(context, BaseClass.prototype._context || {});
        // Compile to propTypes...
        this.contextTypes = Object(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* compileSpecs */])(context).propTypes;
    }
    if (childContext) {
        prototype._childContext = __WEBPACK_IMPORTED_MODULE_1_type_r__["tools"].defaults(childContext, BaseClass.prototype._childContext);
        this.childContextTypes = Object(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* compileSpecs */])(childContext).propTypes;
    }
}
//# sourceMappingURL=context.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(13);
var invariant = __webpack_require__(14);
var ReactPropTypesSecret = __webpack_require__(15);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
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
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
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
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onDefine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeSpecs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pureRender__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_type_r__);
/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */



function onDefine(_a, BaseClass) {
    var props = _a.props, pureRender = _a.pureRender;
    var prototype = this.prototype;
    // process props spec...
    if (props) {
        // Merge with inherited members...
        prototype._props = __WEBPACK_IMPORTED_MODULE_2_type_r__["tools"].defaults(props, BaseClass.prototype._props || {});
        var _b = Object(__WEBPACK_IMPORTED_MODULE_0__typeSpecs__["c" /* compileSpecs */])(props), propTypes = _b.propTypes, defaults = _b.defaults, watchers = _b.watchers, changeHandlers = _b.changeHandlers;
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
            prototype.PropsChangeTokens = Object(__WEBPACK_IMPORTED_MODULE_1__pureRender__["c" /* createChangeTokensConstructor */])(props);
        }
    }
    if (pureRender) {
        this.mixins.merge([__WEBPACK_IMPORTED_MODULE_1__pureRender__["b" /* PureRenderMixin */]]);
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

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__valuelink_link__ = __webpack_require__(18);
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
__WEBPACK_IMPORTED_MODULE_0_type_r__["Mixable"].mixins.populate(__WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */]);
/**
 * Record
 */
__WEBPACK_IMPORTED_MODULE_0_type_r__["MixinsState"].get(__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"]).merge([{
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
__WEBPACK_IMPORTED_MODULE_0_type_r__["MixinsState"].get(__WEBPACK_IMPORTED_MODULE_0_type_r__["Record"].Collection).merge([{
        // Boolean link to the record's presence in the collection
        linkContains: function (record) {
            return new CollectionLink(this, record);
        },
        // Link to collection's property
        linkAt: function (prop) {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_1__valuelink_link__["a" /* Link */].value(this[prop], function (x) { return _this[prop] = x; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
/* unused harmony export CustomLink */
/* unused harmony export CloneLink */
/* unused harmony export EqualsLink */
/* unused harmony export EnabledLink */
/* unused harmony export ContainsLink */
/* unused harmony export LinkAt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(19);
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
        return Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(this.value).map(this, iterator);
    };
    Link.prototype.removeAt = function (key) {
        var value = this.value, _ = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(value);
        this.set(_.remove(_.clone(value), key));
    };
    Link.prototype.at = function (key) {
        return new LinkAt(this, key);
    };
    Link.prototype.clone = function () {
        var value = this.value;
        return Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* helpers */])(value).clone(value);
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
/* 19 */
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_r__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(4);
/**
 * React-Type-R component base class. Overrides React component.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Component = (function (_super) {
    __extends(Component, _super);
    function Component(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._initializeState();
        return _this;
    }
    Component.prototype.linkAt = function (key) {
        // Quick and dirty hack to suppres type error - refactor later.
        return this.state.linkAt(key);
    };
    Component.prototype.linkAll = function () {
        // Quick and dirty hack to suppres type error - refactor later.
        var state = this.state;
        return state.linkAll.apply(state, arguments);
    };
    Component.prototype.linkPath = function (path) {
        return this.state.linkPath(path);
    };
    Object.defineProperty(Component.prototype, "links", {
        get: function () {
            return this.state._links;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype._initializeState = function () {
        this.state = null;
    };
    Component.prototype.assignToState = function (x, key) {
        this.state.assignFrom((_a = {}, _a[key] = x, _a));
        var _a;
    };
    Component.prototype.componentWillUnmount = function () {
        this.dispose();
    };
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    Component.prototype.transaction = function (fun) {
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
    Component.prototype.asyncUpdate = function () {
        this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
Component.onDefine = __WEBPACK_IMPORTED_MODULE_2__define__["d" /* default */];
Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_type_r__["define"])({
        PropsChangeTokens: __WEBPACK_IMPORTED_MODULE_2__define__["b" /* EmptyPropsChangeTokensCtor */]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_1_type_r__["definitions"])({
        // Definitions to be extracted from mixins and statics and passed to `onDefine()`
        state: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].merge,
        State: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].value,
        store: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].merge,
        Store: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].value,
        props: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].merge,
        context: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].merge,
        childContext: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].merge,
        pureRender: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].protoValue
    }),
    Object(__WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"])({
        // Apply old-school React mixin rules.
        componentWillMount: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classLast,
        componentDidMount: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classLast,
        componentWillReceiveProps: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classLast,
        componentWillUpdate: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classLast,
        componentDidUpdate: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classLast,
        componentWillUnmount: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].classFirst,
        // And a bit more to fix inheritance quirks.
        shouldComponentUpdate: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].some,
        getChildContext: __WEBPACK_IMPORTED_MODULE_1_type_r__["mixinRules"].defaults
    })
    // Component can send and receive events...
    ,
    Object(__WEBPACK_IMPORTED_MODULE_1_type_r__["mixins"])(__WEBPACK_IMPORTED_MODULE_1_type_r__["Messenger"])
], Component);

function returnFalse() { return false; }
// Looks like React guys _really_ want to deprecate it. But no way.
// We will work around their attempt.
Object.defineProperty(Component.prototype, 'isMounted', {
    value: function isMounted() {
        return !this._disposed;
    }
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mvx__ = __webpack_require__(1);
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
        return __WEBPACK_IMPORTED_MODULE_0__react_mvx__["f" /* default */].createElement('div', {
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
}(__WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* Component */]));
/* harmony default export */ __webpack_exports__["a"] = (BackboneView);
//# sourceMappingURL=view-element.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = use;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_type_r___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_type_r__);



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
                this.prevState = component.state;
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
            return this.component && this.component.state;
        }
    });
    return ComponentView;
}
//# sourceMappingURL=component-view.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createClass;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mvx__ = __webpack_require__(1);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
    var Subclass = __WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* Component */].extend(__assign({ 
        // Override constructor to autobind all the methods...
        constructor: function () {
            __WEBPACK_IMPORTED_MODULE_0__react_mvx__["a" /* Component */].apply(this, arguments);
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
//# sourceMappingURL=createClass.js.map

/***/ })
/******/ ]);
});