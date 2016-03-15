import 'css/app.css'
import React from 'nestedreact'
import ReactDOM from 'react-dom'
import { ToDo, LocalStorage } from './model.js'
import TodoList from './todolist.jsx'
import Filter from './filter.jsx'
import AddTodo from './addtodo.jsx'

const App = React.createClass( {
    Model : LocalStorage,

    state : {
        id         : 'todo-mvc',
        todos      : ToDo.Collection,
        filterDone : Boolean.value( null )
    },

    componentWillMount(){
        this.state.fetch();
        window.onunload = () => this.state.save();
    },

    render(){
        const { state } = this,
              hasTodos = Boolean( state.todos.length );

        return (
            <div>
                <section className="todoapp">
                    <AddTodo onEnter={ desc => state.todos.add({ desc : desc }) }/>

                    { hasTodos && <TodoList todos={ state.todos }
                                            filterDone={ state.filterDone }/> }

                    { hasTodos && <Filter count={ state.todos.activeCount }
                                          filterLink={ state.getLink( 'filterDone' )}
                                          onClear={ () => state.todos.clearCompleted() }
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
} );

ReactDOM.render( <App />, document.getElementById( 'app-mount-root' ) );

