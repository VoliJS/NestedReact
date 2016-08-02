# State management 101

NestedReact uses mutable models observing deep changes to manage UI state. 

### Simple state management

```jsx
import React from 'nestedreact'

export const MyComponent = React.createClass({
	state : {
		count : 0
	},

	render(){
	    const { state } = this;
		
		return (
			<div onClick={ () => state.count++ }>
				{ state.count }
			</div>
		);
	}
});
```

##### `declaration` state : { [ key ] : value }

##### `assignment` this.state.key = value;

##### `method` this.state.transaction( body : () => void )

##### `method` this.state.set({ [ key ] : value })

#####  `method` state.getLink( key ) : Link

#####  `method` state.linkAll( key1, key2, ... ) : { [ key ] : Link }

### Two-way data binding

## Old
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
attribute's spec taken from `state` declaration (refer to [NestedTypes documentation](http://volicon.github.io/NestedTypes/#attribute-types) for complete
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

### Data binding 

Some lower-level components like custom `<input />` controls does not need models 
and collections, rather single value. Also, there might be very different ways how particular
model attribute is bound to UI control. [React Link](https://facebook.github.io/react/docs/two-way-binding-helpers.html)
is the perfect abstraction to isolate data binding details from the UI control logic. 

`NestedReact` supports data binding links which are backward compatible with standard React's Link.

You can create link for any property of the state, as well as for any model.

`const link = object.getLink( 'attr' )`
`const link = object.deepLink( 'path.to.the.attribute' )`

Or, you can create boolean link, toggling model in collection. `true` if model is contained in collection, assignments will add/remove given model. Useful for checkboxes.
`const link = collection.hasLink( model )` 

Links can be created directly using Link constructor, which allows you to handle any custom binding scenario:

```javascript
var Nested = require( 'nestedtypes' );

var link = new Nested.Link( value,  x => /* update */ } ); 
```

Below is the brief reference for links API. Consult [Guide to Data Binding Use Cases](/docs/databinding.md) to understand how to use it.

## Value access methods

In addition to standard members `link.requestChange( x )` and `link.value`, there are pair of shortcuts available:

- `link.set( x )`, which is a shortcut for `this.requestChange( x )`
- `link.toggle()` is a shortcut for `link.requestChange( !link.value )`