// Data objects are defined in nestedtypes package.
import { Model, define } from 'nestedtypes'

/**
 * Data layer is described as models and collections, which can contains each other.
 * Model is represented as an object in JSON, Collection - as an array of objects.
 *
 * We're going to define the structure for checklist as a tree formed of Checklist
 * collection and ChecklistItem model.
 *
 * Every definition must be preceeded with @define decorator.
 */
@define
class Checklist extends Model.Collection {
    // This is the boolean calculated property we're using for convenience.
    // True, whenever all subitems are selected.
    get checked(){
        return this.every( item => item.checked );
    }

    // And it's writable property.
    set checked( checked ){
        if( checked !== this.checked ){
            // 'updateEach' works as each, but wrap the changes in transaction.
            // Simply speaking, it means that just one change event will be fired from subitems,
            // despite the fact that there is a bulk change.
            this.updateEach( item => { item.checked = checked } );
        }
    }

}

/**
 * Think of the models as of the class like in statically typed languages.
 * Such as Java or C++. Difference here is that types are being checked and coerced _dynamically_.
 * And - every model is serializable and observable by default.
 */
@define
export class ChecklistItem extends Model {
    // Link Checklist collection with its model definition, overriding the default collection.
    // Once it's linked, it becomes the collection of the ChecklistItem models.
    // It's useful in our case as we can reference Checklist in attributes spec, creating recursive definition.
    static Collection = Checklist;

    static attributes = { // <- Here's an attribute spec. Think of it as a type spec.
            name : String,

            // Basic type spec form is just mentioning the constructor function.
            // New Date class instance will be automatically created for this attribute.
            created : Date,

            // checked - it's boolean value, which has watcher. Watcher is model's function which
            // is called whenever attribute value is changed.
            // Watchers reacts on every change inside of the attribute structure, no matter how deep it happened.
            // All changes made to the model inside of the watcher won't trigger any
            // additional 'change' events and won't cause extra renders. They are executed in the scope
            // of transaction.
            checked : Boolean.has.watcher( 'checkedWatcher' ),

            // Now it's interesting. subitems - is a collection of checklist items.
            // And, it has watcher. Which will be called whenever anything inside will be changed.
            subitems : Checklist.has.watcher( 'subitemsWatcher' )
    };

    // This is going to be the watcher function for 'checked' attribute.
    checkedWatcher( checked ){
        this.subitems.checked = checked;
    }

    // And this one - for 'subitems', which is nested checklist attribute.
    subitemsWatcher( subitems ){
        if( subitems.length ){
            this.checked = this.subitems.checked;
        }
    }

    // Helper method to delete model from collection, without reference to the collection.
    // In NestedTypes, aggregation is distinguished from references to the shared objects.
    // By default, all attributes and collection elements are aggregated.
    // And model.collection points to the owner collection (if any).
    remove(){ this.collection.remove( this ); }
}