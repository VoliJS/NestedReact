# Data binding examples

Here are the set of examples for typical `nestedreact` data binding use cases.

Each section contains custom data-bound component, model definitions, and usage examples.

Somewhere at the top level component(s) there must be the declaration linking model updates to UI. Either models must be (nested) members of some component's state (which will update UI even in case of deep changes), or you may link component updates to changes of models and collections passed in props. In the last case, you will need to add following line to top or middle-level component definition:

```
    listenToProps : 'myModel myCollection'
```

It's generally advised to keep stateful components at the top level, and use `listenToProps` in the middle level for optimization purposes if you want local updates. Keep you bottom-level components pure, and try to do the same for the most of your middle level (`listenToProps` used wisely won't hurt). For further information on this topic consult the top-level guide.

## Link transformations

Attribute's link can be further transformed using extended link API. Link transformations allowing you to use new `stateless functions` component definition style introduced in React 0.14 in most cases.

For links with any value type:

- `link.equals( x )` creates boolean link which is true whenever link value is equal to x. Useful for radio groups.
- `link.update( x => !x )` creates function transforming link value (toggling boolean value in this case). Useful for `onClick` event handlers.

For link enclosing array:

- `arrLink.contains( x )` creates boolean link which is true whenever x is contained in an array in link value. Useful for checkboxes. Avoid long arrays, currently operations has O(N^2) complexity.




## Checkboxes

Standard `<input/>` will work. Custom Checkbox component might be implemented like this:

```javascript
const Checkbox = ({ className = 'checkbox', checkedLink }) => (
    <div className={ className + ( checkedLink.value ? ' selected' : '' ) }
         onClick = { checkedLink.update( x => !x ) }
    />
);
```

Examples will assume working with custom Checkbox.

### Binding to boolean model attributes

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        option1 : true,
        option2 : false
    });
    
const CheckboxGroup = ({ model /* instanceof MyModel */ }) => (
    <div>
        <div>
            <Checkbox checkedLink={ model.getLink( 'option1' ) } />
            Option 1
        </div>
        <div>
            <Checkbox checkedLink={ model.getLink( 'option2' ) } />
            Option 2
        </div>
    </div>
);
```

### Binding to array of selected options

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        options : [ 'option1' ]
    });
    
const CheckboxGroup = ({ model /* instanceof MyModel */ }) => {
    const link = model.getLink( 'options' );
    
    return (
        <div>
            <div>
                <Checkbox checkedLink={ link.contains( 'option1' ) } />
                Option 1
            </div>
            <div>
                <Checkbox checkedLink={ link.contains( 'option2' ) } />
                Option 2
            </div>
        </div>
    );
};
```

### Binding to collection of selected models

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        all : Some.Collection,
        selected : Collection.subsetOf( 'all' )
    });
    
const CheckboxGroup = ({ model /* instanceof MyModel */ }) => {
    const { all, selected } = model;
    
    return (
        <div>
            { all.map( model => (
                <div>
                    <Checkbox checkedLink={ selected.getLink( model ) } />
                    { model.displayName }
                </div>
            ))}
        </div>
    );
};
```

## Radio Groups

For the radio groups you will need custom Radio component. It's very similar to custom Checkbox one,
with one difference in click handler:

```javascript
const Radio = ({ className = 'radio', checkedLink }) => (
    <div className={ className + ( checkedLink.value ? ' selected' : '' ) }
         onClick = { checkedLink.update( () => true ) }
    />
);
```

In this example, we bind radio to string values. It's not required for them to be strings.

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        option : 'option1'
    });
    
const RadioGroup = ({ model /* instanceof MyModel */ }) => {
    const link = model.getLink( 'option' );
    
    return (
        <div>
            <div>
                <Radio checkedLink={ link.equals( 'option1' ) } />
                Option 1
            </div>
            <div>
                <Radio checkedLink={ link.equals( 'option2' ) } />
                Option 2
            </div>
        </div>
    );
};
```

## Input fields

Standard `<input>` will work. You may implement custom input controls to handle complex scenarios
with validation and appearance.

```javascript
const Input = ({ valueLink, className, ...props }) => (
    <div className='wrapping'
        <input className={ className + ( valieLink.error ? ' error' : '' ) } {...props} value={ valueLink.value } onChange={ e => valueLink.set( e.target.value ) }/>
    </div>
);
```

Errors are attached to the links automatically, when model validation is failed. Validation checks can be attached to model attributes with `.has.check` specification. `x : Number.has.check( x => x > 0 )`, `y : Number.has.check( x => x < 0, 'y should be negative' )`. 

### Binding to model attributes

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        number : 0,
        string : ''
    });
    
const InputGroup = ({ model /* instanceof MyModel */ }) => (
        <div>
            <label>
                Number: 
                <input type='number' valueLink={ model.getLink( 'number' ) } />
            </label>
            <label>
                String: 
                <input valueLink={ model.getLink( 'string' ) } />
            </label>
        </div>
    );
};
```

### Binding to an array of strings

The same technique may be used to bind to an array or hash of strings. First, take a link to this
attribute. Next, use `link.map` method to iterate through elements links created for you.

`link.map` will internally execute `link.at( key )` method to create a link to the plain object or array element.
These methods may be used manually to create binding for the structures of any particular depth and complexity.

However, for the JS data with known structure it's recommended to wrap them in models.

```javascript
import { Model } from 'nestedtypes'

const MyModel = Model
    .defaults({
        strings : [ 'first', 'second' ]
    });
    
const InputGroup = ({ model /* instanceof MyModel */ }) => (
        <div>
            { model.getLink( 'strings' ).map( strLink => (
                <div>
                    <input type='number' valueLink={ strLink } />
                </div>
            )) }
        </div>
    );
};
```
