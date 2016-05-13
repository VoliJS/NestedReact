## Performance optimizations

### Pure Render

### Transactional data updates

### Local UI updates

## Old

## Props specs and pure render optimization

One of the problems of unidirectional data flow is that large part of UI is being
 updated for every small change. Though React does its job avoiding unnecessary DOM manipulations,
 it's still takes a lot of computation resources to compare new and old UI components trees. 
`Pure render` optimization strategy avoids rendering and comparison of subtrees which has not been changed
by adding special `props` comparison function (`shouldComponentUpdate`). This optimization 
is most effective on the top level close to the state holder component. 

NestedReact support this optimization, comparing props model's and collection version tokens to ones used during the last render,
and comparing other props values for strict equality.  

To enable this optimization for the particular component, you need to:

 - Declare all props that will be tracked for changes in `props` (or `propTypes`) spec.
    Which is the good practice by itself, so you encouraged to do it unless you're using 
    stateless function components syntax, which is preferable.
 - Add `pureRender : true` to component definition.

As from previous example:

```javscript
var Bottom = React.createClass({
    props : {
        model : Counter    
    },

    pureRender : true,
    
    render(){
        const { model } = this.props;
        return (
            <div onClick={ () => model.count += 1 }>
                { model.count }
            </div>
        );
    )
});
```

NestedReact `props` spec uses the simple subset of `state` spec, and acts as substitution for `propTypes` (in fact,
 it internally compiles itself to the `propTypes` and `getDefaultProps()`). 

Following type annotations are allowed for `props`:

1. Constructor functions: `prop1 : String`
2. Constructors with default value: `prop2 : String.value( "default string" )`
3. JSON and primitive values: `prop3 : "default string"`
4. Special PropTypes cases:
    - `PropTypes.any` -> `undefined` (no default value) or `null` (with `null` default value)
    - `PropTypes.node` -> `React.Node`
    - `PropTypes.element` -> `React.Element` 
 
If prop has explicitly declared default value, as in (2) or (3), it will be added to `getDefaultProps`.  

## Partial component subtree updates

For the number of reasons, you may need some parts of components subtrees to listen for props updates independently.
It might be required if model or collection props are not the part of any upper component state.
This situation frequently happens during transition period when you're in the middle of refactoring large 
backbone application.

To make `<Bottom />` component listen to and update on its `model` prop change, it's enough to add
`listenToProps` option to component spec. It will play well with `pureRender`, effectively 
avoiding unnecessary renders if top level component will trigger update on the same change too.

```javscript
var Bottom = React.createClass({
    props : {
        model : Counter    
    },
    
    listenToProps : 'model', // space separated list of prop names
    
    // ...all other stays the same...
});
```
