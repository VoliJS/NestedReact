# NestedReact

React application architecture with [classical OO models]() in the data layer.

Brief feature list:

- First-class support for mutable models and collections in props, state, and context.
    - Unidirectional data flow and safe *pure render optimization*.
    - Two-way data binding ([Guide to Data Binding Use Cases](/example/databinding.md))
    - Optional local component subtree updates.     
- Lightweight type annotations for props, *state*, and context as a replacement for `PropTypes`.
- Gradual transition procedure for backbone applications ([Backbone Migration Guide]()):
    - Complete interoperation with existing Backbone Views allowing you to reuse existing code and avoid upfront application rewrite.
    - Any type of application refactoring strategy is possible - top-to-bottom, bottom-to-top, and random parts at the middle.  
    - Support for Backbone events and jQuery accessors in React components simplifies View refactoring. 

Compare solution size and complexity to any of `flux` implementation on [TodoMVC example]().

# Installation
It's packed as single UMD, thus grab the module or use `npm` to install.
	`npm install --save nestedreact`

It has [NestedTypes model framework]() and [React]() as strong dependencies.

Module extends React namespace (without modifying original React), and its
safe to use it as a replacement for `react`.
    `import React from 'nestedreact'`
    
If you're migrating from backbone-based frameworks such as `ChaplinJS` or `Marionette`,
you need to do following things to make convergence layer work properly:
- Make sure that frameworks includes `nestedtypes` instead of `backbone`.
- On application start, tell `nestedreact` to use proper base class for the View.
	`React.useView( Chaplin.View )`

# Basics 
## Managing component's state

In the simplest case, it looks like this:

```javscript
import React from 'nestedreact'

export const MyComponent = React.createClass({
	state : {
		count : 0 // Number attribute with 0 as default value.
	},

	render(){
		return (
			<div onClick={ this.onClick }>
				{ this.state.count }
			</div>
		);
	},

	onClick(){
	    // state change will be detected and component will be updated
		this.state.count = this.state.count + 1;
	}
});
```

Behind the scene, `state` is managed with `NestedTypes` model which is implicitly created using
attribute's spec taken from `state` declaration (refer to [NestedTypes documentation]() for complete
attribute spec syntax). It has following implications:

- You can use primitive type values or constructor functions as attribute's type specs.
- Plain objects and arrays used as defaults will be properly deep copied.
- All state members *must* be declared in `state`.
- State attributes behaves as regular object attributes, which can be directly accessed and assigned.
- State attributes can hold deeply nested models and collections; deep changes will be automatically detected and will cause component update.

In addition, 
- `state` property from mixins will be properly merged. So, mixins can have state too.
- You can specify the base class for state model using `Model` component's property.
- Entire model's state can be externally defined as `NestedTypes` Model, and attached to component by referencing it in `Model` property.
- `state` supports everything what regular models can do, e.g. it can have custom methods,
    be transactionally changed, serialized, saved, fetched, etc.  

Usage of `getInitialState()` and `setState()` is not allowed when you're using `state` declaration.

## Passing models and collections as components props

It's quite common practice to describe complex application's page state in top-level component, and
 pass the parts of the state down as props. In this case, any changes to nested models
  and collections will be detected by top-level component and will cause update of the whole subtree.
  Resulting in so-called _unidirectional data flow_.

```javascript
// data layer
const Counter = Model.extend({
    attributes : {
        count : 0
    }
});

// Application or application's page
const Top = React.createClass({
    // all changes made to the parts of the state will cause component update
    state : {
        model1 : Counter,
        model2 : Counter
    },
    
    render(){
        // pass down elements of the state...
        return (
            <div>
                <Bottom model={ this.state.model1 } />
                <Bottom model={ this.state.model2 } />
            </div>
        );
    }
});

// Pure component. Click will trigger update of the Top component.
const Bottom = ({ model }) => (
    <div onClick={ () => model.count += 1 }>
        { model.count }
    </div>
);
```

Also, this example demonstrates the point which really differentiate our approach to 
application state management. Here the simple fact comes into play - `NestedTypes` models 
can declaratively describe very complex state, and detect deeply nested changes.
So, you have unidirectional data flow for no effort.  

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

# Two-way data binding

Some lower-level components like custom `<input />` controls does not need models 
and collections, rather single value. Also, there might be very different ways how particular
model attribute is bound to UI control. [React Link](https://facebook.github.io/react/docs/two-way-binding-helpers.html)
is the perfect abstraction to isolate data binding details from the particular bound UI control. 

`NestedReact` supports data binding links which are backward compatible with standard React's Link.

You can create link for any property of the state, as well as for any model.

`const link = object.getLink( 'attr' )`

Or, you can create boolean link, toggling model in collection. `true` if model is contained in collection, assignments will add/remove given model. Useful for checkboxes.
`const link = collection.hasLink( model )` 

Links can be created directly using Link constructor, which allows you to handle any custom binding scenario:

```javascript
var Nested = require( 'nestedtypes' );

var link = new Nested.Link( value, function( x ){ /* update */ } ); 
```

Below is the brief reference for links API. Consult [Guide to Data Binding Use Cases](/example/databinding.md) to understand how to use it.

## Value access methods

In addition to standard members `link.requestChange( x )` and `link.value`, there are pair of shortcuts available:

- `link.set( x )`, which is a shortcut for `this.requestChange( x )`
- `link.toggle()` is a shortcut for `link.requestChange( !link.value )`

## Link transformations

Attribute's link can be further transformed using extended link API. Link transformations allowing you to use new `stateless functions` component definition style introduced in React 0.14 in most cases.

For links with any value type:

- `link.equals( x )` creates boolean link which is true whenever link value is equal to x. Useful for radio groups.
- `link.update( x => !x )` creates function transforming link value (toggling boolean value in this case). Useful for `onClick` event handlers.

For link enclosing array:

- `arrLink.contains( x )` creates boolean link which is true whenever x is contained in an array in link value. Useful for checkboxes. Avoid long arrays, currently operations has O(N^2) complexity.

For link enclosings arrays and plain JS objects:
- `arrOrObjLink.at( key )` creates link to array of object member with a given key. Can be applied multiple times to work with object hierarchies; on modifications, objects will be updated in purely functional way (modified parts will be shallow copied). Useful when working with plain JS objects in model attributes - updating them through links make changes visible to the model.
- `arrOrObjLink.map( ( itemLink, key ) => <input key={ key } valieLink={ itemLink } /> )` iterates through object or array, wrapping its elements to links. Useful for JSX transofrmation.

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

## Links and components state

Link received through component props can be mapped as state member using the following declaration:
```javascript
state : {
   selected : Nested.link( '^props.selectedLink' )
}   
```
It can be accessed as a part of state, however, in this case it's not true state. All read/write operations will be done with link itself, and local state won't be modified. 

Also, links can be used to declaratively expose real component state to upper conponents. In this example, link optionally received in props will be updated every time `this.state.selected` object is replaced. In this case, updates are one way, from bottom component to upper one, and stateful component will render itself when state is changed.

```javascript
state : {
   selected : Item.has.watcher( '^props.selectedLink.val' )
}   
```

Technically, "watcher" - is just a callback function with a single argument receiving new attribute value, so links are not required here.
