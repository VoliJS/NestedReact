(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["React"] = factory(require("react"), require("react-dom"));
	else
		root["React"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	/* WEBPACK VAR INJECTION */(function(module) {var React = __webpack_require__( 2 ),
	    ReactDOM = __webpack_require__( 3 );
	
	var NestedReact = module.export = Object.create( React );
	
	NestedReact.use = function( Backbone ){
	    // listenToProps, listenToState, model, attributes, Model
	    NestedReact.createClass = __webpack_require__( 4 ).use( Backbone );
	
	    // React component for attaching views
	    NestedReact.subview = __webpack_require__( 6 ).use( Backbone );
	
	    // Extend react components to have jquery accessors
	    var BaseComponent = React.createClass({ render : function(){} }).type,
	        $ = Backbone.$;
	
	    Object.defineProperties( BaseComponent.prototype, {
	        el : { get : function(){ return ReactDOM.findDOMNode( this ); } },
	        $el : { get : function(){ return $( this.el ); } },
	        $ : { value : function( sel ){ return this.$el.find( sel ); } }
	    });
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


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

	var React = __webpack_require__( 2 ),
	    ReactDOM = __webpack_require__( 3 );
	
	function assign( dest, source ){
	    for( var i in source ) dest[ i ] = source[ i ];
	}
	
	exports.use = function( Backbone ){
	    var ComponentView = __webpack_require__( 5 ).use( Backbone );
	
	    function forceUpdate(){
	        this.forceUpdate();
	    }
	
	    var Events = _.extend({
	        componentWillUnmount : function(){
	            this.stopListening();
	        }
	    }, Backbone.Events );
	
	    var ListenToProps = {
	        componentDidMount : function(){
	            var props    = this.props,
	            updateOn = this.listenToProps;
	
	            for( var prop in updateOn ){
	                var emitter = props[ prop ];
	                emitter && this.listenTo( emitter, updateOn[ prop ], forceUpdate );
	            }
	        }
	    };
	
	    var ModelState = {
	        listenToState : 'change',
	        model         : null,
	
	        getInitialState : function(){
	            return this.model = new this.Model();
	        },
	
	        componentDidMount : function(){
	            var events = this.listenToState;
	            events && this.listenTo( this.state, events, forceUpdate );
	        },
	
	        componentWillUnmount : function(){
	            this.state.stopListening();
	        }
	    };
	
	    function createClass( spec ){
	        var mixins = spec.mixins || ( spec.mixins = [] );
	
	        var attributes = getModelAttributes( spec );
	        if( attributes ){
	            var BaseModel = spec.Model || Backbone.Model;
	            spec.Model = BaseModel.extend({ defaults : attributes });
	        }
	
	        if( spec.Model ) mixins.push( ModelState );
	
	        if( spec.listenToProps ) mixins.unshift( ListenToProps );
	
	        mixins.push( Events );
	
	        var component = React.createClass( spec );
	        component.View = ComponentView.extend({ component : component });
	
	        return component;
	    };
	
	    function getModelAttributes( spec ){
	        var attributes = null;
	
	        for( var i = spec.mixins.length - 1; i >= 0; i-- ){
	            var mixin = spec.mixins[ i ];
	            if( mixin.attributes ){
	                attributes || ( attributes = {} );
	                assign( attributes, mixin.attributes );
	            }
	        }
	
	        if( spec.attributes ){
	            if( attributes ){
	                assign( attributes, spec.attributes );
	            }
	            else{
	                attributes = spec.attributes;
	            }
	        }
	
	        return attributes;
	    }
	
	    return createClass;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__( 2 ),
	    ReactDOM = __webpack_require__( 3 );
	
	module.exports.use = function( Backbone ){
	  var View = Backbone.View,
	      dispose = View.prototype.dispose || function(){},
	      setElement = View.prototype.setElement;
	
	  var ComponentView = View.extend({
	      reactClass : null,
	      props      : {},
	      element    : null,
	
	      initialize : function( props ){
	          // memorise arguments to pass to React
	          this.options = props || {};
	          this.element = React.createElement( this.reactClass, this.options );
	      },
	
	      setElement : function(){
	          var $content = this.$el.children().detach(),
	              res = setElement.apply( this, arguments );
	
	          this.$el.append( $content );
	          return res;
	      },
	
	      // cached instance of react component...
	      component : null,
	
	      render : function(){
	          var component = ReactDOM.render( this.element, this.el );
	
	          if( !this.component ){
	              if( component && component.trigger ){
	                  // bubble up backbone events, if any
	                  this.listenTo( component, 'all', function(){
	                      this.trigger.apply( this, arguments );
	                  });
	              }
	
	              this.component = component;
	          }
	      },
	
	      unmountComponent : function(){
	          if( this.component &&  this.component.trigger ){
	              this.stopListening( this.component );
	          }
	
	          ReactDOM.unmountComponentAtNode( this.el );
	          this.component = null;
	      },
	
	      dispose : function(){
	          this.unmountComponent();
	          return dispose.apply( this, arguments );
	      }
	  });
	
	  Object.defineProperty( ComponentView.prototype, 'model', {
	    get : function(){
	        this.component || this.render();
	        return this.component && this.component.model;
	    }
	  });
	
	  return ComponentView;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__( 2 ),
	    ReactDOM = __webpack_require__( 3 );
	
	module.exports = React.createClass({
	    displayName : 'BackboneView',
	
	    propTypes : {
	        View : React.PropTypes.func.isRequired,
	        options : React.PropTypes.object
	    },
	
	    render : function(){
	        return ReactDOM.div({
	            ref : 'subview',
	            className : this.props.className
	        });
	    },
	
	    componentDidMount : function(){
	        var el = this.refs.subview,
	            p = this.props;
	
	        var view = this.view = p.options ? new p.View( p.options ) : new p.View();
	
	        if( el.getDOMNode ) el = el.getDOMNode();
	
	        el.appendChild( view.el );
	        view.render();
	    },
	
	    componentDidUpdate : function(){
	        this.view.render();
	    },
	
	    componentWillUnmount : function(){
	        var view = this.view;
	        if( view.dispose ) view.dispose();
	    }
	});


/***/ }
/******/ ])
});
;
//# sourceMappingURL=reactbone.js.map