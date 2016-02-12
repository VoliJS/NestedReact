# NestedReact
This is React add-on providing advanced state management to React applications and convergence layer for intermixing React components and Backbone Views. 

Brief feature list:

- Advanced component's state management with [NestedTypes](https://github.com/Volicon/backbone.nestedTypes).
- Comprehensive two-way data binding - [Guide to Data Binding Use Cases](/example/databinding.md)
- Transparent interoperation with Backbone Views:
	- React component can be used as backbone View. `new MyComponent.View({ props })`
	- Backbone Views can be used as React components. `<React.subview View={ MyView } />`
	- Simplified refactoring of Backbone Views to React components. `this.$`, `this.$el`, `this.$( sel )`, `this.model` works for React components too, as well as `this.trigger` and `this.listenTo`.

Thus, if you have Bakcbone application and want to start writing with React - you have no excuses any more. Wanna keep some of your cool Views? They works just fine? Keep 'em. And use them in yout new components, written with React, which you will use in other Backbone Views.

# Breaking changes introduced in 0.3
- `component.createView( props )` doesn't work any more, use `new component.View( props )` instead.
- module and `npm` package name is now `nestedreact`.
- Raw `backbone` is not supported any more. Upgrade to `NestedTypes` 1.1.5 or more is required. It will give you following
features to help managing complex application state:
	- Proper nested models and collections implementation with deep changes detection. React components will
	update UI on nested attribute changes.
	- Dramatic improvement in model update performance compared to Backbone. Up to 40x faster in Chrome. Important for mobile devices.
	- Type safety. Attributes are guaranteed to hold values of declared types all the time.

	For more information about `NestedTypes`, visit
	http://volicon.github.io/backbone.nestedTypes/
	and
	https://github.com/Volicon/backbone.nestedTypes

# Usage
It's packed as single UMD, thus grab the module or use `npm` to install.
	`npm install --save nestedreact`

Module export's modified React namespace (without touching original React), and its
safe to use it as a replacement for `react`.

If you're using backbone-based frameworks such as `ChaplinJS` or `Marionette`,
you need to do following things:
- Make sure that frameworks includes `nestedtypes` instead of `backbone`.
- On application start, tell `nestedreact` to use proper base class for View.
	`require( 'nestedreact' ).useView( Chaplin.View )`

# Features
## Use React components as Backbone View

```javscript
var backboneView = new MyReactComponent.View( props );
```

## Use Backbone View in React component

```javscript
var React = require( 'nestedreact' );

var MyComponent = React.createClass({
	render : function(){
		return (
			<div>
				<React.subview
					className="classes for root element"
					View={ BackboneView }
					options={ viewOptions }
				/>
			</div>
		);
	}
});
```

## Helper methods for easy Backbone to React transition

There are `el`, `$el`, and `$( selector )` available for the React components,
which simplifies refactoring of the existing event handlers and usage of
`jquery` plugins.

```javscript
var React = require( 'nestedreact' );

var MyComponent = React.createClass({
	onClick : function(){
		this.$( '#somewhere' ).html( 'Hi' );
	}
});
```

It is extremely dangerous and conceptually wrong to directly *modify existing*
DOM subtree in React component. Read is safe, modify DOM when you know what you're
doing. Lets say, integrating `jQuery` plugins.

*You must not use these methods in render*. `jquery` plugins can be initialized
 in `componentDidMount` method or in event handlers.

## Use Existing Backbone Model as component's state

```javscript
var React = require( 'nestedreact' );

var MyComponent = React.createClass({
	Model : BackboneModel,

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.state.count }
			</div>
		);
	},

	onClick : function(){
		this.state.count = this.state.count + 1;
	}
});
```

If Model is specified for the component,
- `this.state` and `this.model` holds backbone model. Usage of `setState` is *not allowed*.
- React component will update itself whenever model emit `change` event.
	- You can customize UI update events supplying `listenToState` property. For example, `listenToState : 'change:attr sync'`.
	- You can disable UI updates on state change, supplying `listenToState : false` option.

## Managing state with ad-hoc Backbone model

```javscript
var React = require( 'nestedreact' );

var MyComponent = React.createClass({
	//Model : BackboneModel,

	state : { // Model defaults
		count : 0
	},

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.state.count }
			</div>
		);
	},

	onClick : function(){
		this.state.count = this.state.count + 1;
	}
});
```

- New `NestedTypes` Model definition will be created, using `state` as Model.defaults.
- If Model property is specified, it will be used as base model and extended.
- `state` property from mixins will be properly merged.
- Since `state` is `NestedTypes` model in this case,
	- All attributes *must* be declared using `NestedTypes` standard type specs.
	- `state` attributes allows direct assignments - treat it as regular object.
	- Every `state` modification (including direct assignments and nested attributes changes) will
	cause automagical react update.

## Passing Backbone objects as React components props
```javscript
var MyComponent = React.createClass({
	listenToProps : { // or just string with property names, separated by space
		model : 'change'
	},

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.props.model.count }
			</div>
		);
	},

	onClick : function(){
		this.props.model.count = this.props.model.count + 1;
	}
});
```

You can update react component on backbone events from component props.
Event subscription is managed automatically. No props passed - no problems.

## NestedTypes-style props specs

```javscript
var MyComponent = React.createClass({
    props : {
        model : MyFancyModel    
    },
    
	listenToProps : { // or just string with property names, separated by space
		model : 'change'
	},

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.props.model.count }
			</div>
		);
	},

	onClick : function(){
		this.props.model.count = this.props.model.count + 1;
	}
});
```

Simplified NestedTypes-style type annotations can be used as props spec:
- constructor functions: `Type`
- constructors with default values: `Type.value( x )`
- JSON and primitive values: `"default string"`

No other type annotation features are supported for `props`.

When component has `props` type spec:
- React component propTypes will be automatically generated for every props;
- if props has explicitly defined default value, getDefaultProps() method will be created. It means, that there are *no*
    default objects generated for simple `Type` style type spec.  

## Pure Render Mixin

```javscript
var MyComponent = React.createClass({
	props : {
        item      : MyModel,
        elements  : MyCollection,
        className : String
	},
	
	pureRender : true,

	render : function(){
		return (
		    ...
		);
	}
});
```

PureRender optimization in enabled with `pureRender` option. It will create `shouldComponentUpdate` function
which is optimized for props mentioned in `propTypes` or `props` declaration.
 
Therefore, it's required to declare all of component props when using this optimization. 

## Data binding

`nestedreact` supports data binding links compatible with standard React's `valueLink`.

Create link for object property of Model, Collection, and every object type created with Object.extend().

`var link = object.getLink( 'attr' )`  

Create boolean link, toggling model in collection. True if model is contained in collection, assignments will add/remove given model. Useful for checkboxes.
`var link = collection.hasLink( model )` 

Links can be created directly using constuctor:

```javascript
var Nested = require( 'nestedtypes' );

var link = new Nested.Link( value, function( x ){ /* update */ } ); 
```

Here's a brief reference for links API. Consult [Guide to Data Binding Use Cases](/example/databinding.md) to understand how to use it.

### Link validation

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

### Value access methods

In addition to standard members `link.requestChange( x )` and `link.value`, there are pair of shortcuts available:

- `link.set( x )`, which is a shortcut for `this.requestChange( x )`
- `link.toggle()` is a shortcut for `link.requestChange( !link.value )`

### Link transformations

Attribute's link can be further transformed using extended link API. Link transformations allowing you to use new `stateless functions` component definition style introduced in React 0.14 in most cases.

For links with any value type:

- `link.equals( x )` creates boolean link which is true whenever link value is equal to x. Useful for radio groups.
- `link.update( x => !x )` creates function transforming link value (toggling boolean value in this case). Useful for `onClick` event handlers.

For link enclosing array:

- `arrLink.contains( x )` creates boolean link which is true whenever x is contained in an array in link value. Useful for checkboxes. Avoid long arrays, currently operations has O(N^2) complexity.

For link enclosings arrays and plain JS objects:
- `arrOrObjLink.at( key )` creates link to array of object member with a given key. Can be applied multiple times to work with object hierarchies; on modifications, objects will be updated in purely functional way (modified parts will be shallow copied). Useful when working with plain JS objects in model attributes - updating them through links make changes visible to the model.
- `arrOrObjLink.map( ( itemLink, key ) => <input key={ key } valieLink={ itemLink } /> )` iterates through object or array, wrapping its elements to links. Useful for JSX transofrmation.

### Links and components state

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
