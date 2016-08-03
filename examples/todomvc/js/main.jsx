import 'css/app.css'
import React, { define } from 'nestedreact'
import ReactDOM from 'react-dom'
import {ToDo} from './model.js'
import TodoList from './todolist.jsx'
import Filter from './filter.jsx'
import AddTodo from './addtodo.jsx'

@define
class App extends React.Component {
    // Declare component state
    static state = {
        todos      : ToDo.Collection,
        filterDone : Boolean.value( null ) // null | true | false, initialized with null.
    }

    componentWillMount(){
        const { state } = this,
              // load raw JSON from local storage
              json = JSON.parse( localStorage.getItem( 'todo-mvc' ) || "{}" );

        // initialize state with raw JSON
        state.set( json, { parse : true } );

        window.onunload = () =>{
            // Save state back to the local storage
            localStorage.setItem( 'todo-mvc', JSON.stringify( state ) );
        }
    }

    render(){
        const { todos, filterDone } = this.state,
              hasTodos = Boolean( todos.length );

        return (
            <div>
                <section className="todoapp">
                    <AddTodo onEnter={ desc => todos.add({ desc : desc }) }/>

                    { hasTodos && <TodoList todos={ todos }
                                            filterDone={ filterDone }/> }

                    { hasTodos && <Filter count={ todos.activeCount }
                                          filterLink={ this.state.getLink( 'filterDone' ) }
                                          onClear={ () => todos.clearCompleted() }
                    />}
                </section>

                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                    <p>Created by <a href="http://todomvc.com">Vlad Balin</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
}

ReactDOM.render( <App />, document.getElementById( 'app-mount-root' ) );

