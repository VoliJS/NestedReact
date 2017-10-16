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
/*****************
 * State
 */
import { define, Record, Store } from 'type-r';
export default function process(definition, BaseComponentClass) {
    var prototype = this.prototype;
    var state = definition.state, State = definition.State;
    if (typeof state === 'function') {
        State = state;
        state = void 0;
    }
    if (state) {
        var BaseClass = State || prototype.State || Record;
        var ComponentState = (function (_super) {
            __extends(ComponentState, _super);
            function ComponentState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ComponentState;
        }(BaseClass));
        ComponentState.attributes = state;
        ComponentState = __decorate([
            define
        ], ComponentState);
        prototype.State = ComponentState;
    }
    else if (State) {
        prototype.State = State;
    }
    if (state || State) {
        this.mixins.merge([StateMixin, UpdateOnNestedChangesMixin]);
    }
}
export var StateMixin = {
    //state : null,
    _initializeState: function () {
        // props.__keepState is used to workaround issues in Backbone intergation layer
        var state = this.state = this.props.__keepState || new this.State();
        // Take ownership on state...
        state._owner = this;
        state._ownerKey = 'state';
    },
    context: {
        _nestedStore: Store
    },
    // reference global store to fix model's store locator
    getStore: function () {
        // Attempt to get the store from the context first. Then - fallback to the state's default store.
        // TBD: Need to figure out a good way of managing local stores.
        var context, state;
        return ((context = this.context) && context._nestedStore) ||
            ((state = this.state) && state._defaultStore);
    },
    componentWillUnmount: function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        this._preventDispose /* hack for component-view to preserve the state */ || state.dispose();
        this.state = void 0;
    }
};
export var UpdateOnNestedChangesMixin = {
    _onChildrenChange: function () { },
    componentDidMount: function () {
        this._onChildrenChange = this.asyncUpdate;
    }
};
//# sourceMappingURL=state.js.map