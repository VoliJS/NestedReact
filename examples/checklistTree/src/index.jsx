import './styles.css'

// You should import React from nestedreact, and use it as drop-in replacement.
// It's 100% compatible.
import React, { define } from 'nestedreact'
import ReactDOM from 'react-dom'

// Import input controls, modified to support valueLink. Otherwise they behave as standard.
import { Checkbox, Input } from 'valuelink/tags'

// Import checklist model definition. Think of "model" as of an observable serializable class.
import { ChecklistItem } from './model'

// Local counter to help us count top-level renders.
let _renders = 0;

@define // <- That should be places before every class definition, which uses NestedReact features.
class App extends React.Component {
    // NestedReact state definition. Syntax is the same as NestedTypes model attributes spec.
    // In fact, this state _is_ the NestedTypes model internally.
    static state = {
        // 'items' is a collection of ChecklistItem model.
        items : ChecklistItem.Collection // <- It's type annotation. Constructor function designates type.
    };

    // Save and restore state.
    componentWillMount(){
        // All state in NestedReact is serializable by default.
        const { state } = this,
              // load raw JSON from local storage
              json = JSON.parse( localStorage.getItem( 'checklist' ) || "{}" );

        // Initialize state with JSON.
        state.set( json, { parse : true } );

        window.onunload = () =>{
            // Save state back to the local storage
            localStorage.setItem( 'checklist', JSON.stringify( state ) );
        }
    }

    render(){
        const { items } = this.state;

        return (
            <div>
                <div>Renders count: { _renders++ }
                    <button onClick={ () => items.add({}) }>
                        Add children
                    </button>
                </div>
                <List items={ items } />
            </div>
        );
    }
}

// Simple pure component to render the list of checklist items.
// They must _not_ be prefixed with @define. No magic here, just raw React.
const List = ({ items }) => (
    <div className='children'>
        { items.map( item => ( /* <- collections have 'map' method as an array */
            /* models have cid - unique client id to be used in 'key' */
            <Item key={ item.cid } model={ item } />
        ))}
    </div>
);

@define // <- Don't forget @define
class Item extends React.Component{
    // NestedReact props definition. Same syntax as for the 'state'.
    static props = {
        model : ChecklistItem // <- Type annotation, using constructor function. No default value.
    };

    static pureRender = true; // <- that's all you should do to enable pure render optimization.

    render(){
        const { model } = this.props,
              // Two way data binding! Using our advanced value links.
              // First, prepare the links.
              links = model.linkAll( 'checked', 'name' );

        return (
            <div className='checklist'>
                <div className='header'>
                    <Checkbox checkedLink={ links.checked /* We use links instead of values... */ }/>
                    <span className="created">{model.created.toLocaleTimeString()}</span>
                    <Input valueLink={ links.name /* ...as if they would be values */ } />
                    <button onClick={ () => model.remove() /* custom model method to remove it from the collection */}>
                        Delete
                    </button>
                    <button onClick={ () => model.subitems.add({}) }>
                        Add children
                    </button>
                </div>
                <List items={ model.subitems /* Render the nested checklist */ } />
            </div>
        );
    }
}

// That's really it! Let's render it.
ReactDOM.render( <App />, document.getElementById( 'app-mount-root' ) );