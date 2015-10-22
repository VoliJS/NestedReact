var React = require( 'react' ),
    ReactDOM = require( 'react-dom' );

module.exports = React.createClass({
    displayName : 'BackboneView',

    propTypes : {
        View : React.PropTypes.func.isRequired,
        options : React.PropTypes.object
    },

    render : function(){
        return ReactDOM.div({
            ref : 'subview',
            className : this.props.className
        });
    },

    componentDidMount : function(){
        var el = this.refs.subview,
            p = this.props;

        var view = this.view = p.options ? new p.View( p.options ) : new p.View();

        if( el.getDOMNode ) el = el.getDOMNode();

        el.appendChild( view.el );
        view.render();
    },

    componentDidUpdate : function(){
        this.view.render();
    },

    componentWillUnmount : function(){
        var view = this.view;
        if( view.dispose ) view.dispose();
    }
});
