import React, { define } from 'nestedreact'
import cx from 'classnames'
import { Input } from 'valuelink/tags.jsx'

import { ToDo } from './model'

@define
class TodoList extends React.Component {
    static props = {
        todos      : ToDo.Collection,
        filterDone : Boolean
    }

    static state = {
        editing : ToDo.from( '^props.todos' )
    }

    static pureRender = true

    render(){
        const { todos, filterDone } = this.props,
              filtered = filterDone === null ? todos.models
                            : todos.filter( todo => todo.done === filterDone ),

              editingLink = this.state.getLink( 'editing' );

        return (
            <section className="main">
                <Input className="toggle-all" type="checkbox"
                       checkedLink={ todos.getLink( 'allDone' ) }/>

                <label htmlFor="toggle-all">Mark all as complete</label>

                <ul className="todo-list">
                    { filtered.map( todo => (
                        <TodoItem key={ todo.cid } todo={ todo }
                                  editingLink={ editingLink }/>
                    ) )}
                </ul>
            </section>
        );
    }
}

export default TodoList;

function clearOnEnter( x, e ){
    if( e.keyCode === 13 ) return null;
}

const TodoItem = ( { todo, editingLink } ) =>{
    const editing   = editingLink.value === todo,
          className = cx( {
              'completed' : todo.done,
              'view'      : !todo.done,
              'editing'   : editing
          } );

    return (
        <li className={ className }>
            <div className="view">
                <Input className="toggle" type="checkbox"
                       checkedLink={ todo.getLink( 'done' ) }/>

                <label onDoubleClick={ editingLink.action( () => todo ) }>
                    { todo.desc }
                </label>

                <button className="destroy" onClick={ () => todo.remove() }/>
            </div>

            { editing && <Input className="edit"
                                valueLink={ todo.getLink( 'desc' ) }
                                autoFocus={ true }
                                onBlur={ editingLink.action( () => null ) }
                                onKeyDown={ editingLink.action( clearOnEnter ) }/> }
        </li>
    );
};
