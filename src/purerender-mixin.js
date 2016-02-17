module.exports = function( propTypes ){
    var ctor      = [ 'var v;this._s=s&&s._changeToken' ],
        isChanged = [ 'var v;return(s&&s._changeToken!==t._s)' ];

    for( var name in propTypes ){
        var propExpr = '((v=p.' + name + ')&&v._changeToken)||v';

        ctor.push( 'this.' + name + '=' + propExpr );
        isChanged.push( 't.' + name + '!==(' + propExpr + ')' );
    }

    var ChangeTokens = new Function( 'p', 's', ctor.join( ';' ) ),
        isChanged    = new Function( 't', 'p', 's', isChanged.join( '||' ) );

    ChangeTokens.prototype = null;

    return {
        _changeTokens : null,

        shouldComponentUpdate : function( nextProps ){
            return isChanged( this._changeTokens, nextProps, this.state );
        },

        componentDidMount  : function(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        },
        componentDidUpdate : function(){
            this._changeTokens = new ChangeTokens( this.props, this.state );
        }
    }
};