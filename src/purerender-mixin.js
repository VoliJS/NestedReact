module.exports = function( propTypes ){
    var ctor = [ 'var v;this._s=s&&s._changeToken'], isChanged = ['var v;return(s&&s._changeToken!==this._s)'];

    for( var name in propTypes ){
        var propExpr = '((v=p.' + name + ')&&v._changeToken)||v';

        ctor.push( 'this.' + name + '=' + propExpr );
        isChanged.push( 'this.' + name + '!==(' + propExpr + ')' );
    }

    var ChangeTokens = new Function( 'p', 's', ctor.join( ';' ) ),
        isChanged = new Function( 't', 'p', 's', isChanged.join( '||' ) );

    return {
        _changeTokens : null,

        isChanged : isChanged, ChangeTokens : ChangeTokens,

        shouldComponentUpdate : function( nextProps ){
            return isChanged( this, nextProps, this.state );
        },

        componentDidMount  : function(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        },
        componentDidUpdate : function(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        }
    }
}