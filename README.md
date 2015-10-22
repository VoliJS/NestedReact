# react-bone
This is React add-on designed to simplify migration to React views in large Backbone applications.

It allows you:

- To use React component in place of every Backbone View.
- To use your existing Backbone Views from React components.
- To use your existing Backbone Models as React component state.
- Update React components on Backbone events.

Thus, no refactoring of your application is required. You can start writing UI with React immediately replacing your Backbone Views one-by-one, while keeping your existing models.

This extension works with raw Backbone. However, in order to take full advantage of React/Backbone
architecture you are encouraged to upgrade to `Backbone.NestedTypes`. It will give you following
features to help managing complex application state:

- Proper nested models and collections implementation with deep changes detection. React components will
update UI on nested attribute changes.
- Dramatic improvement in model update performance compared to Backbone. Up to 40x faster in Chrome. Important for mobile devices.
- Type safety. Attributes are guaranteed to hold values of declared types all the time.

For more information, visit
http://volicon.github.io/backbone.nestedTypes/
and
https://github.com/Volicon/backbone.nestedTypes

# Usage
It's packed as single UMD, thus grab the module or use `npm` to install.
	`npm install --save react-bone`

Module export's modified React namespace, and must be used as a replacement for `react`. It must be initialized before use. If you're using backbone-based frameworks, such as `ChaplinJS`, `Marionette`, or `NestedTypes`, pass it instead of Backbone.

```javascript
	var Backbone = require( 'backbone' ),
		React = require( 'react-bone' ).use( Backbone );
```

Note, that if you're using `NestedTypes`, it needs to be used in place of backbone in all places where Backbone is required.

# Features
## Use React components as Backbone View

```javscript
var backboneView = new MyReactComponent.View( props );
```

## Use Backbone View in React component

```javscript
var React = require( 'react-bone' );

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
var React = require( 'react-bone' );

var MyComponent = React.createClass({
	onClick : function(){
		this.$( '#somewhere' ).html( 'Hi' );
	}
});
```

It is extrimely dangerous and conceptualy wrong to directly *modify existing*
DOM subtree in React component. However, you might add *new* elements safely,
and it might be what you need if you're using jquery plugins.

*You must not use these methods in render*. `jquery` plugins can be initialized
 in `componentDidMount` method or in event handlers.

## Use Existing Backbone Model as component's state

```javscript
var React = require( 'react-bone' );

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
	- You can customize UI update events supplying `listenToState` property. For example, `listenToState : 'change:attr sync'`.
	- You can disable UI updates on state change, supplying `listenToState : false` option.

## Managing state with ad-hoc Backbone model

```javscript
var React = require( 'react-bone' );

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
- if you're using `Backbone.NestedTypes` models, it's far superior to react state in every aspect. It handles updates much faster, it detects nested elements changes, and it has type specs for state elements in a way like react's `propTypes`.

```javascript
// NestedTypes example
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
		this.state.count =  this.state.count + 1;
	}
});
```

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

Event subscription is managed automatically. No props passed - no problems.
