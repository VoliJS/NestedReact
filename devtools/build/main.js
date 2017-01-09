/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("/**\r\n * Copyright (c) 2015-present, Facebook, Inc.\r\n * All rights reserved.\r\n *\r\n * This source code is licensed under the BSD-style license found in the\r\n * LICENSE file in the root directory of this source tree. An additional grant\r\n * of patent rights can be found in the PATENTS file in the same directory.\r\n *\r\n * \r\n */\n'use strict';\n\n/* global chrome */\n\nvar panelCreated = false;\n\nfunction createPanelIfReactLoaded() {\n  if (panelCreated) {\n    return;\n  }\n  chrome.devtools.inspectedWindow.eval('!!(\\n    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length || window.React\\n  )', function (pageHasReact, err) {\n    if (!pageHasReact || panelCreated) {\n      return;\n    }\n\n    clearInterval(loadCheckInterval);\n    panelCreated = true;\n    chrome.devtools.panels.create('React', '', 'panel.html', function (panel) {\n      var reactPanel = null;\n      panel.onShown.addListener(function (window) {\n        // when the user switches to the panel, check for an elements tab\n        // selection\n        window.panel.getNewSelection();\n        reactPanel = window.panel;\n        reactPanel.resumeTransfer();\n      });\n      panel.onHidden.addListener(function () {\n        if (reactPanel) {\n          reactPanel.hideHighlight();\n          reactPanel.pauseTransfer();\n        }\n      });\n    });\n  });\n}\n\nchrome.devtools.network.onNavigated.addListener(function () {\n  createPanelIfReactLoaded();\n});\n\n// Check to see if React has loaded once per second in case React is added\n// after page load\nvar loadCheckInterval = setInterval(function () {\n  createPanelIfReactLoaded();\n}, 1000);\n\ncreatePanelIfReactLoaded();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvbWFpbi5qcz8xYzkwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxyXG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cclxuICpcclxuICogQGZsb3dcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIGdsb2JhbCBjaHJvbWUgKi9cclxuXHJcbnZhciBwYW5lbENyZWF0ZWQgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhbmVsSWZSZWFjdExvYWRlZCgpIHtcclxuICBpZiAocGFuZWxDcmVhdGVkKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cuZXZhbChgISEoXHJcbiAgICBPYmplY3Qua2V5cyh3aW5kb3cuX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLl9yZW5kZXJlcnMpLmxlbmd0aCB8fCB3aW5kb3cuUmVhY3RcclxuICApYCwgZnVuY3Rpb24ocGFnZUhhc1JlYWN0LCBlcnIpIHtcclxuICAgIGlmICghcGFnZUhhc1JlYWN0IHx8IHBhbmVsQ3JlYXRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJJbnRlcnZhbChsb2FkQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICBwYW5lbENyZWF0ZWQgPSB0cnVlO1xyXG4gICAgY2hyb21lLmRldnRvb2xzLnBhbmVscy5jcmVhdGUoJ1JlYWN0JywgJycsICdwYW5lbC5odG1sJywgZnVuY3Rpb24ocGFuZWwpIHtcclxuICAgICAgdmFyIHJlYWN0UGFuZWwgPSBudWxsO1xyXG4gICAgICBwYW5lbC5vblNob3duLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgICAgIC8vIHdoZW4gdGhlIHVzZXIgc3dpdGNoZXMgdG8gdGhlIHBhbmVsLCBjaGVjayBmb3IgYW4gZWxlbWVudHMgdGFiXHJcbiAgICAgICAgLy8gc2VsZWN0aW9uXHJcbiAgICAgICAgd2luZG93LnBhbmVsLmdldE5ld1NlbGVjdGlvbigpO1xyXG4gICAgICAgIHJlYWN0UGFuZWwgPSB3aW5kb3cucGFuZWw7XHJcbiAgICAgICAgcmVhY3RQYW5lbC5yZXN1bWVUcmFuc2ZlcigpO1xyXG4gICAgICB9KTtcclxuICAgICAgcGFuZWwub25IaWRkZW4uYWRkTGlzdGVuZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHJlYWN0UGFuZWwpIHtcclxuICAgICAgICAgIHJlYWN0UGFuZWwuaGlkZUhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgcmVhY3RQYW5lbC5wYXVzZVRyYW5zZmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5jaHJvbWUuZGV2dG9vbHMubmV0d29yay5vbk5hdmlnYXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbigpIHtcclxuICBjcmVhdGVQYW5lbElmUmVhY3RMb2FkZWQoKTtcclxufSk7XHJcblxyXG4vLyBDaGVjayB0byBzZWUgaWYgUmVhY3QgaGFzIGxvYWRlZCBvbmNlIHBlciBzZWNvbmQgaW4gY2FzZSBSZWFjdCBpcyBhZGRlZFxyXG4vLyBhZnRlciBwYWdlIGxvYWRcclxudmFyIGxvYWRDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgY3JlYXRlUGFuZWxJZlJlYWN0TG9hZGVkKCk7XHJcbn0sIDEwMDApO1xyXG5cclxuY3JlYXRlUGFuZWxJZlJlYWN0TG9hZGVkKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbWFpbi5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);