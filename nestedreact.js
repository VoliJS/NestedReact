(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("nestedtypes"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "nestedtypes"], factory);
	else if(typeof exports === 'object')
		exports["React"] = factory(require("react"), require("react-dom"), require("nestedtypes"));
	else
		root["React"] = factory(root["React"], root["ReactDOM"], root["Nested"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React    = __webpack_require__( 1 ),
	    ReactDOM = __webpack_require__( 2 ),
	    Nested   = __webpack_require__( 3 ),
	    $        = Nested.$;
	
	// extend React namespace
	var NestedReact = module.exports = Object.create( React );
	
	// listenToProps, listenToState, model, attributes, Model
	NestedReact.createClass = __webpack_require__( 4 );
	
	var ComponentView = __webpack_require__( 7 );
	
	// export hook to override base View class used...
	NestedReact.useView = function( View ){
	    NestedReact._BaseView = ComponentView.use( View );
	};
	
	NestedReact.useView( Nested.View );
	
	// React component for attaching views
	NestedReact.subview = __webpack_require__( 9 );
	
	var propTypes  = __webpack_require__( 6 );
	NestedReact.Node = propTypes.Node.value( null );
	NestedReact.Element = propTypes.Element.value( null );
	
	// Extend react components to have backbone-style jquery accessors
	var Component     = React.createClass( { render : function(){} } ),
	    BaseComponent = Object.getPrototypeOf( Component.prototype );
	
	Object.defineProperties( BaseComponent, {
	    el  : { get : function(){ return ReactDOM.findDOMNode( this ); } },
	    $el : { get : function(){ return $( this.el ); } },
	    $   : { value : function( sel ){ return this.$el.find( sel ); } }
	} );
	
	NestedReact.Link = __webpack_require__( 11 );


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React      = __webpack_require__( 1 ),
	    Nested     = __webpack_require__( 3 ),
	    pureRender = __webpack_require__( 5 ),
	    propTypes  = __webpack_require__( 6 );
	
	function forceUpdate(){ this.forceUpdate(); }
	
	var Events = Object.assign( {
	    componentWillUnmount : function(){
	        this.stopListening();
	    }
	}, Nested.Events );
	
	function registerPropsListener( component, prevProps, name, events ){
	    var prevEmitter = prevProps[ name ],
	        emitter     = component.props[ name ];
	
	    if( prevEmitter !== emitter ){
	        prevEmitter && component.stopListening( prevEmitter );
	
	        if( emitter ){
	            if( typeof events === 'object' ){
	                component.listenTo( emitter, events );
	            }
	            else{
	                component.listenTo( emitter, events || emitter.triggerWhenChanged, forceUpdate );
	            }
	        }
	    }
	}
	
	function regHashPropsListeners( a_prevProps ){
	    var prevProps = a_prevProps || {},
	        updateOn  = this.listenToProps;
	
	    for( var prop in updateOn ){
	        registerPropsListener( this, prevProps, prop, updateOn[ prop ] );
	    }
	}
	
	var ListenToProps = {
	    componentDidMount  : regHashPropsListeners,
	    componentDidUpdate : regHashPropsListeners
	};
	
	function regArrayPropListeners( a_prevProps ){
	    var prevProps = a_prevProps || {},
	        updateOn  = this.listenToProps;
	
	    for( var i = 0; i < updateOn.length; i++ ){
	        registerPropsListener( this, prevProps, updateOn[ i ] )
	    }
	}
	
	var ListenToPropsArray = {
	    componentDidMount  : regArrayPropListeners,
	    componentDidUpdate : regArrayPropListeners
	};
	
	var ModelState = {
	    listenToState : 'change',
	    model         : null,
	
	    getInitialState : function(){
	        this.model = this.props._keepState || new this.Model();
	        // enable owner references in the model to access component props
	        this.model._owner = this;
	
	        return this.model;
	    },
	
	    // reference global store to fix model's store locator
	    getStore : function(){
	        return this.model._defaultStore;
	    },
	
	    componentDidMount : function(){
	        var events = this.listenToState;
	        events && this.listenTo( this.model, events, forceUpdate );
	    },
	
	    componentWillUnmount : function(){
	        this.model._owner = null;
	    }
	};
	
	function createClass( spec ){
	    var mixins = spec.mixins || ( spec.mixins = [] );
	
	
	    // process context specs...
	    var context = getTypeSpecs( spec, 'context' );
	    if( context ){
	        spec.contextTypes = propTypes.parseProps( context ).propTypes;
	        delete spec.context;
	    }
	
	    var childContext = getTypeSpecs( spec, 'childContext' );
	    if( childContext ){
	        spec.childContextTypes = propTypes.parseProps( childContext ).propTypes;
	        delete spec.childContext;
	    }
	
	    // process state spec...
	    var attributes = getTypeSpecs( spec, 'attributes', 'state' );
	    if( attributes ){
	        var BaseModel = spec.Model || Nested.Model;
	        spec.Model    = BaseModel.extend( { defaults : attributes } );
	        delete spec.state;
	    }
	
	    if( spec.Model ) mixins.push( ModelState );
	
	    // process props spec...
	    var props = getTypeSpecs( spec, 'props' );
	
	    if( props ){
	        var parsedProps = propTypes.parseProps( props );
	
	        spec.propTypes = parsedProps.propTypes;
	
	        if( parsedProps.defaults ){
	            spec.getDefaultProps = function(){
	                return parsedProps.defaults;
	            }
	        }
	
	        delete spec.props;
	    }
	
	    // process listenToProps spec
	    var listenToProps = spec.listenToProps;
	    if( listenToProps ){
	        if( typeof listenToProps === 'string' ){
	            spec.listenToProps = listenToProps.split( ' ' );
	            mixins.unshift( ListenToPropsArray );
	        }
	        else{
	            mixins.unshift( ListenToProps );
	        }
	    }
	
	    // add Events capabilities
	    mixins.push( Events );
	
	    // compile pure render mixin
	    if( spec.propTypes && spec.pureRender ){
	        mixins.push( pureRender( spec.propTypes ) );
	    }
	
	    var component = React.createClass( spec );
	
	    // attach lazily evaluated backbone View class
	    var NestedReact = this;
	
	    Object.defineProperty( component, 'View', {
	        get : function(){
	            return this._View || ( this._View = NestedReact._BaseView.extend( { reactClass : component } ) );
	        }
	    } );
	
	    return component;
	}
	
	function getTypeSpecs( spec, name1, name2 ){
	    var attributes = null;
	
	    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
	        var mixin      = spec.mixins[ i ],
	            mixinAttrs = mixin[ name1 ] || ( name2 && mixin[ name2 ] );
	
	        if( mixinAttrs ){
	            attributes || ( attributes = {} );
	            Object.assign( attributes, mixinAttrs );
	        }
	    }
	
	    var specAttrs = spec[ name1 ] || ( name2 && spec[ name2 ] );
	    if( specAttrs ){
	        if( attributes ){
	            Object.assign( attributes, specAttrs );
	        }
	        else{
	            attributes = specAttrs;
	        }
	    }
	
	    return attributes;
	}
	
	module.exports = createClass;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function( propTypes ){
	    var ctor      = [ 'var v;this._s=s&&s._changeToken' ],
	        isChanged = [ 'var v;return(s&&s._changeToken!==t._s)' ];
	
	    for( var name in propTypes ){
	        var propExpr = '((v=p.' + name + ')&&v._changeToken)||v';
	
	        ctor.push( 'this.' + name + '=' + propExpr );
	        isChanged.push( 't.' + name + '!==(' + propExpr + ')' );
	    }
	
	    var ChangeTokens = new Function( 'p', 's', ctor.join( ';' ) ),
	        isChanged    = new Function( 't', 'p', 's', isChanged.join( '||' ) );
	
	    ChangeTokens.prototype = null;
	
	    return {
	        _changeTokens : null,
	
	        shouldComponentUpdate : function( nextProps ){
	            return isChanged( this._changeTokens, nextProps, this.state );
	        },
	
	        componentDidMount  : function(){
	            this._changeTokens = new ChangeTokens( this.props, this.state );
	        },
	        componentDidUpdate : function(){
	            this._changeTokens = new ChangeTokens( this.props, this.state );
	        }
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Nested = __webpack_require__( 3 ),
	    React  = __webpack_require__( 1 );
	
	function parseProps( props ){
	    var propTypes = {},
	        defaults,
	        modelProto = Nested.Model.defaults( props ).prototype;
	
	    modelProto.forEachAttr( modelProto.__attributes, function( spec, name ){
	        if( name !== 'id' ){
	            propTypes[ name ] = translateType( spec.type );
	
	            if( spec.value !== void 0 ){
	                defaults || ( defaults = {} );
	                defaults[ name ] = spec.value;
	            }
	        }
	    });
	
	    return {
	        propTypes : propTypes,
	        defaults : defaults
	    };
	}
	
	var PropTypes = React.PropTypes;
	
	function Node(){}
	function Element(){}
	
	function translateType( Type ){
	    switch( Type ){
	        case Number :
	        case Integer :
	            return PropTypes.number;
	        case String :
	            return PropTypes.string;
	        case Boolean :
	            return PropTypes.bool;
	        case Array :
	            return PropTypes.array;
	        case Function :
	            return PropTypes.func;
	        case Object :
	            return PropTypes.object;
	        case Node :
	            return PropTypes.node;
	        case Element :
	            return PropTypes.element;
	        case void 0 :
	        case null :
	            return PropTypes.any;
	        default:
	            return PropTypes.instanceOf( Type );
	    }
	}
	
	exports.Node = Node;
	exports.Element = Element;
	exports.parseProps = parseProps;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React    = __webpack_require__( 1 ),
	    _        = __webpack_require__( 8 ),
	    ReactDOM = __webpack_require__( 2 );
	
	module.exports.use = function( View ){
	    var dispose    = View.prototype.dispose || function(){},
	        setElement = View.prototype.setElement;
	
	    var ComponentView = View.extend( {
	        reactClass : null,
	        props      : {},
	        element    : null,
	
	        initialize : function( props ){
	            // memorise arguments to pass to React
	            this.options = props || {};
	        },
	
	        setElement : function(){
	            this.unmountComponent();
	            return setElement.apply( this, arguments );
	        },
	
	        // cached instance of react component...
	        component : null,
	        prevState : null,
	        
	        resize : function(){
	            Page.forceResize();
	        },
	
	        render : function(){
	            var options   = this.prevState ? _.extend( { _keepState : this.prevState }, this.options ) : this.options,
	                element   = React.createElement( this.reactClass, options ),
	                component = ReactDOM.render( element, this.el );
	
	            this.component || this.mountComponent( component );
	        },
	
	        mountComponent : function( component ){
	            this.component = component;
	            this.prevState = null;
	
	            component.trigger && this.listenTo( component, 'all', function(){
	                this.trigger.apply( this, arguments );
	            } );
	        },
	
	        unmountComponent : function(){
	            var component = this.component;
	
	            if( component ){
	                this.prevState = component.model;
	
	                if( component.trigger ){
	                    this.stopListening( component );
	                }
	
	                ReactDOM.unmountComponentAtNode( this.el );
	                this.component = null;
	            }
	        },
	
	        dispose : function(){
	            this.unmountComponent();
	            return dispose.apply( this, arguments );
	        }
	    } );
	
	    Object.defineProperty( ComponentView.prototype, 'model', {
	        get : function(){
	            this.component || this.render();
	            return this.component && this.component.model;
	        }
	    } );
	
	    return ComponentView;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__( 1 ),
	    jsonNotEqual = __webpack_require__( 10 ).jsonNotEqual;
	
	module.exports = React.createClass({
	    displayName : 'BackboneView',
	
	    propTypes : {
	        View : React.PropTypes.func.isRequired,
	        options : React.PropTypes.object
	    },
	
	    shouldComponentUpdate : function( next ){
	        var props = this.props;
	        return next.View !== props.View || jsonNotEqual( next.options, props.options );
	    },
	
	    hasUnsavedChanges : function(){
	        var view = this.view;
	
	        return view && (
	               typeof view.hasUnsavedChanges === 'function' ? view.hasUnsavedChanges() : view.hasUnsavedChanges
	            );
	    },
	
	    render : function(){
	        return React.DOM.div({
	            ref : 'subview',
	            className : this.props.className
	        });
	    },
	
	    componentDidMount : function(){
	        this._mountView();
	    },
	    componentDidUpdate : function(){
	        this._dispose();
	        this._mountView();
	    },
	    componentWillUnmount : function(){
	        this._dispose();
	    },
	
	    _mountView: function () {
	        var el = this.refs.subview,
	            p = this.props;
	
	        var view = this.view = p.options ? new p.View( p.options ) : new p.View();
	
	        el.appendChild( view.el );
	        view.render();
	    },
	
	    _dispose : function(){
	        var view = this.view;
	        if( view ){
	            view.stopListening();
	            if( view.dispose ) view.dispose();
	            this.refs.subview.innerHTML = "";
	            this.view = null;
	        }
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	// equality checking for deep JSON comparison of plain Array and Object
	var ArrayProto = Array.prototype,
	    ObjectProto = Object.prototype;
	
	exports.jsonNotEqual = jsonNotEqual;
	function jsonNotEqual( objA, objB) {
	    if (objA === objB) {
	        return false;
	    }
	
	    if (typeof objA !== 'object' || !objA ||
	        typeof objB !== 'object' || !objB ) {
	        return true;
	    }
	
	    var protoA = Object.getPrototypeOf( objA ),
	        protoB = Object.getPrototypeOf( objB );
	
	    if( protoA !== protoB ) return true;
	
	    if( protoA === ArrayProto ) return arraysNotEqual( objA, objB );
	    if( protoA === ObjectProto ) return objectsNotEqual( objA, objB );
	
	    return true;
	}
	
	function objectsNotEqual( objA, objB ){
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	
	    if (keysA.length !== keysB.length) {
	        return true;
	    }
	
	    // Test for A's keys different from B.
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	
	    for (var i = 0; i < keysA.length; i++) {
	        var key = keysA[i];
	        if ( !bHasOwnProperty( key ) || jsonNotEqual( objA[ key ], objB[ key ] )) {
	            return true;
	        }
	    }
	
	    return false;
	}
	
	function arraysNotEqual( a, b ){
	    if( a.length !== b.length ) return true;
	
	    for( var i = 0; i < a.length; i++ ){
	        if( jsonNotEqual( a[ i ], b[ i ] ) ) return true;
	    }
	
	    return false;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Nested = __webpack_require__( 3 ),
	    Link   = __webpack_require__( 12 );
	
	module.exports = Nested.Link = Link;
	Object.extend.attach( Link );
	
	/**
	 * Link to NestedType's model attribute.
	 * Strict evaluation of value, lazy evaluation of validation error.
	 * Safe implementation of _changeToken.
	 * @param model
	 * @param attr
	 * @constructor
	 */
	function ModelLink( model, attr ){
	    this.value = model[ attr ];
	    this.model = model;
	    this.attr  = attr;
	}
	
	ModelLink.prototype = Object.create( Link.prototype, {
	    constructor : { value : ModelLink },
	    set         : {
	        value : function( x ){
	            this.model[ this.attr ] = x;
	        }
	    },
	
	    error : {
	        get : function(){
	            if( this._error === void 0 ){
	                this._error = this.model.getValidationError( this.attr );
	            }
	
	            return this._error;
	        },
	
	        set : function( x ){
	            this._error = x;
	        }
	    },
	
	    _changeToken : {
	        get : function(){ return this.model._changeToken; }
	    }
	} );
	
	/**
	 * Boolean link to presence of NestedType's model in collection.
	 * Strict evaluation of value, no error.
	 * Safe implementation of _changeToken.
	 * @param collection
	 * @param model
	 * @constructor
	 */
	function CollectionLink( collection, model ){
	    this.value      = Boolean( collection.get( model ) );
	    this.collection = collection;
	    this.model      = model;
	}
	
	CollectionLink.prototype = Object.create( Link.prototype, {
	    _changeToken : {
	        get : function(){ return this.collection._changeToken; }
	    }
	} );
	
	CollectionLink.prototype.constructor = CollectionLink;
	CollectionLink.prototype.set         = function( x ){
	    this.collection.toggle( this.model, x );
	};
	
	var CollectionProto = Nested.Collection.prototype;
	
	CollectionProto.hasLink = function( model ){
	    return new CollectionLink( this, model );
	};
	
	CollectionProto.getLink = function( prop ){
	    return new ModelLink( this, prop );
	};
	
	var ModelProto      = Nested.Model.prototype;
	
	ModelProto.getLink = function( attr ){
	    return new ModelLink( this, attr );
	};
	
	
	function ModelDeepLink( model, path, options ){
	    this.value   = model.deepGet( path );
	    this.model   = model;
	    this.path    = path;
	    this.options = options;
	}
	
	ModelDeepLink.prototype = Object.create( Link.prototype, {
	    constructor : { value : ModelDeepLink },
	
	    error : {
	        get : function(){
	            if( this._error === void 0 ){
	                this._error = this.model.deepValidationError( this.path ) || null;
	            }
	
	            return this._error;
	        },
	
	        set : function( x ){
	            this._error = x;
	        }
	    },
	
	    _changeToken : {
	        get : function(){ return this.model._changeToken; }
	    }
	} );
	
	ModelDeepLink.prototype.set = function( x ){
	    this.model.deepSet( this.path, x, this.options );
	};
	
	ModelProto.deepLink = function( path, options ){
	    return new ModelDeepLink( this, path, options )
	};
	
	Nested.link = function( reference ){
	    var getMaster = Nested.parseReference( reference );
	
	    function setLink( value ){
	        var link = getMaster.call( this );
	        link && link.set( value );
	    }
	
	    function getLink(){
	        var link = getMaster.call( this );
	        return link && link.value;
	    }
	
	    var LinkAttribute = Nested.attribute.Type.extend( {
	        createPropertySpec : function(){
	            return {
	                // call to optimized set function for single argument. Doesn't work for backbone types.
	                set : setLink,
	
	                // attach get hook to the getter function, if present
	                get : getLink
	            }
	        },
	
	        set : setLink
	    } );
	
	    var options       = Nested.attribute( { toJSON : false } );
	    options.Attribute = LinkAttribute;
	    return options;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Advanced React links for purely functional two-way data binding
	 *
	 * MIT License, (c) 2016 Vlad Balin, Volicon.
	 */
	
	/**
	 * Link public constructor
	 * @param {*} value - link value
	 * @param {function(*)=} requestChange - function to set linked value.
	 * @constructor
	 */
	function Link( value, requestChange ){
	    this.value = value;
	    this.set   = requestChange || doNothing;
	}
	
	/**
	 * Create link to component's state attribute
	 * @param {React.Component} component - It's your `this` in component's `render()`
	 * @param {string} attr - state attribute's name
	 * @returns {Link}
	 */
	Link.state = function( component, attr ){
	    return new Link( component.state[ attr ], function( x ){
	        var nextState     = {};
	        nextState[ attr ] = x;
	        component.setState( nextState );
	    } );
	};
	
	module.exports = Link;
	
	function doNothing( x ){ }
	
	var defaultError = 'Invalid value';
	
	Link.prototype = {
	    constructor : Link,
	
	    /**
	     * Link value. Read-only, cannot be set.
	     * @const
	     */
	    value : void 0,
	
	    /**
	     * Set link value
	     * @param {*} x - new link value
	     */
	    set : function( x ){ },
	
	    /**
	     * Immediately update the link value using given transform function.
	     * @param {function( * ) : *} transform - update function receives cloned link value as an argument; returning
	     *     `undefined` prevents update.
	     */
	    update : function( transform, e ){
	        var prevValue = this.value;
	        prevValue = helpers( prevValue ).clone( prevValue );
	
	        var nextValue = transform( prevValue, e );
	        nextValue === void 0 || this.set( nextValue );
	    },
	
	    /**
	     * Create UI event handler function which will update the link with a given transform function.
	     * @param {function(*, Event=):*} transform - update function receives cloned link value and UI event as an
	     *     argument; returning `undefined` prevents update.
	     * @returns {function()} - UI event handler
	     *
	     * Examples:
	     *     <button onClick={ link.action( x => !x ) } ... />
	     *     <input onChange={ link.action( ( x, e ) => e.target.value ) } ... />
	     */
	    action : function( transform ){
	        var link = this;
	        return function( e ){ link.update( transform, e ) };
	    },
	
	    /**
	     * Similar to `set`. React 0.14 backward compatibility shim.
	     * @param {*} x - new link value
	     */
	    requestChange : function( x ){ this.set( x ); },
	
	    /**
	     * Similar to `link.update( x => !x )`. ValueLink 1.0.x compatibility shim.
	     * @deprecated
	     */
	    toggle : function(){ this.set( !this.value ); },
	
	    /**
	     * Validation error. Usually is a string with error text, but can hold any type.
	     */
	    error : void 0,
	
	    /**
	     * Similar to `error`. ValueLink 1.0.x compatibility shim.
	     * @deprecated
	     */
	    get validationError(){ return this.error },
	
	    /**
	     * Validate link with validness predicate and optional custom error object. Can be chained.
	     * @param {function( * ) : boolean} whenValid - Takes link value as an argument, returns true whenever value is
	     *     valid.
	     * @param {*=} error - optional error object assigned to `link.error`, usually is a string with an error
	     *     description.
	     * @returns {Link} - pass through link for easy checks chaining.
	     */
	    check : function( whenValid, error ){
	        if( !this.error && !whenValid( this.value ) ){
	            this.error = error || defaultError;
	        }
	
	        return this;
	    },
	
	    /**
	     * Create boolean link which is true whenever array has given element. Link value must be an array.
	     * @param {*} element - value which should present in array for resulting link to be `true`.
	     * @returns {Link} - new boolean link.
	     */
	    contains : function( element ){
	        var parent = this;
	
	        return new Link( this.value.indexOf( element ) >= 0, function( x ){
	            var next = Boolean( x );
	            if( this.value !== next ){
	                var arr = parent.value,
	                    nextValue = x ? arr.concat( element ) : arr.filter( function( el ){ return el !== element; });
	
	                parent.set( nextValue );
	            }
	        } );
	    },
	
	    /**
	     * Create boolean link which is true whenever link value is equal to the given value.
	     * When assigned with `true`, set parent link with `truthyValue`. When assigned with `false`, set it to `null`.
	     * @param {*} truthyValue - the value to compare parent link value with.
	     * @returns {Link} - new boolean link.
	     */
	    equals : function( truthyValue ){
	        var parent = this;
	
	        return new Link( this.value === truthyValue, function( x ){
	            parent.set( x ? truthyValue : null );
	        } );
	    },
	
	    // link to enclosed object or array member
	    /**
	     * Create link to array or plain object (hash) member. Whenever member link will be updated,
	     * if will set parent link with an updated copy of enclosed array or object,
	     * causing 'purely functional update'. Can be chained to link deeply nested structures.
	     * @param {string|number} key - index in array or key in object hash.
	     * @returns {ChainedLink} - new link to array or object member.
	     */
	    at : function( key ){
	        return new ChainedLink( this, key );
	    },
	
	    /**
	     * Iterates through the links to enclosed object or array elements.
	     * Optionally map them to array of arbitrary values.
	     *
	     * @param {function( Link, index ) : * } iterator - function called for each member of object or array, optionally
	     *     returns mapped value.
	     * @returns {Array} - array of values returned by iterator. `undefined` elements are filtered out.
	     */
	    map : function( iterator ){
	        return helpers( this.value ).map( this, iterator );
	    }
	};
	
	/**
	 * Link to array or object element enclosed in parent link.
	 * Performs purely functional update of the parent, shallow copying its value on `set`.
	 * @param {Link} link - link with enclosed array or object.
	 * @param {string|number} key - key or array index
	 * @extends {Link}
	 * @constructor
	 */
	function ChainedLink( link, key ){
	    this.value  = link.value[ key ];
	    this.parent = link;
	    this.key    = key;
	}
	
	ChainedLink.prototype             = Object.create( Link.prototype );
	ChainedLink.prototype.constructor = ChainedLink;
	
	/**
	 * Set new element value to parent array or object, performing purely functional update.
	 * @param x - new element value
	 */
	ChainedLink.prototype.set = function( x ){
	    if( this.value !== x ){
	        var key = this.key;
	
	        this.parent.update( function( parent ){
	            parent[ key ] = x;
	            return parent;
	        } );
	    }
	};
	
	/**
	 * Select appropriate helpers function for particular value type.
	 * @param value - value to be operated with.
	 * @returns {object} - object with helpers functions.
	 */
	function helpers( value ){
	    switch( value && Object.getPrototypeOf( value ) ){
	        case Array.prototype :
	            return arrayHelpers;
	        case Object.prototype :
	            return objectHelpers;
	        default:
	            return dummyHelpers;
	    }
	}
	
	/**
	 * Do nothing for types other than Array and plain Object.
	 *
	 * @type {{clone: dummyHelpers.clone, map: dummyHelpers.map}}
	 */
	var dummyHelpers = {
	    clone    : function( value ){ return value; },
	    map      : function( link, fun ){ return []; }
	};
	
	/**
	 * `map` and `clone` for plain JS objects
	 * @type {{map: objectHelpers.map, clone: objectHelpers.clone}}
	 */
	var objectHelpers = {
	    /**
	     * Map through the link to object
	     * @param {Link} link - link with object enclosed.
	     * @param {function( Link, string ) : * } iterator - to iterate and map through links
	     * @returns {Array} - resulting array of mapped values.
	     */
	    map : function( link, iterator ){
	        var mapped = [],
	            hash = link.value;
	
	        for( var key in hash ){
	            var element = iterator( link.at( key ), key );
	            element === void 0 || ( mapped.push( element ) );
	        }
	
	        return mapped;
	    },
	
	    /**
	     * Shallow clone plain JS object
	     * @param {object} object
	     * @returns {object}
	     */
	    clone : function( object ){
	        var cloned = {};
	
	        for( var key in object ){
	            cloned[ key ] = object[ key ];
	        }
	
	        return cloned;
	    }
	};
	
	/**
	 * `map` and `clone` helpers for arrays.
	 * @type {{clone: arrayHelpers.clone, map: arrayHelpers.map }}
	 */
	var arrayHelpers = {
	    /**
	     * Shallow clone array
	     * @param array
	     * @returns {array}
	     */
	    clone : function( array ){
	        return array.slice();
	    },
	
	    /**
	     * Map through the link to array
	     * @param {Link} link - link with an array enclosed.
	     * @param {function( Link, string ) : * } iterator - to iterate and map through links
	     * @returns {Array} - resulting array of mapped values.
	     */
	    map : function( link, iterator ){
	        var mapped = [],
	            array = link.value;
	
	        for( var i = 0; i < array.length; i++ ){
	            var y = iterator( link.at( i ), i );
	            y === void 0 || ( mapped.push( y ) );
	        }
	
	        return mapped;
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=nestedreact.js.map