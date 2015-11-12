var Nested = require( 'nestedtypes' );

var Value = exports.Value = Object.extend( {
    val : function( x ){},

    properties :{
        value : {
            get : function(){ return this.val(); },
            set : function( x ){ this.val( x ); }
        }
    },

    requestChange : function( x ){ this.val( x ); },
    get  : function(){ return this.val(); },
    set  : function( x ){ this.val( x ); },
    toggle : function(){ this.val( !this.val() ); }
} );

exports.Attr = Value.extend( {
    constructor : function( model, attr ){
        this.val = function( x ){
            if( arguments.length ){
                model[ attr ] = x;
            }

            return model[ attr ];
        };
    },

    // create boolean link for value in array
    contains : function( value ){
        return new ArrayHas( this, value );
    },

    // create boolean link for value equality
    equals : function( value ){
        return new ValueEql( this, value );
    }
} );

var ValueEql = exports.ValueEql = Value.extend( {
    constructor : function( link, asTrue ){
        this.val = function( x ){
            if( arguments.length ) link.val( x ? asTrue : null );

            return link.val() === asTrue;
        };
    }
} );

var ArrayHas = exports.ArrayHas = Value.extend( {
    constructor : function( link, element ){
        this.val = function( x ){
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
        };
    }
} );

exports.CollectionHas = Value.extend( {
    constructor : function( collection, model ){
        this.val = function( x ){
            var prev = Boolean( collection.get( model ) );

            if( arguments.length ){
                var next = Boolean( x );
                if( prev !== next ){
                    collection.toggle( model, x );
                    return next;
                }
            }

            return prev;
        };
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