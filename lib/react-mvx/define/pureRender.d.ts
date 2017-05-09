export default function createPureRenderMixin(props: any): {
    _changeTokens: any;
    shouldComponentUpdate(nextProps: any): any;
    componentDidMount(): void;
    componentDidUpdate(): void;
};
