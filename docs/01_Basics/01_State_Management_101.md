The first and most notable thing NestedReact does is that it deprecates 
 React state, replacing it with NestedTypes model. Thus, you have the single
  technique to manage all the state in your application. 

You start with importing React from `nestedreact`. 

```jsx
import React, { define } from 'nestedreact'
```

Definition of the component must be preceded with `@define` decorator.

```jsx
@define
export class MyComponent extends React.Component {
```

Then, we define the state. In the simplest case, the definition
 looks like the plain JS object where state attributes are listed along with their default values.
  All attributes of the state you're going to use must be declared.

```jsx
	static state = {
		count : 0
	}
```

And then, you just access `this.state` as if it would be the plain object.
 
```jsx
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

Fairly simple. Now, it's time to describe what really happens behind the scene
inside of the `@define` decorator and how this example works.

## NestedTypes models as React state

First, `@define` looks for the `state` static variable. If it present,
it defines the NestedTypes model describing the state. Whatever you write in
 `state` will just go to this model's `attributes` spec. Like this:

```jsx
@define
class MyState extends Nested.Model {
    static attributes = {
        count : 0    
    }
}
```

Then, it will attach special mixin to your component which will create
an instance of this model before mount, and will subscribe to the model
changes to update UI. It works as if you have the following code in your component:

```jsx
componentWillMount(){
    this.state = new MyState();
}

componentDidMount(){
    this.state.on( 'change', () => this.forceUpdate() );
}
```

An then, considering the fact that NestedTypes model behaves mostly as
an object with observable changes, you can just assign `this.state.count`
directly. Which will emit `change` event, and trigger UI update.

Alternatively, you can define the state separately like we did here and tell the component
to use it as state. You just need to use `Model` static property instead of `state`.

```jsx
	static Model = MyState;
```