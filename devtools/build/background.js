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

	eval("/**\r\n * Copyright (c) 2015-present, Facebook, Inc.\r\n * All rights reserved.\r\n *\r\n * This source code is licensed under the BSD-style license found in the\r\n * LICENSE file in the root directory of this source tree. An additional grant\r\n * of patent rights can be found in the PATENTS file in the same directory.\r\n *\r\n * \r\n */\n'use strict';\n\n/* global chrome */\n\nvar ports = {};\n\nchrome.runtime.onConnect.addListener(function (port) {\n  var tab = null;\n  var name = null;\n  if (isNumeric(port.name)) {\n    tab = port.name;\n    name = 'devtools';\n    installContentScript(+port.name);\n  } else {\n    tab = port.sender.tab.id;\n    name = 'content-script';\n  }\n\n  if (!ports[tab]) {\n    ports[tab] = {\n      devtools: null,\n      'content-script': null\n    };\n  }\n  ports[tab][name] = port;\n\n  if (ports[tab].devtools && ports[tab]['content-script']) {\n    doublePipe(ports[tab].devtools, ports[tab]['content-script']);\n  }\n});\n\nfunction isNumeric(str) {\n  return +str + '' === str;\n}\n\nfunction installContentScript(tabId) {\n  chrome.tabs.executeScript(tabId, { file: '/build/contentScript.js' }, function () {});\n}\n\nfunction doublePipe(one, two) {\n  one.onMessage.addListener(lOne);\n  function lOne(message) {\n    // console.log('dv -> rep', message);\n    two.postMessage(message);\n  }\n  two.onMessage.addListener(lTwo);\n  function lTwo(message) {\n    // console.log('rep -> dv', message);\n    one.postMessage(message);\n  }\n  function shutdown() {\n    one.onMessage.removeListener(lOne);\n    two.onMessage.removeListener(lTwo);\n    one.disconnect();\n    two.disconnect();\n  }\n  one.onDisconnect.addListener(shutdown);\n  two.onDisconnect.addListener(shutdown);\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmFja2dyb3VuZC5qcz85NjE2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxyXG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cclxuICpcclxuICogQGZsb3dcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIGdsb2JhbCBjaHJvbWUgKi9cclxudmFyIHBvcnRzID0ge307XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocG9ydCkge1xyXG4gIHZhciB0YWIgPSBudWxsO1xyXG4gIHZhciBuYW1lID0gbnVsbDtcclxuICBpZiAoaXNOdW1lcmljKHBvcnQubmFtZSkpIHtcclxuICAgIHRhYiA9IHBvcnQubmFtZTtcclxuICAgIG5hbWUgPSAnZGV2dG9vbHMnO1xyXG4gICAgaW5zdGFsbENvbnRlbnRTY3JpcHQoK3BvcnQubmFtZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhYiA9IHBvcnQuc2VuZGVyLnRhYi5pZDtcclxuICAgIG5hbWUgPSAnY29udGVudC1zY3JpcHQnO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFwb3J0c1t0YWJdKSB7XHJcbiAgICBwb3J0c1t0YWJdID0ge1xyXG4gICAgICBkZXZ0b29sczogbnVsbCxcclxuICAgICAgJ2NvbnRlbnQtc2NyaXB0JzogbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG4gIHBvcnRzW3RhYl1bbmFtZV0gPSBwb3J0O1xyXG5cclxuICBpZiAocG9ydHNbdGFiXS5kZXZ0b29scyAmJiBwb3J0c1t0YWJdWydjb250ZW50LXNjcmlwdCddKSB7XHJcbiAgICBkb3VibGVQaXBlKHBvcnRzW3RhYl0uZGV2dG9vbHMsIHBvcnRzW3RhYl1bJ2NvbnRlbnQtc2NyaXB0J10pO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBpc051bWVyaWMoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gK3N0ciArICcnID09PSBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc3RhbGxDb250ZW50U2NyaXB0KHRhYklkOiBudW1iZXIpIHtcclxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7ZmlsZTogJy9idWlsZC9jb250ZW50U2NyaXB0LmpzJ30sIGZ1bmN0aW9uKCkge1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb3VibGVQaXBlKG9uZSwgdHdvKSB7XHJcbiAgb25lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsT25lKTtcclxuICBmdW5jdGlvbiBsT25lKG1lc3NhZ2UpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdkdiAtPiByZXAnLCBtZXNzYWdlKTtcclxuICAgIHR3by5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcbiAgdHdvLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihsVHdvKTtcclxuICBmdW5jdGlvbiBsVHdvKG1lc3NhZ2UpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdyZXAgLT4gZHYnLCBtZXNzYWdlKTtcclxuICAgIG9uZS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2h1dGRvd24oKSB7XHJcbiAgICBvbmUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGxPbmUpO1xyXG4gICAgdHdvLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihsVHdvKTtcclxuICAgIG9uZS5kaXNjb25uZWN0KCk7XHJcbiAgICB0d28uZGlzY29ubmVjdCgpO1xyXG4gIH1cclxuICBvbmUub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKHNodXRkb3duKTtcclxuICB0d28ub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKHNodXRkb3duKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2JhY2tncm91bmQuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);