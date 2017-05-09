export interface TypeSpecs {
    [name: string]: Object | Function;
}
export declare function collectSpecs(spec: any, name: string): TypeSpecs;
export declare function compileSpecs(props: TypeSpecs): {
    propTypes: {};
    defaults: any;
    watchers: any;
    changeHandlers: any;
};
export declare class Node {
}
export declare class Element {
}
declare global  {
    interface NumberConstructor {
        integer: Function;
    }
}
export {};
