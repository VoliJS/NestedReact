import { ChangeHandler } from 'type-r';
import { ComponentProto } from './common';
export interface TypeSpecs {
    [name: string]: object | Function;
}
export declare function compileSpecs(props: TypeSpecs): {
    propTypes: {};
    defaults: any;
    watchers: {
        [name: string]: (this: ComponentProto, propValue: any, propName: string) => void;
    };
    changeHandlers: {
        [name: string]: ChangeHandler[];
    };
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
