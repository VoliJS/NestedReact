var Nested = require( 'nestedtypes' );

var Link = exports.Link = Object.extend( {
    constructor : function( val ){
        this.val = val;
    },

    val : function( x ){ return x; },

    properties :{
        value : {
            get : function(){ return this.val(); },
            set : function( x ){ this.val( x ); }
        }
    },

    requestChange : function( x ){ this.val( x ); },
    get  : function(){ return this.val(); },
    set  : function( x ){ this.val( x ); },
    toggle : function(){ this.val( !this.val() ); },

    contains : function( element ){
        var link = this;

        return new Link( function( x ){
            var arr = link.val(),
                prev = contains( arr, element );

            if( arguments.length ){
                var next = Boolean( x );
                if( prev !== next ){
                    link.val( x ? arr.concat( element ) : without( arr, element ) );
                    return next;
                }
            }

            return prev;
        } );
    },

    // create boolean link for value equality
    equals : function( asTrue ){
        var link = this;

        return new Link( function( x ){
            if( arguments.length ) link.val( x ? asTrue : null );

            return link.val() === asTrue;
        });
    }
} );

exports.link = function( reference ){
    var getMaster = Nested.parseReference( reference );

    function setLink( value ){
        var link = getMaster.call( this );
        link && link.val( value );
    }

    function getLink(){
        var link = getMaster.call( this );
        return link && link.val();
    }

    var LinkAttribute = Nested.attribute.Type.extend( {
        createPropertySpec : function(){
            return {
                // call to optimized set function for single argument. Doesn't work for backbone types.
                set : setLink,

                // attach get hook to the getter function, if present
                get : getLink
            }
        },

        set : setLink
    } );

    var options       = Nested.attribute( { toJSON : false } );
    options.Attribute = LinkAttribute;
    return options;
};

// private array helpers
function contains( arr, el ){
    for( var i = 0; i < arr.length; i++ ){
        if( arr[ i ] === el ) return true;
    }

    return false;
}

function without( arr, el ){
    var res = [];

    for( var i = 0; i < arr.length; i++ ){
        var current = arr[ i ];
        current === el || res.push( current );
    }

    return res;
}