var React = require( 'react' ),
    ReactDOM = require( 'react-dom' );

function assign( dest, source ){
    for( var i in source ) dest[ i ] = source[ i ];
}

exports.use = function( Backbone ){
    var ComponentView = require( './component-view' ).use( Backbone );

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
