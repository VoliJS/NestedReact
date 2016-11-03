var React       = require( 'react' ),
    Nested      = require( 'nestedtypes' ),
    processSpec = require( './define' ),
    tools       = Nested.tools;

var reactMixinRules = {
    componentWillMount        : 'reverse',
    componentDidMount         : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate     : 'some',
    componentWillUpdate       : 'reverse',
    componentDidUpdate        : 'reverse',
    componentWillUnmount      : 'sequence',
    state                     : 'merge',
    store                     : 'merge',
    props                     : 'merge',
    context                   : 'merge',
    childContext              : 'merge',
    getChildContext           : 'mergeSequence'
};

function createClass( a_spec ){
    var spec   = processSpec( a_spec ),
        mixins = spec.mixins || [];

    delete spec.mixins;

    // We have the reversed sequence for the majority of the lifecycle hooks.
    // So, mixins lifecycle methods works first. It's important.
    // To make it consistent with class mixins implementation, we override React mixins.
    for( var i = 0; i < mixins.length; i++ ){
        Nested.mergeProps( spec, mixins[ i ], reactMixinRules );
    }

    var Component = React.createClass( spec );

    // attach lazily evaluated backbone View class
    defineBackboneProxy( Component );

    return Component;
}

module.exports = createClass;

Nested.Mixable.mixTo( React.Component );

React.Component.define = function( protoProps, staticProps ){
    var BaseClass          = tools.getBaseClass( this ),
        staticsDefinition  = tools.getChangedStatics( this, 'state', 'props', 'autobind', 'context', 'childContext', 'listenToProps', 'pureRender' ),
        combinedDefinition = tools.assign( staticsDefinition, protoProps || {} );

    var definition = processSpec( combinedDefinition, this.prototype );

    defineBackboneProxy( this );

    if( definition.getDefaultProps ) this.defaultProps = definition.getDefaultProps();
    if( definition.propTypes ) this.propTypes = definition.propTypes;
    if( definition.contextTypes ) this.contextTypes = definition.contextTypes;
    if( definition.childContextTypes ) this.childsContextTypes = definition.childsContextTypes;

    var protoDefinition = tools.omit( definition, 'getDefaultProps', 'propTypes', 'contextTypes', 'childContextTypes' );
    Nested.Mixable.define.call( this, protoDefinition, staticProps );

    return this;
}

React.Component.mixinRules( reactMixinRules );

function defineBackboneProxy( Component ){
    Object.defineProperty( Component, 'View', {
        get : function(){
            return this._View || ( this._View = Nested._BaseView.extend( { reactClass : Component } ) );
        }
    } );
}