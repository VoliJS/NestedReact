/// <reference types="react" />
/**
 * ES5 components definition factory
 */
export default function createClass<P, S>({statics, ...a_spec}: React.ComponentSpec<P, S>): React.ClassicComponentClass<P>;
