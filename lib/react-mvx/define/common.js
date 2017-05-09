/**
 * attach async event processing and transactional support.
 */
import { tools, Events } from 'type-r';
export default function compile(spec, baseProto) {
    // Attach common mixin
    spec.mixins.push(CommonMixin);
}
export function asyncUpdate() {
    this.shouldComponentUpdate === returnFalse || this._disposed || this.forceUpdate();
}
function returnFalse() { return false; }
/**
 * Mixin which is attached to all components.
 */
var CommonMixin = tools.assign({
    componentWillUnmount: function () {
        // Prevent memory leaks when working with events.
        this.off();
        this.stopListening();
        // Mark component as disposed.
        this._disposed = true;
    },
    // Safe version of the forceUpdate suitable for asynchronous callbacks.
    asyncUpdate: asyncUpdate,
    /**
     * Performs transactional update for both props and state.
     * Suppress updates during the transaction, and force update aftewards.
     * Wrapping the sequence of changes in a transactions guarantees that
     * React component will be updated _after_ all the changes to the
     * both props and local state are applied.
     */
    transaction: function (fun) {
        var shouldComponentUpdate = this.shouldComponentUpdate, isRoot = shouldComponentUpdate !== returnFalse;
        if (isRoot) {
            this.shouldComponentUpdate = returnFalse;
        }
        fun(this.props, this.state);
        if (isRoot) {
            this.shouldComponentUpdate = shouldComponentUpdate;
            this.asyncUpdate();
        }
    }
}, Events);
//# sourceMappingURL=common.js.map