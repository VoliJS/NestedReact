import { compileSpecs, collectSpecs } from './typeSpecs'

export default function process( spec, { _context = {}, _childContext = {} } ){
    // process context specs...
    const context = collectSpecs( spec, 'context' );
    if( context ){
        spec._context = { ..._context, ...context };
        spec.contextTypes = compileSpecs( context ).propTypes;
        delete spec.context;
    }

    // and child context specs...
    const childContext = collectSpecs( spec, 'childContext' );
    if( childContext ){
        spec._childContext = { ..._childContext, ...childContext };
        spec.childContextTypes = compileSpecs( childContext ).propTypes;
        delete spec.childContext;
    }
}
