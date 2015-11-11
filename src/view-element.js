var React = require( 'react' );

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

module.exports = React.createClass({
    displayName : 'BackboneView',

    propTypes : {
        View : React.PropTypes.func.isRequired,
        options : React.PropTypes.object
    },

    shouldComponentUpdate : function( next ){
        var props = this.props;
        return next.View !== props.View || !shallowEqual( next.options, props.options );
    },

    render : function(){
        return React.DOM.div({
            ref : 'subview',
            className : this.props.className
        });
    },

    componentDidMount : function(){
        this._mountView();
    },
    componentDidUpdate : function(){
        this._dispose();
        this._mountView();
    },
    componentWillUnmount : function(){
        this._dispose();
    },

    _mountView: function () {
        var el = this.refs.subview,
            p = this.props;

        var view = this.view = p.options ? new p.View( p.options ) : new p.View();

        el.appendChild( view.el );
        view.render();
    },

    _dispose : function(){
        var view = this.view;
        if( view ){
            view.stopListening();
            if( view.dispose ) view.dispose();
            this.refs.subview.innerHTML = "";
            this.view = null;
        }
    }
});
