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
	
	__webpack_require__( 10 );


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
	        this.model._defaultStore;
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
	
	    // process state spec...
	    var attributes = getTypeSpecs( spec, 'attributes', 'state' );
	    if( attributes ){
	        var BaseModel = spec.Model || Nested.Model;
	        spec.Model    = BaseModel.extend( { defaults : attributes } );
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

	var Nested   = __webpack_require__( 3 ),
	    Link     = __webpack_require__( 11 );
	
	Object.extend.attach( Link );
	
	Nested.Link = Link;
	
	var ClassProto      = Nested.Class.prototype,
	    ModelProto      = Nested.Model.prototype,
	    CollectionProto = Nested.Collection.prototype;
	
	ClassProto.getLink = ModelProto.getLink = CollectionProto.getLink = function( attr ){
	    var model = this,
	        error = model.validationError;
	
	    return new Link( model[ attr ], function( x ){
	        model[ attr ] = x;
	    }, error && error.nested[ attr ] );
	};
	
	ModelProto.deepLink = function( attr, options ){
	    var model = this,
	        values = model.deepInvalidate( attr );
	
	    return new Link( values[ 0 ], function( x ){
	        model.deepSet( attr, x, options );
	    }, values[ 1 ] );
	};
	
	CollectionProto.hasLink = function( model ){
	    var collection = this;
	
	    return new Link( Boolean( collection.get( model ) ), function( x ){
	        var next = Boolean( x );
	        this.value === next || collection.toggle( model, next );
	    } );
	};
	
	Nested.link = function( reference ){
	    var getMaster = Nested.parseReference( reference );
	
	    function setLink( value ){
	        var link = getMaster.call( this );
	        link && link.requestChange( value );
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
	 * Advanced React value links with validation and link-to-objects capabilities
	 * (c) 2016 Vlad Balin & Volicon, MIT License
	 */
	
	function Link( value, set, error ){
	    this.value           = value;
	    this.requestChange   = set || doNothing;
	    this.validationError = error;
	}
	
	// create link to component's state attribute
	Link.state = function( component, attr ){
	    return new Link( component.state[ attr ], function( x ){
	        var nextState = {};
	        nextState[ attr ] = x;
	        component.setState( nextState );
	    });
	};
	
	module.exports = Link;
	
	function doNothing( x ){ }
	
	var defaultError = 'Invalid value';
	
	Link.prototype = {
	    value           : null,
	    validationError : null,
	    requestChange   : doNothing,
	
	    set             : function( x ){ this.requestChange( x ); },
	    toggle          : function(){ this.requestChange( !this.value ); },
	
	    // create function which updates the link
	    update : function( transform ){
	        var link = this;
	        return function(){
	            var nextValue = transform( link.value );
	            nextValue === void 0 || link.requestChange( nextValue );
	        }
	    },
	
	    check : function( whenValid, error ){
	        if( !this.validationError && !whenValid( this.value ) ){
	            this.validationError = error || defaultError;
	        }
	
	        return this;
	    },
	
	    // create boolean link to enclosed array element
	    contains : function( element ){
	        var link = this;
	
	        return new Link( contains( this.value, element ), function( x ){
	            var next = Boolean( x );
	            if( this.value !== next ){
	                var arr = link.value;
	                link.requestChange( x ? arr.concat( element ) : without( arr, element ) );
	            }
	        } );
	    },
	
	    // create boolean link for value equality
	    equals : function( asTrue ){
	        var link = this;
	
	        return new Link( this.value === asTrue, function( x ){
	            link.requestChange( x ? asTrue : null );
	        } );
	    },
	
	    // link to enclosed object or array member
	    at : function( key ){
	        var link = this;
	
	        return new Link( this.value[ key ], function( x ){
	            if( this.value !== x ){
	                var objOrArr    = link.value;
	                objOrArr        = clone( objOrArr );
	                objOrArr[ key ] = x;
	                link.requestChange( objOrArr );
	            }
	        } );
	    },
	
	    // iterates through enclosed object or array, generating set of links
	    map : function( fun ){
	        var arr = this.value;
	        return arr ? ( arr instanceof Array ? mapArray( this, arr, fun ) : mapObject( this, arr, fun ) ) : [];
	    },
	
	    // dummies for compatibility with nestedtypes object model...
	    constructor : Link,
	    initialize : function( value, set, error ){},
	    get _changeToken(){
	        return this.value;
	    }
	};
	
	function mapObject( link, object, fun ){
	    var res = [];
	
	    for( var i in object ){
	        if( object.hasOwnProperty( i ) ){
	            var y = fun( link.at( i ), i );
	            y === void 0 || ( res.push( y ) );
	        }
	    }
	
	    return res;
	}
	
	function mapArray( link, arr, fun ){
	    var res = [];
	
	    for( var i = 0; i < arr.length; i++ ){
	        var y = fun( link.at( i ), i );
	        y === void 0 || ( res.push( y ) );
	    }
	
	    return res;
	}
	
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
	
	function clone( objOrArray ){
	    var proto = objOrArray && Object.getPrototypeOf( objOrArray );
	
	    if( proto === Array.prototype ) return objOrArray.slice();
	    if( proto === Object.prototype ) return Object.assign( {}, objOrArray );
	
	    return objOrArray;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=nestedreact.js.map