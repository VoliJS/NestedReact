import { Model, Collection, define } from 'nestedtypes'

@define
export class ToDo extends Model {
	static collection = ToDoCollection
	static attributes = {
		done : Boolean,
		desc : String
	}

	remove(){
		this.collection.remove( this );
	}
}

@define
class ToDoCollection extends Collection {
	clearCompleted(){
		this.remove( this.filter( todo => todo.done ) );
	}

	get allDone(){
		return this.every( todo => todo.done );
	}

	set allDone( val ){
		this.transaction( () =>{
			this.each( todo => todo.done = val );
		});
	}

	activeCount(){
		return this.filter( todo => !todo.done ).length;
	}
}