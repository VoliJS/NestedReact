var Nested   = require( 'nestedtypes' ),
    Link     = require( 'valuelink' );

Nested.Link = Link;

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

Nested.link = function( reference ){
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