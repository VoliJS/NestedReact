NestedTypes (and NestedReact) gives you precise control over
 the way how state is being changed, allowing you to watch attributes
  for changes and attach some reactions to it. This (and variety of 
  other things) can be done with the help of `has` type annotation.

In this example, we have `local` state member, which is a string. On every
 change it will call the *watcher* function, which is taken from the props.
 
```javascript
@define
class MyComponent extends React.Component {
    static props = {
        callback : Function.value( x => void 0 )    
    }
    
    static state = {
        local : String.has.watcher( '^props.callback' )    
    }
    
    render(){ /*...*/ }
}
```

`.has.watcher( path | function )` annotation either takes "watcher" function
as an argument, or the string *path* to the watcher function taken relative to the current
 model's `this`. `^` in the path is the shorthand for the `getOwner()` call, which in our case returns
 React component itself. So, `^props.callback` is being translated to this:
  
`this.getOwner().props.callback`.

## How watchers works

NestedTypes is mostly backward compatible with BackboneJS in term of [events 
emitted by models and collections](http://backbonejs.org/#Events-catalog). 
The difference is that mechanics of change events and updates is generalized
 on the case of nested models and collections.
 
### How model tree handles an update

All updates are executed in the scope of transactions, and transaction
have three stages.

At the first stage, update is applied and attributes receive the new values.

At the second stage, `change:attrName` event is being triggered for every 
changed attribute. Any additional changes to the current models and its
 attributes which made as a reaction to these events are executed in the scope of
 the same transaction and will trigger additional `change:attr` events.
  
At the third stage, model triggers `change` event, and when `change` event
processing sequence is done, it closes the transaction and notifies upper 
level model, collection, or React component (if any) of change.

Therefore, change events handlers are synchronous, but *they are executed as wave
  from bottom to the top*. And updates made from inside of the handlers
  won't result in additional change events at the upper levels.

*Attribute watcher* behaves mostly similar to `change:attrName` event handler,
with the following differences:
 
- Relative symbolic references (paths) to event handlers are allowed,
    and handler is called with the right context according to the path.
- Event handler receives the new attribute value as first argument.
- Event handler can be missing, it's fine.

For the case of the collection, the transactions mechanic is the same, with
a difference that individual model's `add`, `remove`, and `change` events are
 emitted during the phase 2 instead of `change:attrName`, and `changes` event
 is triggered at the stage 3 instead of `change`. 

### Explicit transactions control

Every model attribute assignment or collection modification create implicit 
transaction which triggers the wave of change events from the bottom to the top.

You can group the series of modifications to the single transaction
explicitly with `transaction()` method.

```javascript
my.model.transaction( model => {
    model.a = 1;
    model.and.nested.attr = 2;
    model.itemsCollection.add( { id: 1, name : 'Hi' } );
});
```

This code executed synchronously and results in the single `change`
 event triggered by `my.model` *only in case* there have been any real
  changes made, i.e. `model.a` wasn't already equal to 1 and so on.
  
This technique works for both models and collections, can improve performance,
and reduce overall amount of renders. Additionally, collection has
transactional version of `each()` method (`collection.updateEach()`)
which iterates through the collection in the scope of transaction.

There are other methods of model and collection which are transactional:
- `model.set( { a : 1, b : 2, ... } )`
- `collection.set( ... )`, `collection.add( ... )`, `collection.remove( ... )`

