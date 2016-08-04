import { Model, Collection, define } from 'nestedtypes'

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

	get activeCount(){
		return this.filter( todo => !todo.done ).length;
	}
}

@define
export class ToDo extends Model {
	static Collection = ToDoCollection
	static attributes = {
		done : Boolean,
		desc : String
	}

	remove(){
		this.collection.remove( this );
	}
}
