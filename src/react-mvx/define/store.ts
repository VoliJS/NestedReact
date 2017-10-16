import { define, Store } from 'type-r'
import { StateMixin, UpdateOnNestedChangesMixin } from './state'
import { ComponentClass } from './common'

export interface StoreDefinition {
    store? : typeof Store | Store | object
    Store? : typeof Store
}

export interface StoreProto {
    store? : Store
    Store? : typeof Store
}

export default function onDefine( this : ComponentClass<StoreProto>, definition : StoreDefinition, BaseClass : ComponentClass<StoreProto> ){
    let { store, Store : StoreClass } = definition;

    if( store && store instanceof Store ){
        // Direct reference to an existing store. Put it to the prototype.
        this.prototype.store = store;
        this.mixins.merge([ ExternalStoreMixin, ExposeStoreMixin ]);
    }
    else if( store || definition.Store ) {
        if( typeof store === 'function' ){
            StoreClass = store;
            store = void 0;
        }

        if( store ){
            const BaseClass = StoreClass || this.prototype.Store || Store;
            @define class InternalStore extends BaseClass {
                static attrbutes = store;
            };

            this.prototype.Store = InternalStore;
        }
        else if( StoreClass ){
            this.prototype.Store = StoreClass;
        }

        this.mixins.merge([ InternalStoreMixin, UpdateOnNestedChangesMixin, ExposeStoreMixin ]);
    }
}

/**
 * Attached whenever the store declaration of any form is present in the component.
 */
const ExposeStoreMixin = {
    childContext : {
        _nestedStore : Store
    },

    getChildContext(){
        return { _nestedStore : this.store };
    },

    getStore(){
        return this.store;
    },

    // Will be called by the store when the lookup will fail.
    get( key ){
        // Ask upper store.
        const store = StateMixin.getStore.call( this, key );
        return store && store.get( key );
    }
};

/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
const ExternalStoreMixin = {
    componentDidMount(){
        // Start UI updates on state changes.
        this.listenTo( this.store, 'change', this.asyncUpdate );
    }
};

const InternalStoreMixin = {
    componentWillMount(){
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },

    componentWillUnmount(){
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = void 0;
    }
};
