export default function createPureRenderMixin( props ){
    const ctorBody      = [ 'var v; this._s = s && s._changeToken' ],
        isChangedBody = [ 'var v; return ( s && s._changeToken !== t._s )' ];

    for( let name in props ){
        const propExpr = `( ( v = p.${ name }) && v._changeToken ) || v`;
        ctorBody.push( `this.${ name }= ${ propExpr }`);
        isChangedBody.push( `t.${ name } !== (${ propExpr })` );
    }

    const ChangeTokens : any = new Function( 'p', 's', ctorBody.join( ';' ) ),
          isChanged    = new Function( 't', 'p', 's', isChangedBody.join( '||' ) );

    ChangeTokens.prototype = null;

    return {
        _changeTokens : null,

        shouldComponentUpdate( nextProps ){
            return isChanged( this._changeTokens, nextProps, this.state );
        },

        componentDidMount(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        },
        componentDidUpdate(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        }
    }
};