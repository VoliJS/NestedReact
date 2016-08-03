var React      = require( 'react' ),
    Nested     = require( 'nestedtypes' ),
    processSpec = require( './define'),
    tools = Nested.tools;

function createClass( spec ){
    var component = React.createClass( processSpec( spec ) );
    
    // attach lazily evaluated backbone View class
    defineBackboneProxy( component );

    return component;
}

module.exports = createClass;

Nested.Mixable.mixTo( React.Component );

React.Component.define = function( protoProps, staticProps ){
    var BaseClass = tools.getBaseClass( this ),
        staticsDefinition = tools.getChangedStatics( this, 'state', 'props', 'autobind', 'context', 'childContext', 'listenToProps', 'pureRender' ),
        combinedDefinition = tools.assign( staticsDefinition, protoProps || {} );

    definition = processSpec( combinedDefinition, this.prototype );

    defineBackboneProxy( this );

    if( definition.getDefaultProps ) this.defaultProps = definition.getDefaultProps();
    if( definition.propTypes ) this.propTypes = definition.propTypes;
    if( definition.contextTypes ) this.contextTypes = definition.contextTypes;
    if( definition.childContextTypes ) this.childsContextTypes = definition.childsContextTypes;

    var protoDefinition = tools.omit( definition, 'getDefaultProps', 'propTypes', 'contextTypes', 'childContextTypes' );
    Nested.Mixable.define.call( this, protoDefinition, staticProps );

    return this;
}

React.Component.mixinRules({
    componentWillMount : 'reverse',
    componentDidMount : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate : 'some',
    componentWillUpdate : 'reverse',
    componentDidUpdate : 'reverse',
    componentWillUnmount : 'sequence',
});

function defineBackboneProxy( Component ){
    Object.defineProperty( Component, 'View', {
        get : function(){
            return this._View || ( this._View = Nested._BaseView.extend( { reactClass : Component } ) );
        }
    } );
}