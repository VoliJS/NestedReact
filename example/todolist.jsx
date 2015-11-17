import React from 'nestedreact'
import { Model } from 'nestedtypes'

// pre-define model, cause we gonna have recursive definition...
const TodoItem = Model.extend();

TodoItem.define({
    defaults : {
        done : Boolean,
        desc : String,

        // this is the tree, with components of the same type...
        subitems : TodoItem.Collection
    },

    remove(){
        this.collection.remove( this );
    },

    addChildren(){
        this.subitems.push( new TodoItem() );
    },

    initialize(){
        // Pin these methods, cause we gonna use them as click handlers...
        _.bindAll( this, 'remove', 'addChildren' );

        // Sync done state with subitems across the tree...
        // There won't be infinite loop, 'change' is never fired if there are no actual change.
        // Event handlers are transactional, single change event will be bubbled up.
        this.listenTo( this, {
            'change:subitems' : () => {
                let { subitems } = this;

                if( subitems && subitems.length ){
                    this.done = subitems.every( item => item.done );
                }
            },

            'change:done' : () => {
                this.subitems.each( item => item.done = this.done );
            }
        });
    }
});

const App = React.createClass({
    // define the state...
    attributes : {
        // deep changes in this tree structure will be detected,
        // and this component will be updated automatically.
        todos : TodoItem.Collection
    },

    render(){
        // State is already initialized with default values.
        // Now, link the state to components...
        return <Checklist todos={ this.state.todos } />;
    }
});

// Everything else gonna be stateless...
const Checklist = ({ todos } ) => (
    <div className="checklist">
        { todos.map( todo => <ToDo key={ todo.cid } todo={ todo } /> )}
    </div>
);

const ToDo = ({ todo }) => (
    <div className="todo-item">
        <div className='header'>
            <input type="checkbox"  checkedLink={ todo.getLink( 'done' ) } />
            <input type="text"        valueLink={ todo.getLink( 'desc' ) } />
            <div   class='add-children' onClick={ todo.addChildren }> + </div>
            <div   class='delete'       onClick={ todo.remove } > x </div>
        </div>
        { todo.subitems.length && <Checklist todos={ todo.subitems } /> }
    </div>
);

// Done.
export default App;