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
	NestedReact.subview = __webpack_require__( 8 );
	
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
	
	NestedReact.Link = __webpack_require__( 10 );


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
	
	function _mountState(){
	    var events = this.listenToState;
	    events && this.listenTo( this.model, events, forceUpdate );
	}
	
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
	        return this.model._defaultStore;
	    },
	
	    _mountState : _mountState,
	
	    componentDidMount : _mountState,
	
	    componentWillUnmount : function(){
	        this.model._owner = null;
	        this.model.stopListening();
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
	                component.model = this.prevState;
	                component.model._owner = component;
	                component._mountState();
	                this.prevState = null;
	
	                component.forceUpdate();
	            }
	
	            component.trigger && this.listenTo( component, 'all', function(){
	                this.trigger.apply( this, arguments );
	            });
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

	var React = __webpack_require__( 1 ),
	    jsonNotEqual = __webpack_require__( 9 ).jsonNotEqual;
	
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Nested = __webpack_require__( 3 ),
	    Link   = __webpack_require__( 11 );
	
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
	    set         : {
	        value : function( x ){
	            this.model.deepSet( this.path, x, this.options );
	        }
	    },
	
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
/* 11 */
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