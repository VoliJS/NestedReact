# react-backbone.glue
This is React add-on designed to replace Backbone views with React in existing Backbone application.

It allows you:

- To use React component in place of every Backbone View in your application.
- To use your existing Backbone Views as subviews in React components.
- To use your existing Backbone Models as React component state.
- Update React components on Backbone events.

Thus, no refactoring of your application is required. You can start writing UI with React immediately.

This extension works with raw Backbone, but you are strictly encouraged to upgrade to Backbone.NestedTypes
to take full advantage of React/Backbone architecture. It will give you following features helping managing
complex application state:

- Proper nested models and collections implementation with deep changes detection. React components will
update UI on nested attribute changes.
- Dramatic improvement in model update performance. Up to 40x faster in Chrome.
- Type safety. Attributes are guaranteed to hold valid values of declared types all the time.

https://github.com/Volicon/backbone.nestedTypes

# Usage
It's packed as single UMD, thus grab the module which is appropriate for you.

Internally, it imports React and Backbone, modify React, and return reference to React.

# Features
## Use React components as Backbone View

```javscript
var backboneView = MyReactComponent.createView( props );
```

## Use Backbone View in React component

```javscript
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

## Use Existing Backbone Model as component's state

```javscript
var MyComponent = React.createClass({
	Model : BackboneModel,

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.state.get( 'count' ) }
			</div>
		);
	},

	onClick : function(){
		this.state.set( 'count', this.state.get( 'count' ) + 1 );
	}
});
```

If Model is specified for the component,
- `this.state` is backbone model. Usage of `setState` is not allowed.
- React component will update itself whenever model emit `change` event.
	- You can customize UI update events supplying `listenToModel` property. For example, `listenToModel : 'change:attr sync'`.
	- You can disable UI updates on state change, supplying `listenToModel : false` option.

## Managing state with ad-hoc Backbone model

```javscript
var MyComponent = React.createClass({
	//Model : BackboneModel, 

	attributes : { // Model defaults
		count : 0
	},

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.state.get( 'count' ) }
			</div>
		);
	},

	onClick : function(){
		this.state.set( 'count', this.state.get( 'count' ) + 1 );
	}
});
```

- New Model definition will be created, using `attributes` as Model.defaults.
- If Model property is specified, it will be used as base model and extended.
- `attributes` property from mixins will be properly merged.

## Passing Backbone objects as React components props
```javscript
var MyComponent = React.createClass({
	listenToProps : {
		model : 'change'
	},

	render : function(){
		return (
			<div onClick={ this.onClick }>
				{ this.props.model.get( 'count' ) }
			</div>
		);
	},

	onClick : function(){
		this.props.model.set( 'count', this.props.model.get( 'count' ) + 1 );
	}
});
```

You can update react component on backbone events from component props.

Event subscription is managed automatically.