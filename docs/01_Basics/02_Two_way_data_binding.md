All modern JS frontend application frameworks supports two-way data binding.
NestedReact is not an exception. In this example we will bind the state member to the `input` control.

In order to use data binding, you need to import data bound controls from `nestedreact/tags.jsx` module first.

```javascript
import React, { define } from 'nestedreact'
import { Input } from 'nestedreact/tags.jsx'
```

Then, you have to create data binding link for the state attribute using `getLink( key )` method,
and pass it to `valueLink` Input's property.

```javascript
@define
export class MyComponent extends React.Component {
	static state = {
		text : ''
	}

	render(){
		return <Input valueLink={ this.state.getLink( 'text' )} />;
	}
}
```

Link can be created for any NestedTypes model attribute (and `state` is the NestedTypes model internally).

`const link = model.getLink( 'attr' )`

If you have a form with a lot of controls, you can create links in a bulk with a single line
using `model.linkAll( ... )` method. Which is the preferable way of dealing with the complex forms.

```javascript
render(){
    const links = this.state.linkAll( 'a', 'b', 'c' );

    return (
        <form>
            <Input valueLink={ links.a } />
            <Input valueLink={ links.b } />
            <Input valueLink={ links.c } />
        </form>
    );
}
```

## How it works

[To explain `valuelink` pattern simply](https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112#.6mqtojilu), is an object holding the *value* and the *callback to update the value*. It is something
close to this:

```javascript
render(){
    const link = {
        value : this.state.text,
        set   : x => this.state.text = x
    };

    return <Input valueLink={ link } />;
}
```

And, an Input control which consumes such a link would look like this:

```javascript
const Input = ({ valueLink }) => (
    <input value={ valueLink.value }
           onChange={ e => valueLink.set( e.target.value ) />
);
```

NestedReact's [link implementation](https://github.com/Volicon/NestedLink) works close to the code above, but is way more
 sophisticated. Links are cached inside of the React component, so they are reused on subsequent render
  if the enclosed value is was not changed. Links also the basis for [declarative form validation](https://medium.com/@gaperton/react-forms-with-value-links-part-2-validation-9d1ba78f8e49#.10rn9ug6w).

NestedReact's links are also available as a [separate package](https://github.com/Volicon/NestedLink), and can be used independently.