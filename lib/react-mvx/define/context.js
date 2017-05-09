var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { compileSpecs, collectSpecs } from './typeSpecs';
export default function process(spec, _a) {
    var _b = _a._context, _context = _b === void 0 ? {} : _b, _c = _a._childContext, _childContext = _c === void 0 ? {} : _c;
    // process context specs...
    var context = collectSpecs(spec, 'context');
    if (context) {
        spec._context = __assign({}, _context, context);
        spec.contextTypes = compileSpecs(context).propTypes;
        delete spec.context;
    }
    // and child context specs...
    var childContext = collectSpecs(spec, 'childContext');
    if (childContext) {
        spec._childContext = __assign({}, _childContext, childContext);
        spec.childContextTypes = compileSpecs(childContext).propTypes;
        delete spec.childContext;
    }
}
//# sourceMappingURL=context.js.map