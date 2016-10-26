*"Complex state"* is the state composed of nested parts (typically
other models and collections). It's done with mentioning type
constructors in model or state attribute declaration instead of the default value.

Such a members called *aggregated members*. When the model is...
 
- ...created with `new`, aggregated members are created too.
- ...cloned with `model.clone()`, aggregated members are cloned.
- ...disposed with `model.dispose()`, aggregated members are disposed.

And when nested models and collections are *modified*, root model holding
React component state detects the change, and force its component to update.
In conjunction, these features allows you to describe fairly complex
components using just component state.

## Example: unidirectional data flow with complex state

Here we're demonstrating the main pattern which is used to structure
applications with `NestedReact`. Top-level "dirty" component holding the complex
mutable state, passing its parts down to "pure" children components with props.

In order to define models which are parts of the React state, you
will need to import `Model` base class from `nestedtypes`.

```javascript
import { Model, define } from 'nestedtypes'
import React from 'nestedreact'
```

It doesn't matter where `@define` decorator comes from, it's the same.
Now lets define some simple model.

```javascript
@define
class Counter extends Nested.Model {
    static attributes = {
        count : 0
    }
}
```

Then, use it to define more complex structure.
Model collection can be referenced as `Model.Collection`, and mostly
conforms to [BackboneJS collection API](http://backbonejs.org/#Collection).
They can be created directly with `new` or used as attribute type.

```javascript
@define
class ComplexState extends Nested.Model {
    static attributes = {
        created  : Date,
        counter  : Counter,
        counters : Counter.Collection 
    }
}
```

And now, let's define some root component managing the complex UI state.

```javascript
@define
class View extends React.Component {
    static state = { // <- define the model describing UI state
        dummy : ComplexState 
    }
    
    render(){
        return (
            <div>
                { this.state.dummy.counters.map( counter => (
                    <CounterItem key={ counter.cid } model={ counter } />                            
                ) ) }
            </div>
        );
    }
}
```

And finally, we can make pure component for the counter, receiving 
the nested model in props. It will handle the click,
and increment the counter. Which will be noticed by the root component
because this counter is the part of its complex state, thus it will trigger
UI update.

```javascript
const CounterItem = ({ model }) => (
    <div onClick={ () => model.counter++ }>
        { model.counter }    
    </div>
);
```

> Conceptually, this is the most common pattern of structuring an application
> in the majority of the functional languages which are used for production in the wild. 
> Those like OCaml (and F#), or Erlang (and Elixir). 
