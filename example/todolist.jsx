const TodoItem = Model.extend();

TodoItem.define({
    defaults : {
        done : Boolean,
        desc : String,
        subitems : TodoItem.Collection
    },

    remove(){
        this.collection.remove( this );
    },

    addChildren(){
        this.subitems.push( new TodoItem() );
    },

    initialize(){
        _.bindAll( this, 'remove', 'addChildren' );

        // sync done state with subitems...
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
        todos : TodoItem.Collection
    },

    render(){
        // link state to the application...
        return <Checklist todos={ this.state.todos } />;
    }
})

const Checklist = ({ todos } ) => (
    <div className="checklist">
        { todos.map( todo => <ToDo key={ todo.cid } todo={ todo } /> )}
    </div>
);

const ToDo = ({ todo }) => (
    <div className="todo-item">
        <div className='header'>
            <input type="checkbox" checkedLink={ todo.getLink( 'done' ) } />
            <input type="text" valueLink={ todo.getLink( 'desc' ) } />
            <div class='add-children' onClick={ todo.addChildren ) } />
            <div class='delete' onClick={ todo.remove ) } />
        </div>
        { todo.subitems.length && <Checklist todos={ todo.subitems } /> }
    </div>
);
