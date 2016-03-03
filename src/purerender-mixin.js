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

function advanced( propTypes ){
    function propExpr( name ){
        return '(( v = p.${key} ) && v._changeToken ) || v'.replace( '${key}', name );
    }

    join( )
    macro( propTypes )
        .transform( '(( v = p.${key} ) && v._changeToken ) || v' )
        .transform( 'this.${key} = ${val};' )


    var Tokens = Function
                    .define( 'p', 's' )
                    .add( 'var v;' )
                    .add( 'this._s = s && s._changeToken;' )
                    .unroll( 'this.${key} = ${val};', propTypes, propExpr )
                    .create({ prototype : null });

    var isChanged = Function
                    .define( 't', 'p', 's' )
                    .add( 'var v;' )
                    .add( 'return ( s && s._changeToken! == t._s )' )
                    .unroll( 't.${key} !==( ${val} )')


    [
        'var v;',
        'return ',
            join( '||', [
                '( s && s._changeToken! == t._s )',

            ])

        ]


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