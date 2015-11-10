var Nested = require( 'nestedtypes' );

var Value = exports.Value = Object.extend( {
    value          : void 0,
    requestChange : function( val ){ throw new ReferenceError(); },

    set  : function( val ){ this.requestChange( val ); },
    fset : function( val ){
        var link = this;
        return function(){ link.requestChange( val ); }
    }
} );

exports.Attr = Value.extend( {
    constructor : function( model, attr ){
        this.value          = model[ attr ];
        this.requestChange = function( val ){
            model[ attr ] = val;
        }
    },

    // for array links
    lhas : function( value ){
        return new ArrayHas( this, value );
    },

    leql : function( value ){
        return new ValueEql( this, value );
    }
} );

var Bool = exports.Bool = Value.extend( {
    toggle : function(){ this.requestChange( !this.value ); },

    ftoggle : function(){
        var link = this;
        return function(){ link.requestChange( !link.value ) };
    }
} );

var ValueEql = exports.ValueEql = Bool.extend( {
    constructor : function( link, asTrue ){
        this.value          = link.value === asTrue;
        this.requestChange = function( val ){
            link.requestChange( val ? asTrue : null );
        }
    }
} );

var ArrayHas = exports.ArrayHas = Bool.extend( {
    constructor : function( link, element ){
        var value  = Boolean( contains( link.value, element ) );
        this.value = value;

        this.requestChange = function( next ){
            if( value !== Boolean( next ) ){
                var prev = link.value;
                link.requestChange( next ? prev.concat( element ) : without( prev, element ) );
            }
        };
    }
} );

exports.CollectionHas = Bool.extend( {
    constructor : function( collection, model ){
        this.value          = Boolean( collection.get( model ) );
        this.requestChange = function( val ){ collection.toggle( model, val ); }
    }
} );

exports.valueLink = function( reference ){
    var getMaster = Nested.parseReference( reference );

    function setLink( value ){
        var link = getMaster.call( this );
        link && link.requestChange( value );
    }

    function getLink(){
        var link = getMaster.call( this );
        return link && link.value;
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