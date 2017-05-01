/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Mixable, Record } from 'type-r';
import { Link } from './valuelink/link';
export default Link;
Mixable.mixTo(Link);
/**
 * Record
 */
Record.mixins({
    // Link to the record's attribute by its key.
    linkAt: function (key) {
        return cacheLink(getLinksCache(this), this, key);
    },
    // Link to the attribute of the record's tree by symbolic path.
    linkPath: function (path, options) {
        return new RecordDeepLink(this, path, options);
    },
    // Link all (or listed) attributes and return links cache.
    linkAll: function () {
        var links = getLinksCache(this);
        if (arguments.length) {
            for (var i = 0; i < arguments.length; i++) {
                cacheLink(links, this, arguments[i]);
            }
        }
        else {
            var attributes = this.attributes;
            for (var key in attributes) {
                attributes[key] === void 0 || cacheLink(links, this, key);
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
var RecordLink = (function (_super) {
    __extends(RecordLink, _super);
    function RecordLink(record, attr, value) {
        var _this = _super.call(this, value) || this;
        _this.record = record;
        _this.attr = attr;
        return _this;
    }
    RecordLink.prototype.set = function (x) {
        this.record[this.attr] = x;
    };
    Object.defineProperty(RecordLink.prototype, "error", {
        get: function () {
            return this._error === void 0 ?
                this.record.getValidationError(this.attr) :
                this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    return RecordLink;
}(Link));
var RecordDeepLink = (function (_super) {
    __extends(RecordDeepLink, _super);
    function RecordDeepLink(record, path, options) {
        var _this = _super.call(this, record.deepGet(path)) || this;
        _this.record = record;
        _this.path = path;
        _this.options = options;
        return _this;
    }
    Object.defineProperty(RecordDeepLink.prototype, "error", {
        get: function () {
            if (this._error === void 0) {
                this._error = this.record.deepValidationError(this.path) || null;
            }
            return this._error;
        },
        set: function (x) {
            this._error = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordDeepLink.prototype, "_changeToken", {
        get: function () {
            return this.record._changeToken;
        },
        enumerable: true,
        configurable: true
    });
    RecordDeepLink.prototype.set = function (x) {
        this.record.deepSet(this.path, x, this.options);
    };
    return RecordDeepLink;
}(Link));
function getLinksCache(record) {
    return record._links || (record._links = new record.Attributes({}));
}
function cacheLink(links, record, key) {
    var cached = links[key], value = record[key];
    return cached && cached.value === value ? cached
        : links[key] = new RecordLink(record, key, value);
}
/***********************************
 * Collection
 */
Record.Collection.mixins({
    // Boolean link to the record's presence in the collection
    linkContains: function (record) {
        return new CollectionLink(this, record);
    },
    // Link to collection's property
    linkAt: function (prop) {
        var _this = this;
        return Link.value(this[prop], function (x) { return _this[prop] = x; });
    }
});
/**
 * Boolean link to presence of NestedType's record in collection.
 * Strict evaluation of value, no error.
 * Safe implementation of _changeToken.
 */
var CollectionLink = (function (_super) {
    __extends(CollectionLink, _super);
    function CollectionLink(collection, record) {
        var _this = _super.call(this, Boolean(collection._byId[record.cid])) || this;
        _this.collection = collection;
        _this.record = record;
        return _this;
    }
    CollectionLink.prototype.set = function (x) {
        this.collection.toggle(this.record, x);
    };
    return CollectionLink;
}(Link));
//# sourceMappingURL=link.js.map