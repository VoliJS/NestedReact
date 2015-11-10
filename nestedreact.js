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
	
	var ComponentView = __webpack_require__( 5 );
	
	// export hook to override base View class used...
	NestedReact.useView = function( View ){
	    NestedReact._BaseView = ComponentView.use( View );
	};
	
	NestedReact.useView( Nested.View );
	
	// React component for attaching views
	NestedReact.subview = __webpack_require__( 6 );
	
	// Extend react components to have backbone-style jquery accessors
	var Component     = React.createClass( { render : function(){} } ),
	    BaseComponent = Object.getPrototypeOf( Component.prototype );
	
	Object.defineProperties( BaseComponent, {
	    el  : { get : function(){ return ReactDOM.findDOMNode( this ); } },
	    $el : { get : function(){ return $( this.el ); } },
	    $   : { value : function( sel ){ return this.$el.find( sel ); } }
	} );
	
	var Link = NestedReact.Link = __webpack_require__( 7 );
	Nested.valueLink = Link.valueLink;
	
	var ModelProto = Nested.Model.prototype,
	    LinkAttr   = Link.Attr;
	
	ModelProto.lget = function( name ){ return new LinkAttr( this, name ); };
	ModelProto.fset = function( a, b, c ){
	    var self = this;
	    return function(){ self.set( a, b, c ); }
	};
	
	var CollectionProto = Nested.Collection.prototype,
	    LinkHas         = Link.CollectionHas;
	
	CollectionProto.lhas = function( model ){
	    return new LinkHas( this, model );
	};
	
	CollectionProto.ftoggle = function( model, next ){
	    var self = this;
	    return function(){ self.toggle( model, next ); }
	};


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

	var React    = __webpack_require__( 1 ),
	    Nested   = __webpack_require__( 3 );
	
	function forceUpdate(){ this.forceUpdate(); }
	
	var Events = Object.assign( {
	    componentWillUnmount : function(){
	        this.stopListening();
	    }
	}, Nested.Events );
	
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
	        this.model = new this.Model();
	        // enable owner references in the model to access component props
	        this.model._owner = this;
	
	        return this.model;
	    },
	
	    // reference global store to fix model's store locator
	    getStore : function(){
	        this.model._defaultStore;
	    },
	
	    componentDidMount : function(){
	        var events = this.listenToState;
	        events && this.listenTo( this.model, events, forceUpdate );
	    },
	
	    componentWillUnmount : function(){
	        this.model._owner = null;
	        this.model.stopListening();
	    }
	};
	
	function createClass( spec ){
	    var mixins = spec.mixins || ( spec.mixins = [] );
	
	    var attributes = getModelAttributes( spec );
	    if( attributes ){
	        var BaseModel = spec.Model || Nested.Model;
	        spec.Model    = BaseModel.extend( { defaults : attributes } );
	    }
	
	    if( spec.Model ) mixins.push( ModelState );
	
	    if( spec.listenToProps ) mixins.unshift( ListenToProps );
	
	    mixins.push( Events );
	
	    var component  = React.createClass( spec );
	
	    // attach lazily evaluated backbone View class
	    var NestedReact = this;
	
	    Object.defineProperty( component, 'View', {
	        get : function(){
	            return this._View || ( this._View = NestedReact._BaseView.extend( { reactClass : component } ) );
	        }
	    });
	
	    return component;
	}
	
	function getModelAttributes( spec ){
	    var attributes = null;
	
	    for( var i = spec.mixins.length - 1; i >= 0; i-- ){
	        var mixin = spec.mixins[ i ];
	        if( mixin.attributes ){
	            attributes || ( attributes = {} );
	            Object.assign( attributes, mixin.attributes );
	        }
	    }
	
	    if( spec.attributes ){
	        if( attributes ){
	            Object.assign( attributes, spec.attributes );
	        }
	        else{
	            attributes = spec.attributes;
	        }
	    }
	
	    return attributes;
	}
	
	module.exports = createClass;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React    = __webpack_require__( 1 ),
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
	            this.element = React.createElement( this.reactClass, this.options );
	        },
	
	        setElement : function(){
	            this.unmountComponent();
	            return setElement.apply( this, arguments );
	        },
	
	        // cached instance of react component...
	        component : null,
	        prevState : null,
	
	        render : function(){
	            var component = ReactDOM.render( this.element, this.el );
	            this.component || this.mountComponent( component );
	        },
	
	        mountComponent : function( component ){
	            this.component = component;
	
	            if( this.prevState ){
	                component.model.set( this.prevState );
	                this.prevState = null;
	            }
	
	            component.trigger && this.listenTo( component, 'all', function(){
	                this.trigger.apply( this, arguments );
	            });
	        },
	
	        unmountComponent : function(){
	            var component = this.component;
	
	            if( component ){
	                this.prevState = component.model && component.model.attributes;
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__( 1 );
	
	module.exports = React.createClass({
	    displayName : 'BackboneView',
	
	    propTypes : {
	        View : React.PropTypes.func.isRequired,
	        options : React.PropTypes.object
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Nested = __webpack_require__( 3 );
	
	var Value = exports.Value = Object.extend( {
	    value          : void 0,
	    requestChanges : function( val ){ throw new ReferenceError(); },
	
	    set  : function( val ){ this.requestChanges( val ); },
	    fset : function( val ){
	        var link = this;
	        return function(){ link.requestChanges( val ); }
	    }
	} );
	
	exports.Attr = Value.extend( {
	    constructor : function( model, attr ){
	        this.value          = model[ attr ];
	        this.requestChanges = function( val ){
	            model[ attr ] = val;
	        }
	    },
	
	    // for array links
	    lhas : function( value ){
	        return new ArrayHas( this, value );
	    },
	
	    leql : function( value ){
	        return new ValueEql( this, value );
	    }
	} );
	
	var Bool = exports.Bool = Value.extend( {
	    toggle : function(){ this.requestChanges( !this.value ); },
	
	    ftoggle : function(){
	        var link = this;
	        return function(){ link.requestChanges( !link.value ) };
	    }
	} );
	
	var ValueEql = exports.ValueEql = Bool.extend( {
	    constructor : function( link, asTrue ){
	        this.value          = link.value === asTrue;
	        this.requestChanges = function( val ){
	            link.requestChanges( val ? asTrue : null );
	        }
	    }
	} );
	
	var ArrayHas = exports.ArrayHas = Bool.extend( {
	    constructor : function( link, element ){
	        var value  = Boolean( contains( link.value, element ) );
	        this.value = value;
	
	        this.requestChanges = function( next ){
	            if( value !== Boolean( next ) ){
	                var prev = link.value;
	                link.requestChanges( next ? prev.concat( element ) : without( prev, element ) );
	            }
	        };
	    }
	} );
	
	exports.CollectionHas = Bool.extend( {
	    constructor : function( collection, model ){
	        this.value          = Boolean( collection.get( model ) );
	        this.requestChanges = function( val ){ collection.toggle( model, val ); }
	    }
	} );
	
	exports.valueLink = function( reference ){
	    var getMaster = Nested.parseReference( reference );
	
	    function setLink( value ){
	        var link = getMaster.call( this );
	        link && link.requestChanges( value );
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
	
	// private array helpers
	function contains( arr, el ){
	    for( var i = 0; i < arr.length; i++ ){
	        if( arr[ i ] === el ) return true;
	    }
	
	    return false;
	}
	
	function without( arr, el ){
	    var res = [];
	
	    for( var i = 0; i < arr.length; i++ ){
	        var current = arr[ i ];
	        current === el || res.push( current );
	    }
	
	    return res;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=nestedreact.js.map