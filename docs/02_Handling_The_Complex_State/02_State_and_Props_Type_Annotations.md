In NestedTypes, model does not behave like key-value hash but rather 
like a record or class from statically typed languages like Java or C++.
All model attributes have to be declared and they are *typed*.

Full form of attribute type annotation is this:

`attrName : Constructor.value( defaultValue )`

With this spec, attribute will be initialized like this:

`model.attrName = new Constructor( defaultValue )`

Two shorter forms of the type spec are:

1. `attrName : defaultValue`. Attribute type will be inferred from the default value. 
2. `attrName : Constructor`. Every function here is assumed to be constructor.

> For an attribute of type `Function` you have to use full form of the spec:
>    
> `attrName : Function.value( x => x )`
> 
> Type inference can be turned off completely with `Nested.value( ... )` spec:
>
> `attrName : Nested.value( x => x )`

### Dynamic Type Safety

NestedTypes uses information about types in the variety of different ways.
Although it doesn't check types at compile time, it *guarantees that
attributes will always have values of declared types* because they are guarded
  with run-time type assertions and automatic type casts.

Type casts are performed slightly differently for different types, but 
semantically they follow the simple rule: value of incompatible type is being
passed as an argument to the attribute's type constructor.

`m.attr = new Constructor( incompatibleValue );`
  
```javascript
@define
class Sample extends Nested.Model {
    static attributes = {
        time : Date,
        num : 0, // same as Number or Number.value( 0 )
        str : '', // same as String or String.value( '' )
        bool : false, // same as Boolean or Boolean.value( false )
        any : null // same as Nested.value( null ). Untyped attribute. 
    }
}

const s = new Sample();

s.time = 32787878; // = new Date( 32787878 )
s.num = "676743"; // = 676743
s.num = "hjkghjgfdsj"; // = NaN
s.str = 123; // = "123"
s.bool = s.num && s.str; // = Boolean( s.num && s.str )
s.any = holdsAnothing; // no type convertions.
```

Even if you omit explicit type annotation, attribute is still typed 
(and guarded) according to the type of the default value.
 
To turn type inference off in attribute declaration, either specify `null`
or `void 0` as default value, or use `Nested.value( defaultValue )` as type spec.

### Props and Context Type Annotations

Same style type annotations may be used for the `props` as
a replacement for `propTypes` and `getDefaultProps()`. 
As they are just compiled to `propTypes` and `getDefaultProps()`, they works a bit differently from the state attributes annotations:

- No automatic type conversion. Just standard `propTypes` type asserts. 
- Default value is created only when it is provided explicitly.

It works in the same way for the `context` and `childContext` as a replacement for React's
`contextTypes` and `childContextTypes` respectively. But default values are ignored. 

```javascript
@define
class MyComponent extends React.Component {
    static props = {
        callback : Function.value( () => void 0 ),
        optionalProp : String, // no default value
        propWithDefaultValue : ''
    }
       
    render(){ /*...*/ }
}
```
