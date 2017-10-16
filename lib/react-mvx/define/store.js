var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
                __extends(InternalStore, _super);
                function InternalStore() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InternalStore;
            }(BaseClass_1));
            InternalStore.attrbutes = store;
            InternalStore = __decorate([
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