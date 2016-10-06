## Installation

Packed as UMD, can be installed using npm. Requires `nestedtypes`, `react`, and `react-dom` as a peer dependencies.

*NestedTypes* itself can be used as a drop-in *BackboneJS* replacement
(some refactoring of models layer is still needed),
 and thus requires `jquery` and `underscore` as peer dependencies.

`npm install react react-dom nestedreact nestedtypes jquery underscore --save-dev`

See an examples in the [examples folder](https://github.com/Volicon/NestedReact/tree/master/examples)
for the starting boilerplate.

## Optimizing for size

If you're not interested in legacy technologies support and would like to reduce the
size of your app assembly, wait a bit for stripped version which is one the way.
Meanwhile, you can:

- Omit jQuery. Without that Model/Collection REST endpoints and Backbone shims will stop working.
- Use lightweight jQuery replacements in the same way as people do with Backbone.
- Don't bother and enjoy. That extra legacy stuff is really the small fraction of the assembly.

## Basic Usage

NestedReact exports modified React namespace. So, use it as React replacement like this:

```javascript
import React from 'nestedreact'
```

The most important thing NestedReact does is universal state management; the same technique is used for
handling both component's local UI state, persistent data, and shared global state. In the simplest case of the local UI state,
it looks to your as if your state just instantly became observable.

```javascript
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

ES6 classes are also supported. Specification members becomes statics,
 and definition must be preceeded with the `@define` decorator.

```javascript
import React, { define } from 'nestedreact'

@define
export class MyComponent extends React.Component {
	static state = {
		count : 0
	}

	render(){
	    const { state } = this;
		
		return (
			<div onClick={ () => state.count++ }>
				{ state.count }
			</div>
		);
	}
}
```

If you prefer not to use decorators, just invoke component's static `define()` method directly after the class definition.

```javascript
MyComponent.define();
```

If you prefer not to use inline statics, you may pass specification directly to the `define()` method:

```javascript
MyComponent.define({
    state : {
		count : 0
	}
});
```