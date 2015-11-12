var Nested = require( 'nestedtypes' );

var Value = exports.Value = Object.extend( {
    properties :{
        value : {
            get : function(){ return this.get(); },
            set : function( val ){ this.set( val ); }
        }
    },

    requestChange : function( val ){ this.set( val ); },
    toggle : function(){ this.set( !this.get() ); },

    get  : function(){ throw new ReferenceError( 'Not implemented' ); },
    set  : function(){ throw new ReferenceError( 'Not implemented' ); }
} );

exports.Attr = Value.extend( {
    constructor : function( model, attr ){
        this.get = function(){ return model[ attr ]; };
        this.set = function( val ){ model[ attr ] = val; };
    },

    // create boolean link for value in array
    lhas : function( value ){
        return new ArrayHas( this, value );
    },

    // create boolean link for value equality
    leql : function( value ){
        return new ValueEql( this, value );
    }
} );

var ValueEql = exports.ValueEql = Value.extend( {
    constructor : function( link, asTrue ){
        this.get = function(){ return link.get() === asTrue; };
        this.set = function( val ){ link.set( val ? asTrue : null ); };
    }
} );

var ArrayHas = exports.ArrayHas = Value.extend( {
    constructor : function( link, element ){
        this.get = function(){ return contains( link.get(), element ); };

        this.set = function( next ){
            var arr = link.get();
            if( contains( arr, element ) !== Boolean( next ) ){
                link.set( next ? arr.concat( element ) : without( arr, element ) );
            }
        };
    }
} );

exports.CollectionHas = Value.extend( {
    constructor : function( collection, model ){
        this.get = function(){ return Boolean( collection.get( model ) ); };
        this.set = function( val ){ collection.toggle( model, val ); };
    }
} );

exports.valueLink = function( reference ){
    var getMaster = Nested.parseReference( reference );

    function setLink( value ){
        var link = getMaster.call( this );
        link && link.set( value );
    }

    function getLink(){
        var link = getMaster.call( this );
        return link && link.get();
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