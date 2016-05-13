import { Model } from 'nestedtypes'

export const ToDo = Model.extend({
	defaults : {
		done : Boolean,
		desc : String
	},

	remove(){
		this.collection.remove( this );
	},

	collection : {
		clearCompleted(){
			this.remove( this.filter( todo => todo.done ) );
		},

		properties : {
			allDone : {
				get(){
					return this.every( todo => todo.done );
				},

				set( val ){
					this.transaction( () =>{
						this.each( todo => todo.done = val );
					});
				}
			},

			activeCount(){
				return this.filter( todo => !todo.done ).length;
			}
		}
	}
});
