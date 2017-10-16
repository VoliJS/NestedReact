import { compileSpecs, TypeSpecs } from './typeSpecs'
import { tools } from 'type-r'
import { ComponentClass } from './common'

export interface ContextDefinition {
    context : TypeSpecs
    childContext : TypeSpecs
}

export interface ContextProto {
    _context : TypeSpecs
    _childContext : TypeSpecs
}

export default function onDefine( this : ComponentClass<ContextProto>, { context, childContext } : ContextDefinition, BaseClass : ComponentClass<ContextProto> ){
    const { prototype } = this;

    if( context ){
        // Merge in inherited members...
        prototype._context = tools.defaults( context, BaseClass.prototype._context || {} );

        // Compile to propTypes...
        this.contextTypes = compileSpecs( context ).propTypes;
    }

    if( childContext ){
        prototype._childContext = tools.defaults( childContext, BaseClass.prototype._childContext );
        this.childContextTypes = compileSpecs( childContext ).propTypes;
    }
}
