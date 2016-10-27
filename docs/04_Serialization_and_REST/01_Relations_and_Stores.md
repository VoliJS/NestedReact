PROPOSAL

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