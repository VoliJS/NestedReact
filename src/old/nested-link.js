var Nested = require( 'nestedtypes' ),
    Link   = require( 'valuelink' ).default;

module.exports = Nested.Link = Link;

Nested.Mixable.mixTo( Link );

/**
 * Link to NestedType's model attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Links are cached in the models
 */
function ModelLink( model, attr, value ){
    Link.call( this, value );
    this.model = model;
    this.attr  = attr;
}

ModelLink.prototype = Object.create( Link.prototype, {
    constructor : { value : ModelLink },
    set         : {
        value : function( x ){
            this.model[ this.attr ] = x;
        }
    },

    error : {
        get : function(){
            return this._error === void 0 ? this.model.getValidationError( this.attr ): this._error;
        },

        set : function( x ){
            this._error = x;
        }
    }
} );

var ModelProto = Nested.Record.prototype;

Object.defineProperty( ModelProto, 'links', {
    get : function(){
        return this._links || ( this._links = new this.Attributes( {} ) );
    }
});

function cacheLink( links, model, key ){
    var cached = links[ key ],
        value = model[ key ];

    return cached && cached.value === value ? cached
                : links[ key ] = new ModelLink( model, key, value );
}

ModelProto.getLink = function( key ){
    return cacheLink( this.links, this, key );
};

ModelProto.linkAll = function(){
    var links = this.links;

    if( arguments.length ){
        for( var i = 0; i < arguments.length; i++ ){
            cacheLink( links, this, arguments[ i ] );
        }
    }
    else{
        var attributes = this.attributes;

        for( var key in attributes ){
            attributes[ key ] === void 0 || cacheLink( links, this, key );
        }
    }

    return links;
};

/**
 * Boolean link to presence of NestedType's model in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 * @param collection
 * @param model
 * @constructor
 */
function CollectionLink( collection, model ){
    Link.call( this, Boolean( collection._byId[ model.cid ] ) );
    this.collection = collection;
    this.model      = model;
}

CollectionLink.prototype = Object.create( Link.prototype, {
    constructor : { value : CollectionLink },
    set : {
        value : function( x ){
            this.collection.toggle( this.model, x );
        }
    }
} );

var CollectionProto = Nested.Record.Collection.prototype;

CollectionProto.hasLink = function( model ){
    return new CollectionLink( this, model );
};

CollectionProto.getLink = function( prop ){
    var collection = this;
    return Link.value( collection[ prop ], function( x ){ collection[ prop ] = x; });
};

function ModelDeepLink( model, path, options ){
    Link.call( this, model.deepGet( path ) );
    this.model   = model;
    this.path    = path;
    this.options = options;
}

ModelDeepLink.prototype = Object.create( Link.prototype, {
    constructor : { value : ModelDeepLink },

    error : {
        get : function(){
            if( this._error === void 0 ){
                this._error = this.model.deepValidationError( this.path ) || null;
            }

            return this._error;
        },

        set : function( x ){
            this._error = x;
        }
    },

    _changeToken : {
        get : function(){ return this.model._changeToken; }
    }
} );

ModelDeepLink.prototype.set = function( x ){
    this.model.deepSet( this.path, x, this.options );
};

ModelProto.deepLink = function( path, options ){
    return new ModelDeepLink( this, path, options )
};

Nested.link = function( reference ){
    var getMaster = Nested.parseReference( reference );

    function setLink( value ){
        var link = getMaster.call( this );
        link && link.set( value );
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
