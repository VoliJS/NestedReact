/*****************
 * State
 */
import { collectSpecs } from './typeSpecs';
import { Record, Store } from 'type-r';
export default function process(spec, baseProto) {
    // process state spec...
    var attributes = collectSpecs(spec, 'state');
    if (attributes || baseProto.State) {
        var BaseModel = baseProto.State || Record;
        spec.State = attributes ? (typeof attributes === 'function' ? attributes : BaseModel.defaults(attributes)) : BaseModel;
        spec.mixins.push(StateMixin);
        spec.mixins.push(UpdateOnNestedChangesMixin);
        delete spec.state;
        delete spec.attributes;
    }
}
export var StateMixin = {
    state: null,
    componentWillMount: function () {
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
        return ((context = this.context) && context._archetypeStore) ||
            ((state = this.state) && state._defaultStore);
    },
    componentWillUnmount: function () {
        var state = this.state;
        state._owner = state._ownerKey = void 0;
        state.dispose();
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