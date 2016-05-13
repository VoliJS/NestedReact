var Nested = require( 'nestedtypes' ),
    Link   = require( 'valuelink' );

module.exports = Nested.Link = Link;
Object.extend.attach( Link );

/**
 * Link to NestedType's model attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Safe implementation of _changeToken.
 * @param model
 * @param attr
 * @constructor
 */
function ModelLink( model, attr ){
    this.value = model[ attr ];
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
            if( this._error === void 0 ){
                this._error = this.model.getValidationError( this.attr );
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

/**
 * Boolean link to presence of NestedType's model in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 * @param collection
 * @param model
 * @constructor
 */
function CollectionLink( collection, model ){
    this.value      = Boolean( collection.get( model ) );
    this.collection = collection;
    this.model      = model;
}

CollectionLink.prototype = Object.create( Link.prototype, {
    _changeToken : {
        get : function(){ return this.collection._changeToken; }
    }
} );

CollectionLink.prototype.constructor = CollectionLink;
CollectionLink.prototype.set         = function( x ){
    this.collection.toggle( this.model, x );
};

var CollectionProto = Nested.Collection.prototype;

CollectionProto.hasLink = function( model ){
    return new CollectionLink( this, model );
};

CollectionProto.getLink = function( prop ){
    return new ModelLink( this, prop );
};

var ModelProto      = Nested.Model.prototype;

ModelProto.getLink = function( attr ){
    return new ModelLink( this, attr );
};


function ModelDeepLink( model, path, options ){
    this.value   = model.deepGet( path );
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
