## reference to existing store

```javascript
static store = storeInstance;
```

- Make this store the default store for the current component and to the whole components subtree.
- Chained store lookup.
- Listen to the 'change' event and render.

## entirely local store

```javascript
static store = StoreClass;
```

- componentWillMount: create the store, fetch if possible.
- componentWillUnmount: dispose the store.
