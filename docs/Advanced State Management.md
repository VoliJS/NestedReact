### Handling the complex state

#### Nested Models and Collections

State is NestedTypes model. Models 101.

Passing down nested models and collections as props 

#### Nested JSON

For link enclosings arrays and plain JS objects:
- `arrOrObjLink.at( key )` creates link to array of object member with a given key. Can be applied multiple times to work with object hierarchies; on modifications, objects will be updated in purely functional way (modified parts will be shallow copied). Useful when working with plain JS objects in model attributes - updating them through links make changes visible to the model.
- `arrOrObjLink.map( ( itemLink, key ) => <input key={ key } valieLink={ itemLink } /> )` iterates through object or array, wrapping its elements to links. Useful for JSX transofrmation.



Links is NestedLink library

Passing down links to objects

## Old

## Passing models and collections as components props

It's quite common practice to describe complex application's page state in top-level component, and
 pass the parts of the state down as props. In this case, any changes to nested models
  and collections will be detected by top-level component and will cause update of the whole subtree.
  Resulting in so-called _unidirectional data flow_.

```javascript
// data layer
const Counter = Model.extend({
    attributes : {
        count : 0
    }
});

// Application or application's page
const Top = React.createClass({
    // all changes made to the parts of the state will cause component update
    state : {
        model1 : Counter,
        model2 : Counter
    },
    
    render(){
        // pass down elements of the state...
        return (
            <div>
                <Bottom model={ this.state.model1 } />
                <Bottom model={ this.state.model2 } />
            </div>
        );
    }
});

// Pure component. Click will trigger update of the Top component.
const Bottom = ({ model }) => (
    <div onClick={ () => model.count += 1 }>
        { model.count }
    </div>
);
```

Also, this example demonstrates the point which really differentiate our approach to 
application state management. Here the simple fact comes into play - `NestedTypes` models 
can declaratively describe very complex state, and detect deeply nested changes.
So, you have unidirectional data flow for no effort.  

## Links and components state

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
   selected : Item.has.watcher( '^props.selectedLink.set' )
}   
```

Technically, "watcher" - is just a callback function with a single argument receiving new attribute value, so links are not required here.
