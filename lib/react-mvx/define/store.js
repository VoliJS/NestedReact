import * as tslib_1 from "tslib";
import { define, Store } from 'type-r';
import { StateMixin, UpdateOnNestedChangesMixin } from './state';
export default function onDefine(definition, BaseClass) {
    var store = definition.store, StoreClass = definition.Store;
    if (store && store instanceof Store) {
        // Direct reference to an existing store. Put it to the prototype.
        this.prototype.store = store;
        this.mixins.merge([ExternalStoreMixin, ExposeStoreMixin]);
    }
    else if (store || definition.Store) {
        if (typeof store === 'function') {
            StoreClass = store;
            store = void 0;
        }
        if (store) {
            var BaseClass_1 = StoreClass || this.prototype.Store || Store;
            var InternalStore = (function (_super) {
                tslib_1.__extends(InternalStore, _super);
                function InternalStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InternalStore;
            }(BaseClass_1));
            InternalStore.attrbutes = store;
            InternalStore = tslib_1.__decorate([
                define
            ], InternalStore);
            ;
            this.prototype.Store = InternalStore;
        }
        else if (StoreClass) {
            this.prototype.Store = StoreClass;
        }
        this.mixins.merge([InternalStoreMixin, UpdateOnNestedChangesMixin, ExposeStoreMixin]);
    }
}
/**
 * Attached whenever the store declaration of any form is present in the component.
 */
var ExposeStoreMixin = {
    childContext: {
        _nestedStore: Store
    },
    getChildContext: function () {
        return { _nestedStore: this.store };
    },
    getStore: function () {
        return this.store;
    },
    // Will be called by the store when the lookup will fail.
    get: function (key) {
        // Ask upper store.
        var store = StateMixin.getStore.call(this, key);
        return store && store.get(key);
    }
};
/**
 * External store must just track the changes and trigger render.
 * TBD: don't use it yet.
 */
var ExternalStoreMixin = {
    componentDidMount: function () {
        // Start UI updates on state changes.
        this.listenTo(this.store, 'change', this.asyncUpdate);
    }
};
var InternalStoreMixin = {
    componentWillMount: function () {
        var store = this.store = new this.Store();
        store._owner = this;
        store._ownerKey = 'store';
    },
    componentWillUnmount: function () {
        this.store._ownerKey = this.store._owner = void 0;
        this.store.dispose();
        this.store = void 0;
    }
};
//# sourceMappingURL=store.js.map