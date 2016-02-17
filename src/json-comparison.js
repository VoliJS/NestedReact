// equality checking for deep JSON comparison of plain Array and Object
var ArrayProto = Array.prototype,
    ObjectProto = Object.prototype;

exports.jsonNotEqual = jsonNotEqual;
function jsonNotEqual( objA, objB) {
    if (objA === objB) {
        return false;
    }

    if (typeof objA !== 'object' || !objA ||
        typeof objB !== 'object' || !objB ) {
        return true;
    }

    var protoA = Object.getPrototypeOf( objA ),
        protoB = Object.getPrototypeOf( objB );

    if( protoA !== protoB ) return true;

    if( protoA === ArrayProto ) return arraysNotEqual( objA, objB );
    if( protoA === ObjectProto ) return objectsNotEqual( objA, objB );

    return true;
}

function objectsNotEqual( objA, objB ){
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return true;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    for (var i = 0; i < keysA.length; i++) {
        var key = keysA[i];
        if ( !bHasOwnProperty( key ) || jsonNotEqual( objA[ key ], objB[ key ] )) {
            return true;
        }
    }

    return false;
}

function arraysNotEqual( a, b ){
    if( a.length !== b.length ) return true;

    for( var i = 0; i < a.length; i++ ){
        if( jsonNotEqual( a[ i ], b[ i ] ) ) return true;
    }

    return false;
}
