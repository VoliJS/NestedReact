/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */

import { Mixable, Record } from 'type-r'
import { Link } from './valuelink/link'

export default Link;

Mixable.mixTo( <any>Link );

interface LinksCache {
    [ key : string ] : RecordLink
}

/**
 * Record
 */
Record.mixins({
    // Link to the record's attribute by its key.
    linkAt( key : string ) : RecordLink {
        return cacheLink( getLinksCache( this ), this, key );
    },

    // Link to the attribute of the record's tree by symbolic path.
    linkPath( path : string, options? : {} ) : RecordDeepLink {
        return new RecordDeepLink( this, path, options )
    },

    // Link all (or listed) attributes and return links cache.
    linkAll() : LinksCache {
        const links = getLinksCache( this );

        if( arguments.length ){
            for( let i = 0; i < arguments.length; i++ ){
                cacheLink( links, this, arguments[ i ] );
            }
        }
        else{
            const { attributes } = this;

            for( let key in attributes ){
                attributes[ key ] === void 0 || cacheLink( links, this, key );
            }
        }

        return links;
    }
});

/**
 * Link to Type-R's record attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Links are cached in the records
 */
class RecordLink extends Link< any > {
    constructor( public record, public attr, value ){
        super( value );
    }

    set( x ){
        this.record[ this.attr ] = x;
    }

    _error? : any

    get error(){
        return this._error === void 0 ?
                    this.record.getValidationError( this.attr ) :
                    this._error;
    }

    set error( x ){
        this._error = x;
    }
}

class RecordDeepLink extends Link< any > {
    constructor( public record, public path, public options ){
        super( record.deepGet( path ) );
    }

    _error? : any

    get error(){
        if( this._error === void 0 ){
            this._error = this.record.deepValidationError( this.path ) || null;
        }

        return this._error;
    }

    set error( x ){
        this._error = x;
    }

    get _changeToken(){
        return this.record._changeToken;
    }

    set( x ){
        this.record.deepSet( this.path, x, this.options );
    }
}

function getLinksCache( record : Record ) : LinksCache {
    return ( <any>record )._links || ( ( <any>record )._links = new record.Attributes( {} ) );
}

function cacheLink( links : LinksCache, record : Record, key : string ) : RecordLink {
    var cached = links[ key ],
        value = record[ key ];

    return cached && cached.value === value ? cached
                : links[ key ] = new RecordLink( record, key, value );
}

/***********************************
 * Collection
 */
Record.Collection.mixins({
    // Boolean link to the record's presence in the collection
    linkContains( record : Record ){
        return new CollectionLink( this, record );
    },

    // Link to collection's property
    linkAt( prop : string ){
        return Link.value( this[ prop ], x => this[ prop ] = x );
    }
});

/**
 * Boolean link to presence of NestedType's record in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 */
class CollectionLink extends Link< boolean >{
    constructor( public collection, public record ){
        super( Boolean( collection._byId[ record.cid ] ) );
    }

    set( x ){
        this.collection.toggle( this.record, x );
    }
}