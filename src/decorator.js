

Object.extend.attach( React.Component );
Object.assign( React.Component, Events );

React.Component.extend({
    Model : null,
    autobind : null,

    constructor: function( props ){
        React.Component.call( this, props );

        if( this.Model ){
            this.state = new this.Model();
        }

        var autobind = this.autobind;
        if( autobind ){
            for( var i = 0; i < autobind.length; i++ ){
                var name = autobind[ i ],
                    fun = this[ name ];

                if( fun ){
                    this[ name ] = fun.bind( this );
                }
            }
        }
    }
});

React.define = function( options ){
    return function( Class ){
        var spec = {};

        if( options.props ){
            var propSpec = parseProps( options.props );
            Class.propTypes = propSpec.propTypes;
            Class.defaultProps = propSpec.defaultProps;
        }

        if( options.autobind ){
            spec.autobind = options.autobind.split( /\s+/ );
        }


        var mixins = options.mixins || [];
        if( options.state ){
            mixins.push( StateMixin );
        }

        attachMixins( Class.prototype, mixins );
    }
};