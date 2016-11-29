Simple form of the type annotation for the nested model/collection
 assumes that the attribute is *aggregated*. Which means,
 it an integral part of model, so when the model is...

- ...created with `new`, aggregated members are created too.
- ...cloned with `model.clone()`, aggregated members are cloned.
- ...disposed with `model.dispose()`, aggregated members are disposed.

Aggregation (and its strong form - composition) implies that there
 are one and only one "owner" for the aggregated object.

That's, however, is not the thing what we always want.

## Example: stateful select list

We want to create the component which would display the list of items
and allow us to select one of them. For the purpose of the example,
it would be completely *stateful* and self-dependent component.

How its state would look like? Obviously, it should hold the collection.
And the selected element. The code would look like this, and it would be
 almost correct.

```javascript
import React, { define } from 'nestedreact'
import Item from './item'

class SelectList extends React.Component {
    static state = {
        items : Item.Collection,
        selected : Item
    }

    componentWillMount(){
        /* some IO returning the promise to load the state... Not really important.*/
            .done( json => this.state.set( json, { parse : true } );
    }

    render(){
        const { state } = this;
        return (
            <div>
                { state.items.map( item => (
                    <div key={ item.cid }
                         className={ item === state.selected ? 'selected' : '' }
                         onClick={ () => state.selected = item }
                     >                                    
                        { item.name }                    
                    </div>
                    )
                ) }
            </div>
        );
    }
}
```

There are few problems, though.

First, we don't want `state.selected` to create any model. Nothing is selected
  by default (so it should be `null`).

Second, `state.selected` holds the members of the `state.items` collection. Thus,
they have an owner already. And in that exotic case if we will need to clone our state,
`selected` should not be cloned. Rather copied by reference. And if we will try to
dispose `selected`, it will be disposed twice.

Clearly, `selected` attribute holds *shared*, not an aggregated model.
Which we can indicate adding `.shared` modifier right after its constructor type.
Indicating that the value of an attribute is not really belong here,
but is borrowed from some other place.

```javascript
    static state = {
        items : Item.Collection,
        selected : Item.shared // null by default, don't take ownership
    }
```

So, what exactly `.shared` means?  

Considering that the aggregation forms model/collection tree which
elements have the single owner. `shared` attribute can hold models and
collections taken from *other* ownership trees.

Speaking simply, if aggregated attribute behaves as if it's included *by value*,
shared attribute is included *"by reference"*:

- it's null by default.
- when the model is cloned, it's not cloned.
- when the model is disposed, it keeps living.

### Example: select from the global list

For the purpose of the example, imagine that we have the global
collection of some items which we would like to reference in some
component. It can be the select list of some globally available list of
options. And we want to update the UI in case if this list is changed.

Many people would argue that global `items` list shouldn't be the part
of the local component state.

Good news that in this example attribute type for
 the `state.items` is inferred as `Item.Collection.shared`. So, it
  not an aggregation, and doesn't behave as an integral part of `state`.

Doing so, though, is the convenient way to ensure that component
 will be automatically updated in case if `items` will change. The
 rest of UI shouldn't. Should it?

```javascript
import React, { define } from 'nestedreact'
import { items } from './globals'

@define
class SelectList extends React.Component {
    static props = {
        selectedLink : React.Link // <- its value link holding the selected model
    }

    static state = {
        items : items // <- our global list of items
    }

    componentWillMount(){
        // some IO returning the promise to load the state... Not really important.
            .done( json => this.state.set( json, { parse : true } );
    }

    render(){
        const { state, props } = this;
        return (
            <div>
                { state.items.map( item => (
                    <div key={ item.cid }
                         className={ item === state.selected ? 'selected' : '' }
                         onClick={ props.selectedLink.action( () => item ) }
                     >                                    
                        { item.name }                    
                    </div>
                    )
                ) }
            </div>
        );
    }
}
```
