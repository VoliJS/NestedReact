module.exports = {
    shouldComponentUpdate : shouldComponentUpdate,

    componentDidMount  : updateTokens,
    componentDidUpdate : updateTokens
};

function shouldComponentUpdate( nextProps ){
    var state = this.state;

    if( state && this._stateToken !== state._changeToken ){
        return true;
    }

    var nextPropKeys = Object.keys( nextProps ),
        propKeys     = this._propKeys;

    return nextPropKeys.length != propKeys.length ||
           propsChanged( propKeys, this._propTokens, this.props, nextProps );
}

function updateTokens(){
    var props    = this.props,
        state    = this.state,
        propKeys = this._propKeys = Object.keys( props ),
        propTokens = Array( propKeys.length );

    this._stateToken = state && state._changeToken;

    for( var i = 0; i < propKeys.length; i++ ){
        var value = props[ propKeys[ i ] ],
            token = value && value._changeToken;

        if( token ){
            propTokens[ i ] = token;
        }
    }

    this._propTokens = propTokens;
}

function propsChanged( propKeys, propTokens, props, nextProps ){
    for( var i = 0; i < propKeys.length; i++ ){
        var name = propKeys[ i ],
            next = nextProps[ name ],
            prev = props[ name ];

        if( next !== prev ){
            return true;
        }

        if( ( next && next._changeToken ) !== propTokens[ i ] ){
            return true;
        }
    }

    return false;
}