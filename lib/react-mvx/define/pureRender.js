export default function createPureRenderMixin(props) {
    var ctorBody = ['var v; this._s = s && s._changeToken'], isChangedBody = ['var v; return ( s && s._changeToken !== t._s )'];
    for (var name_1 in props) {
        var propExpr = "( ( v = p." + name_1 + ") && v._changeToken ) || v";
        ctorBody.push("this." + name_1 + "= " + propExpr);
        isChangedBody.push("t." + name_1 + " !== (" + propExpr + ")");
    }
    var ChangeTokens = new Function('p', 's', ctorBody.join(';')), isChanged = new Function('t', 'p', 's', isChangedBody.join('||'));
    ChangeTokens.prototype = null;
    return {
        _changeTokens: null,
        shouldComponentUpdate: function (nextProps) {
            return isChanged(this._changeTokens, nextProps, this.state);
        },
        componentDidMount: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        },
        componentDidUpdate: function () {
            this._changeTokens = new ChangeTokens(this.props, this.state);
        }
    };
}
;
//# sourceMappingURL=pureRender.js.map