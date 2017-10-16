import { compileSpecs } from './typeSpecs';
import { tools } from 'type-r';
export default function onDefine(_a, BaseClass) {
    var context = _a.context, childContext = _a.childContext;
    var prototype = this.prototype;
    if (context) {
        // Merge in inherited members...
        prototype._context = tools.defaults(context, BaseClass.prototype._context || {});
        // Compile to propTypes...
        this.contextTypes = compileSpecs(context).propTypes;
    }
    if (childContext) {
        prototype._childContext = tools.defaults(childContext, BaseClass.prototype._childContext);
        this.childContextTypes = compileSpecs(childContext).propTypes;
    }
}
//# sourceMappingURL=context.js.map