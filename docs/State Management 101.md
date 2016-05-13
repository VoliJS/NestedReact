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

