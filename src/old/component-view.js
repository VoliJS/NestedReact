var React    = require( 'react' ),
    ReactDOM = require( 'react-dom' );

function fastAssign( dest, source ){
    for( var name in source ) {
        dest[ name ] = source[ name ];
    }

    return dest;
}

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
            this.unmountComponent( true );
            return setElement.apply( this, arguments );
        },

        // cached instance of react component...
        component : null,
        prevState : null,
        
        resize : function(){
            Page.forceResize();
        },

        render : function(){
            var options   = this.prevState ? fastAssign( { _keepState : this.prevState }, this.options ) : this.options,
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

        unmountComponent : function( keepModel ){
            var component = this.component;

            if( component ){
                this.prevState = component.model;

                if( component.trigger ){
                    this.stopListening( component );
                }

                component._preventDispose = Boolean( keepModel );

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
