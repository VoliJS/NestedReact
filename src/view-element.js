var React        = require( 'react' ),
    jsonNotEqual = require( 'nestedtypes' ).tools.notEqual;

module.exports = React.createClass( {
    displayName : 'BackboneView',

    propTypes : {
        View    : React.PropTypes.func.isRequired,
        options : React.PropTypes.object
    },

    shouldComponentUpdate : function( next ){
        var props = this.props;
        return next.View !== props.View || jsonNotEqual( next.options, props.options );
    },

    hasUnsavedChanges : function(){
        var view = this.view;

        return view && (
                typeof view.hasUnsavedChanges === 'function' ? view.hasUnsavedChanges() : view.hasUnsavedChanges
            );
    },

    render : function(){
        return React.DOM.div( {
            ref       : 'subview',
            className : this.props.className
        } );
    },

    componentDidMount    : function(){
        this._mountView();
    },

    componentDidUpdate   : function(){
        this._dispose();
        this._mountView();
    },

    componentWillUnmount : function(){
        this._dispose();
    },

    _mountView : function(){
        var el = this.refs.subview,
            p  = this.props;

        var view = this.view = p.options ? new p.View( p.options ) : new p.View();

        el.appendChild( view.el );
        view.render();
    },

    _dispose : function(){
        var view = this.view;
        if( view ){
            if( view.dispose ){
                view.dispose();
            }
            else{
                view.stopListening();
                view.off();
            }

            this.refs.subview.innerHTML = "";
            this.view                   = null;
        }
    }
} );