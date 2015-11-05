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
            var $content = this.$el.children().detach(),
                res      = setElement.apply( this, arguments );

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
                    } );
                }

                this.component = component;
            }
        },

        unmountComponent : function(){
            if( this.component && this.component.trigger ){
                this.stopListening( this.component );
            }

            ReactDOM.unmountComponentAtNode( this.el );
            this.component = null;
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
