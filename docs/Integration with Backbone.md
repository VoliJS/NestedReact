# Backbone to React Transition Guide

There are many different ways you may approach the problem when dealing with existing Bakcbone UI.
All of them are supported, enabling easy and gradual transition to React.  

Though `NestedReact` offers excellent convergence layer for backbone views, raw backbone models are not supported. 
To use it for smooth migration of existing backbone application to React, you need to replace `backbone` with `NestedTypes`
first (it's mostly backward compatible with Backbone 1.2 API, so [transition is not hard](https://github.com/Volicon/NestedTypes/blob/develop/docs/BackboneTransitionGuide.md)).
Which by itself will be a big step forward, because:

- It's order of magnitude faster, so your application becomes more responsive and you can handle collection which are 10 times larger than you have now. [No kidding](http://slides.com/vladbalin/performance#/).
- It implements nested models and collections in the right way. During `fetch`, nested objects are updated in place, so it's safe to pass them by reference.   
- It can handle model references by `id` in attributes for you too, operating on a set of independently fetched collections.
- It's type-safe, providing the same contract for model attributes as in statically typed language. Thus, 
	    attributes are guaranteed to hold values of declared types whatever you do, making it impossible to break client-server protocol.
- At the moment of writing, no other traditional model framework supports React's pure render optimization. :)

	For more information about `NestedTypes`, visit
	http://volicon.github.io/backbone.nestedTypes/
	and
	https://github.com/Volicon/backbone.nestedTypes
	
## Interoperation with existing Backbone Views

Key factor of success for technology transition project is to avoid naive 'upfront rewrite' strategy.
An ability of running old and new code together is the game changer, allowing you to make transition process gradual.
This strategy has a number of benefits, and probably one of the most significant is that you don't need to stop
delivering new features.  

### Use React components as Backbone View

When you work on new features, it's natural to decide that you will write its UI with React.

And, there're good news. Any React component may be used as Backbone subview. As easy as that:

```javscript
var backboneView = new MyReactComponent.View( props );
```

It will also enable you to start refactoring of your application from the bottom to top,
dealing with small isolated parts of the code first.

### Use Backbone View in React component

Or, you can decide to start refactoring from the top. In this case, you will likely want to reuse
  your existing lower-level backbone subviews.

You can do it like that.

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

It's easy, for example, to take [react-router](https://github.com/reactjs/react-router) and use it in your application without any changes in Backbone View layer.

Taking these two features together, you can take literally any view from the subview hierarchy, and replace it with
  React component. It will also work fine if there are multiple layers - React using Backbone using React...  

## Backbone View refactoring 

Occasionally, you may decide to refactor your existing View to React component.

Since Backbone generally use the same architectural concept as React (detect change and then render), it's an easy process.
 First of all, short vocabulary:
 1. `View.extend({})` -> `React.createClass({})`. That's an obvious part.
 2. `View.template` -> `Component.render()`. Yeah. In React, `render` function just *returns* markup. 
 3. `View.render` -> `Component.forceUpdate()`. And if you want to update component, you should call this thingy instead.
 4. `View.render` -> `Component.componentDidUpdate()`, `Component.componentDidMount()`. If you want to attach jQuery plugin after render, you do it here. 
 5. `View.initialize( options )` -> `View.componentWillMount()`
 6. `View options you receive in (4)` -> `Component.props`
 7. `View.model` -> `Component.state`
 
You approach the refactoring process in sequence:
  1. Create an empty React component. 
  2. Take your View's template, and convert it to JSX in your component's render method.
  3. Your View's `options` become component's `props`. Modify `render` function accordingly.
  4. And then, the `model` of your View becomes your component's `state`. Modify `render` function accordingly.
  5. You copy all of your event handlers.

Keep in mind - in React direct DOM manipulation is not allowed. Thus, you must render on every change, and `props` + `state`
must completely define an appearance of your markup. Since for Backbone it's not so, you will likely be required to expand your
View's state model.

In Backbone, you might assign values from `options` to the model. Do not do this with React. Remember, `options` is `props`. 
Therefore, it might be required to remove some items from the View's model.

### Converting EJS template to JSX

I will assume we're using EJS to be specific. JSX is not text, it's hidden JS tree construction expression, thus control structures must be transformed to functional form. In short, branches becomes logical expressions, loops becomes `map` expressions. Expression must return single node or array, in the last case you're required to add `key` attribute. Component must return single node at the top level.

Keeping in mind these simple patterns, it's not that hard:

- `class` should be substitued with `className`
- `<%= expr %>` -> `{ expr }`
- `<%if( expr ){%> <div/> <%}%>` -> `{ expr && <div/> }`
- `<%if( expr ){%> <div/> <%}else{%> <span/> <%}%>` -> `{ expr ? <div/> : <span/> }`
- `<%for( var i = 0; i < arr.length; i++ ){%> <div/> <%}%>` -> `{ arr.map( ( x, i ) => <div key={ i } /> )}`

You should consult official React documentation for more information about this.

### Use Existing Model as component's state

If you already have one model, describing View's state (usual pattern is listening to model's `change` event and calling `this.render()`),
 you can just attach it to you React component. Like this. It will be created, disposed, and listened to automatically.

```javscript
var React = require( 'nestedreact' );

var MyComponent = React.createClass({
	Model : MyStateModel,

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

*Please, note.* If Model is specified for the component,
- `this.state` and `this.model` variables holds backbone model. Usage of `setState` is *not allowed*. Generally, NestedTypes 
    models are far superior to React's state in its capabilities, so trust me, there are nothing to regret.
- React component will update itself automatically whenever model emit `change` event.
	- You can customize UI update events supplying `listenToState` property. For example, `listenToState : 'change:attr sync'`.
	- You can disable UI updates on state change, supplying `listenToState : false` option.

### Passing Models and Collections as React components props

In backbone, you might listen to models and collection changes which comes from the View `options`.
 
You can do it manually in React keeping in mind that `componentWIllMount` is substitution for `initialize`, but it's
not that simple because React component's lifecycle is more complicated. In contrast with Views, components are able to 
 receive props updates. Thus, you need to handle it, and it might become tricky.

To address this problem, there's special declarative syntax for events subscription from `props`.

```javscript
var MyComponent = React.createClass({
    listenToProps : 'model', // listen to change, and render
    /*
	listenToProps : { // or just string with property names, separated by space
		model : 'change' //listen to event names separated by space, and render 
	},
	or
	listenToProps : { // ...if you want really wierd things...
    	model : {
    	    'change' : function(){
    	        // ...you may do it. But here we are just listening to 'change', and render. 
                this.forceUpdate();     	    
    	    }
    	}
    },
    */
    
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

That's simple and safe. No props passed - no events subscription.

### Helper methods for event handlers

When you will copy over your event handlers, most likely, they will just work.
 
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

If they don't do DOM manipulation, which is prohibited. Instead, event handlers should modify the state, or call some callbacks
 received from props.

It is extremely dangerous and conceptually wrong to directly *modify existing*
DOM subtree in React component. Read is safe, modify DOM when you know what you're
doing. Lets say, integrating `jQuery` plugins.

*You must not use these methods in render*. `jquery` plugins can be initialized
 in `componentDidMount` method or in event handlers.

