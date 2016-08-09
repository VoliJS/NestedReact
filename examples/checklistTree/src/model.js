// Data objects are defined in nestedtypes package.
import { Model, predefine } from 'nestedtypes'


/**
 * Think of the models as of the class like in statically typed languages.
 * Such as Java or C++. Difference here is that types are being checked and coerced _dynamically_.
 * And - every model is serializable and observable by default.
 *
 * This case is a bit tough, as we're going to define recursive structure. Therefore, we are
 * defining the standard class, adding @predefine directive, and define attributes later.
 * When we have the reference to the constructor types.
 */
@predefine
export class ChecklistItem extends Model {
    // This is going to be the watcher function for 'checked' attribute.
    syncSubitems( checked ){
        this.subitemsChecked = checked;
    }

    // And this one - for 'subitems', which is nested checklist attribute.
    // Scroll it down, you'ss see the definition.
    syncChecked( subitems ){
        if( subitems.length ){
            this.checked = this.subitemsChecked;
        }
    }

    // Now. This, is the boolean calculated property, we're using for convenience.
    // True, whenever all subitems are selected. 
    get subitemsChecked(){
        return this.subitems.every( item => item.checked );
    }

    // And it's writable property.
    set subitemsChecked( checked ){
        if( checked !== this.subitemsChecked ){
            // 'updateEach' works as each, but wrap the changes in transaction.
            // Simply speaking, it means that just one change event will be fired from subitems,
            // despite the fact that there is a bulk change.
            this.subitems.updateEach( item => { item.checked = checked } );
        }
    }

    // Helper method to delete model from collection, without reference to the collection.
    // In NestedTypes, aggregation is distinguished from references to the shared objects.
    // By default, all attributes and collection elements are aggregated.
    // And model.collection points to the owner collection (if any).
    remove(){ this.collection.remove( this ); }
}

// Now, define our recursive model.
ChecklistItem.define({
    attributes : { // <- Here's an attribute spec. Think of it as a type spec.
        name : String,

        // Basic type spec form is just mentioning the constructor function.
        // New Date class instance will be automatically created for this attribute.
        created : Date,

        // checked - it's boolean value, which has watcher. Watcher is model's function which
        // is called whenever attribute value is changed.
        // All changes made to the model inside of the watchers won't trigger any
        // additional 'change' events and won't cause extra renders. They are executed in the scope
        // of transaction.
        checked : Boolean.has.watcher( 'syncSubitems' ),

        // Now it's interesting. subitems - is a collection of checklist item.
        // Collection type is automatically defined for every Model type,
        // and that's why we used @predefine - to give NestedTypes the change to do it.
        // And, it has watcher. Which will be called whenever anything inside will be changed.
        subitems : ChecklistItem.Collection.has.watcher( 'syncChecked' )
    }
});