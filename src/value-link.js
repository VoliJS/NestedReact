var Nested   = require( 'nestedtypes' ),
    tools    = require( './tools' ),
    contains = tools.contains,
    without  = tools.without,
    clone    = tools.clone;

var ClassProto      = Nested.Class.prototype,
    ModelProto      = Nested.Model.prototype,
    CollectionProto = Nested.Collection.prototype;

ClassProto.getLink = ModelProto.getLink = CollectionProto.getLink = function( attr ){
    var model = this,
        error = model.validationError;

    return new Link( model[ attr ], function( x ){
        model[ attr ] = x;
    }, error && error.nested[ attr ] );
};

ModelProto.deepLink = function( attr, options ){
    var model = this,
        values = model.deepInvalidate( attr );

    return new Link( values[ 0 ], function( x ){
        model.deepSet( attr, x, options );
    }, values[ 1 ] );
};

CollectionProto.hasLink = function( model ){
    var collection = this;

    return new Link( Boolean( collection.get( model ) ), function( x ){
        var next = Boolean( x );
        this.value === next || collection.toggle( model, next );
    } );
};

var Link = exports.Link = Object.extend( {
    constructor : function( value, set, error ){
        this.value           = value;
        this.requestChange   = set;
        this.validationError = error;
    },

    value           : null,
    validationError : null,
    requestChange   : function( x ){},
    set             : function( x ){ this.requestChange( x ); },
    toggle          : function(){ this.requestChange( !this.value ); },

    // create function which updates the link
    update : function( transform ){
        var link = this;
        return function(){
            link.requestChange( transform( link.value ) )
        }
    },

    contains : function( element ){
        var link = this;

        return new Link( contains( this.value, element ), function( x ){
            var next = Boolean( x );
            if( this.value !== next ){
                var arr = link.value;
                link.requestChange( x ? arr.concat( element ) : without( arr, element ) );
            }
        } );
    },

    // create boolean link for value equality
    equals : function( asTrue ){
        var link = this;

        return new Link( this.value === asTrue, function( x ){
            link.requestChange( x ? asTrue : null );
        } );
    },

    // link to enclosed object or array member
    at : function( key ){
        var link = this;

        return new Link( this.value[ key ], function( x ){
            if( this.value !== x ){
                var arr    = link.value;
                arr        = clone( arr );
                arr[ key ] = x;
                link.requestChange( arr );
            }
        } );
    },

    // iterates through enclosed object or array, generating set of links
    map : function( fun ){
        var arr = this.value;
        return arr ? ( arr instanceof Array ? mapArray( this, arr, fun ) : mapObject( this, arr, fun ) ) : [];
    }
} );

function mapObject( link, object, fun ){
    var res = [];

    for( var i in object ){
        if( object.hasOwnProperty( i ) ){
            var y = fun( link.at( i ), i );
            y === void 0 || ( res.push( y ) );
        }
    }

    return res;
}

function mapArray( link, arr, fun ){
    var res = [];

    for( var i = 0; i < arr.length; i++ ){
        var y = fun( link.at( i ), i );
        y === void 0 || ( res.push( y ) );
    }

    return res;
}

exports.link = function( reference ){
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