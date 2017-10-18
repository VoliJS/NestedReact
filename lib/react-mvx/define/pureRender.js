export function createChangeTokensConstructor(props) {
    var propNames = Object.keys(props);
    var PropsChangeTokens = new Function('p', 's', "\n        var v;\n        this._s = s && s._changeToken;\n        " + propNames.map(function (name) { return "\n            this." + name + " = ( ( v = p." + name + ") && v._changeToken ) || v;\n        "; }).join('') + "\n    ");
    PropsChangeTokens.prototype._hasChanges = new Function('p', 's', "\n        var v;\n        return ( s && s._changeToken !== this._s ) " + propNames.map(function (name) { return " ||\n            this." + name + " !== ( ( ( v = p." + name + ") && v._changeToken ) || v )\n        "; }).join('') + ";\n    ");
    return PropsChangeTokens;
}
;
export var EmptyPropsChangeTokensCtor = createChangeTokensConstructor({});
export var PureRenderMixin = {
    shouldComponentUpdate: function (nextProps) {
        return this._propsChangeTokens._hasChanges(nextProps);
    },
    componentDidMount: updateChangeTokens,
    componentDidUpdate: updateChangeTokens
};
function updateChangeTokens() {
    this._propsChangeTokens = new this.PropsChangeTokens(this.props, this.state);
}
//# sourceMappingURL=pureRender.js.map