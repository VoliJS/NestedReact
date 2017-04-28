import { Store } from 'type-r';
export default function process(spec: any, baseProto: any): void;
export declare const StateMixin: {
    state: any;
    componentWillMount(): void;
    context: {
        _nestedStore: typeof Store;
    };
    getStore(): any;
    componentWillUnmount(): void;
};
export declare const UpdateOnNestedChangesMixin: {
    _onChildrenChange(): void;
    componentDidMount(): void;
};
