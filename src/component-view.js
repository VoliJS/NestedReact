var React    = require( 'react' ),
    ReactDOM = require( 'react-dom' );

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
