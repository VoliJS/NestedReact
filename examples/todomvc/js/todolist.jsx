import React, { PropTypes } from 'nestedreact'
import cx from 'classnames'

import { ToDo } from './model'

const TodoList = React.createClass({
	props : {
		todos : ToDo.Collection,
		filterDone : Boolean
	},

	state : {
		editing : ToDo.from( '^props.todos' )
	},

	pureRender : true,

	render(){
		const { todos, filterDone } = this.props,
			  editingLink = this.state.getLink( 'editing' );

		let	  filtered = todos.models;

		if( filterDone !== null ){
			filtered = _.filter( filtered, todo => todo.done === filterDone );
		}

		return (
			<section className="main">
				<input className="toggle-all" type="checkbox"
					checkedLink={ todos.getLink( 'allDone' ) } />
				<label htmlFor="toggle-all">Mark all as complete</label>

				<ul className="todo-list">
					{ filtered.map( todo => (
						<TodoItem key={ todo.cid } todo={ todo } editingLink={ editingLink } />
					))}
				</ul>
			</section>
		);
	}
});

export default TodoList;

const TodoItem = ({ todo, editingLink }) => {
	const editing = editingLink.value === todo,
		className = cx({
		'completed' : todo.done,
		'view' 		: !todo.done,
		'editing' 	: editing
	});

	return (
		<li className={ className }>
			<div className="view">
				<input className="toggle" type="checkbox" checkedLink={ todo.getLink( 'done' ) } />
				<label onDoubleClick={ () => editingLink.set( todo ) }>{ todo.desc }</label>
				<button className="destroy" onClick={ () => todo.remove() }></button>
			</div>
			{ editing && <input className="edit" valueLink={ todo.getLink( 'desc' ) }
				   autoFocus={ true } onBlur={ () => editingLink.set( null ) }
								onKeyDown={ e => e.keyCode === 13 && editingLink.set( null ) } /> }
		</li>
	);
};
