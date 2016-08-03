import { Model, Collection, define } from 'nestedtypes'

/**
 * Very dangerous - Collection definition must go before Model definition.
 * Must include protection from passing collection == void 0.
 */
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
	static collection = ToDoCollection // TBD: Collection with capital letter doesn't work.
	static attributes = {
		done : Boolean,
		desc : String
	}

	remove(){
		this.collection.remove( this );
	}
}