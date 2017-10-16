export function createChangeTokensConstructor( props ) {
    const propNames = Object.keys( props );

    const PropsChangeTokens = new Function( 'p', 's', `
        var v;
        this._s = s && s._changeToken;
        ${ propNames.map( name => `
            this.${ name } = ( ( v = p.${ name }) && v._changeToken ) || v;
        `).join( '' )}
    `);
    
    PropsChangeTokens.prototype._hasChanges = new Function( 'p', 's', `
        var v;
        return ( s && s._changeToken !== this._s ) ${ propNames.map( name => ` ||
            this.${ name } !== ( ( ( v = p.${ name }) && v._changeToken ) || v )
        `).join( '' )};
    `);    

    return PropsChangeTokens;
};

export const PureRenderMixin = {
    shouldComponentUpdate( nextProps ){
        return this._propsChangeTokens._hasChanges( nextProps );
    },

    componentDidMount : updateChangeTokens,
    componentDidUpdate : updateChangeTokens
}

function updateChangeTokens(){
    this._propsChangeTokens = new this.PropsChangeTokens( this.props, this.state );
}