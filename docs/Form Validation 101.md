### Forms validation

#### Ad-hoc validation in render

#### Validation in models

## Link validation

Links carry additional `validationError` field for validation purposes (to be used inside of custom UI controls). It's populated automatically for links created from models and collection,
utilizing `nestedtypes` validation mechanics. Therefore, if model attribute has any `check` attached, its link will carry its `validationError` object.
   
```javascript
var M = Nested.Model.extend({
    defaults : {
        attr : Number.has.check( x => x > 0, 'attr should be positive' )    
    }
});

...

var m = new M({ attr : -1 });
var attrLink = m.getLink( 'attr' );

console.assert( m.value === -1 );
console.assert( m.validationError === 'attr should be positive' );
```

It's possible to use ad-hoc validation in component's `render` method with `link.check` method.

```javascript
var link = model.getLink( 'something' )
                .check( x => x > 0, 'Shoulld be positive' )
                .check( x => x < 10, 'Shoulld be lesser than 10' );
```

Failed checks will populate link's `validationError` with first failed check's message. 