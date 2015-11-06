# nestedreact
This is React add-on designed to simplify migration to React views in large Backbone applications.

It allows you:

- To use React component in place of every Backbone View.
- To use your existing Backbone Views from React components.
- To use your existing Backbone Models as React component state.
- Update React components on Backbone events.

Thus, no refactoring of your application is required. You can start writing UI with React immediately replacing your Backbone Views one-by-one, while keeping your existing models.

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

	attributes : { // Model defaults
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

- New `NestedTypes` Model definition will be created, using `attributes` as Model.defaults.
- If Model property is specified, it will be used as base model and extended.
- `attributes` property from mixins will be properly merged.
- Since `state` is `NestedTypes` model in this case,
	- All attributes *must* be declared using `NestedTypes` standard type specs.
	- `state` attributes allows direct assignments - treat it as regular object.
	- Every `state` modification (including direct assignments and nested attributes changes) will
	cause automagical react update.

## Passing Backbone objects as React components props
```javscript
var MyComponent = React.createClass({
	listenToProps : {
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
