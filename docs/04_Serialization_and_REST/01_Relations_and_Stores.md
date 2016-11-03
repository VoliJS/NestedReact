PROPOSAL

As we move to the local store architecture,
the typical app structure looks like this:

- There's the global default store, which is available across the pages.
- There are local stores which lifecycle is tied to the root page components.

There are two general approaches to handle this situation:

- Dedicated component to handle store (which is then exposed through the context).
- Facilities to handle store inside of the stateful component.

```javascript
@define
@mixins( React.mixins.LocalStorageState )
class MyPage extends React.RestStoreComponent {
    static store = {
        /* store definition */
    }
    
    static state = { // references to the defined store.
    
    }
    
    render(){ // Fetches the data, delays the render. Wrap it in define.
        this.store.xxx
    }
}
```


## Option A. Support for declaring stores inside of the components.

Make the specified store the default one for all state elements in the subtree.

Not clear, if its really needed at all (for the subtree). Should be really the rare case.

Might be helpful for the local state, though, and for the local change events subscription.

```javascript
@define
class AppPage extends React.Component {
    static defaultStore = externalStoreInstance
}
```

Create local store with a lifecycle bound to the component.

```javascript
@define
class MyStore extends RestStore {
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }    
}

@define
class AppPage extends React.Component {
    // Not clear if it's any better than the plain model.
    // Might be the matter of convinience to separate it from the local state.
    static store = MyStore
    
    componentWillMount(){
        // This thingy should be useful. Need to take the sequence of promises.
        this.wait( this.store.fetch() );
    }
}
```

If we don't propagate it in the context, there almost no difference
with state.

## Option B. Minimal changes.

- Just use custom RestStore as the local state
- Introduce `wait()` method.
- `defaultStore` spec?
-  singleton listener spec

```javascript
@define
class MyStore extends RestStore {
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }    
}

@define
class AppPage extends React.Component {
    // Not clear if it's any better than the plain model.
    // Might be the matter of convinience to separate it from the local state.
    static Model = MyStore
    
    componentWillMount(){
        // This thingy should be useful. Need to take the sequence of promises.
        this.renderAfter( this.store.fetch() );
    }
}
```

## Option C. Dedicated component

The good thing is that we can wrap all IO related stuff there.
 
Problem is that you cannot access the stuff there.

```javascript
@define
class MyStore extends RestStore {
    static attributes = {
        users : User.Collection,
        roles : Role.Collection
    }    
}

@define
class AppPage extends React.Component {
    render(){
        // Create and fetch the thingy, delay rendering. 
        <Store type={ MyStore }>
        
        </Store>
    }
}
```

## Option B': Rely on hxr to hide content.

If `hasPendingIO()` returns true, don't render.
  
update on 'request' and 'sync' events.

or

force change event at the begin and at the end of the transaction.
Better, because of renders deduplication. Much more complex.

or

modify _xhr exactly _before_ 'request', 'sync', and 'error', but after all changes
 are applied.

```javascript
<Loading wait={ this.state } render={ this.method }>

</Loading>
```
 
 