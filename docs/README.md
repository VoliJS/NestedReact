# HOW TO

## State management

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

##### `declaration` state : { [ key ] : value | TypeSpec }

### Two-way data binding

```jsx
import React from 'nestedreact'
import { Input } from 'nestedreact/tags.jsx'

export const MyComponent = React.createClass({
	state : {
		login : '',
		email : '',
		isActive : true
	},

	render(){
	    const links = this.state.linkAll( 'login', 'email', 'isActive' );
		
		return (
			<form>
				<Input type="text" valueLink={ links.login } />
				<Input type="text" valueLink={ links.email } />
				<Input type="checkbox" checkedLink={ links.isActive } />
			</form>
		);
	}
});
```

#####  `method` state.getLink( key ) : Link

#####  `method` state.linkAll( key1, key2, ... ) : { [ key ] : Link }

### Handling the complex state

#### Nested Models and Collections

State is NestedTypes model. Models 101.

Passing down nested models and collections as props 

#### Nested JSON

Links is NestedLink library

Passing down links to objects

### Forms validation

#### Ad-hoc validation in render

#### Validation in models

## Performance optimizations

### Pure Render

### Transactional data updates

### Local UI updates

## Integrations

### Attaching jQuery plugins

### Working with Backbone Views