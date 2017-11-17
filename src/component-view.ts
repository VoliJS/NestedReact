import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { tools } from 'type-r'

declare global {
    interface Window {
        Page : {
            forceResize();
        }
    }
}

window.Page || ( window.Page = { forceResize(){} } );

export default function use( View ){
    const dispose    = View.prototype.dispose || function(){},
        { setElement } = View.prototype;

    const ComponentView = View.extend( {
        reactClass : null,
        props      : {},
        element    : null,

        initialize( props ){
            // memorise arguments to pass to React
            this.options = props || {};
        },

        setElement(){
            this.unmountComponent( true );
            return setElement.apply( this, arguments );
        },

        // cached instance of react component...
        component : null,
        prevState : null,
        
        resize(){
            window.Page.forceResize();
        },

        render(){
            const options   = this.prevState ? tools.fastAssign( { __keepState : this.prevState }, this.options ) : this.options,
                element   = React.createElement( this.reactClass, options ),
                component = ReactDOM.render( element, this.el );

            this.component || this.mountComponent( component );
        },

        mountComponent( component ){
            this.component = component;
            this.prevState = null;

            component.trigger && this.listenTo( component, 'all', function(){
                this.trigger.apply( this, arguments );
            } );
        },

        unmountComponent( keepModel ){
            var component = this.component;

            if( component ){
                this.prevState = component.state;

                if( component.trigger ){
                    this.stopListening( component );
                }

                component._preventDispose = Boolean( keepModel );

                ReactDOM.unmountComponentAtNode( this.el );
                this.component = null;
            }
        },

        dispose(){
            this.unmountComponent();
            return dispose.apply( this, arguments );
        }
    } );

    Object.defineProperty( ComponentView.prototype, 'model', {
        get(){
            this.component || this.render();
            return this.component && this.component.state;
        }
    } );

    return ComponentView;
}
