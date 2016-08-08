import { Model, predefine } from 'nestedtypes'

@predefine
export class ChecklistItem extends Model {
    syncSubitems( checked ){
        this.subitemsChecked = checked;
    }

    syncChecked( subitems ){
        if( subitems.length ){
            this.checked = this.subitemsChecked;
        }
    }

    get subitemsChecked(){
        return this.subitems.every( item => item.checked );
    }

    set subitemsChecked( checked ){
        if( checked !== this.subitemsChecked ){
            this.subitems.updateEach( item => { item.checked = checked } );
        }
    }

    remove(){ this.collection.remove( this ); }
}

ChecklistItem.define({
    attributes : {
        name : String,
        checked : Boolean.has.watcher( 'syncSubitems' ),
        subitems : ChecklistItem.Collection.has.watcher( 'syncChecked' )
    }
});