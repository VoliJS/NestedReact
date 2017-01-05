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

	eval("/**\r\n * Copyright (c) 2015-present, Facebook, Inc.\r\n * All rights reserved.\r\n *\r\n * This source code is licensed under the BSD-style license found in the\r\n * LICENSE file in the root directory of this source tree. An additional grant\r\n * of patent rights can be found in the PATENTS file in the same directory.\r\n *\r\n * \r\n */\n'use strict';\n\n/* global chrome */\n\n// proxy from main page to devtools (via the background page)\n\nvar port = chrome.runtime.connect({\n  name: 'content-script'\n});\n\nport.onMessage.addListener(handleMessageFromDevtools);\nport.onDisconnect.addListener(handleDisconnect);\nwindow.addEventListener('message', handleMessageFromPage);\n\nwindow.postMessage({\n  source: 'react-devtools-content-script',\n  hello: true\n}, '*');\n\nfunction handleMessageFromDevtools(message) {\n  window.postMessage({\n    source: 'react-devtools-content-script',\n    payload: message\n  }, '*');\n}\n\nfunction handleMessageFromPage(evt) {\n  if (evt.data && evt.data.source === 'react-devtools-bridge') {\n    // console.log('page -> rep -> dev', evt.data);\n    port.postMessage(evt.data.payload);\n  }\n}\n\nfunction handleDisconnect() {\n  window.removeEventListener('message', handleMessageFromPage);\n  window.postMessage({\n    source: 'react-devtools-content-script',\n    payload: {\n      type: 'event',\n      evt: 'shutdown'\n    }\n  }, '*');\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29udGVudFNjcmlwdC5qcz9jZTVmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxyXG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cclxuICpcclxuICogQGZsb3dcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIGdsb2JhbCBjaHJvbWUgKi9cclxuXHJcbi8vIHByb3h5IGZyb20gbWFpbiBwYWdlIHRvIGRldnRvb2xzICh2aWEgdGhlIGJhY2tncm91bmQgcGFnZSlcclxudmFyIHBvcnQgPSBjaHJvbWUucnVudGltZS5jb25uZWN0KHtcclxuICBuYW1lOiAnY29udGVudC1zY3JpcHQnLFxyXG59KTtcclxuXHJcbnBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGhhbmRsZU1lc3NhZ2VGcm9tRGV2dG9vbHMpO1xyXG5wb3J0Lm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcihoYW5kbGVEaXNjb25uZWN0KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlRnJvbVBhZ2UpO1xyXG5cclxud2luZG93LnBvc3RNZXNzYWdlKHtcclxuICBzb3VyY2U6ICdyZWFjdC1kZXZ0b29scy1jb250ZW50LXNjcmlwdCcsXHJcbiAgaGVsbG86IHRydWUsXHJcbn0sICcqJyk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlRnJvbURldnRvb2xzKG1lc3NhZ2UpIHtcclxuICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xyXG4gICAgc291cmNlOiAncmVhY3QtZGV2dG9vbHMtY29udGVudC1zY3JpcHQnLFxyXG4gICAgcGF5bG9hZDogbWVzc2FnZSxcclxuICB9LCAnKicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlRnJvbVBhZ2UoZXZ0KSB7XHJcbiAgaWYgKGV2dC5kYXRhICYmIGV2dC5kYXRhLnNvdXJjZSA9PT0gJ3JlYWN0LWRldnRvb2xzLWJyaWRnZScpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdwYWdlIC0+IHJlcCAtPiBkZXYnLCBldnQuZGF0YSk7XHJcbiAgICBwb3J0LnBvc3RNZXNzYWdlKGV2dC5kYXRhLnBheWxvYWQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRGlzY29ubmVjdCgpIHtcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VGcm9tUGFnZSk7XHJcbiAgd2luZG93LnBvc3RNZXNzYWdlKHtcclxuICAgIHNvdXJjZTogJ3JlYWN0LWRldnRvb2xzLWNvbnRlbnQtc2NyaXB0JyxcclxuICAgIHBheWxvYWQ6IHtcclxuICAgICAgdHlwZTogJ2V2ZW50JyxcclxuICAgICAgZXZ0OiAnc2h1dGRvd24nLFxyXG4gICAgfSxcclxuICB9LCAnKicpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29udGVudFNjcmlwdC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);