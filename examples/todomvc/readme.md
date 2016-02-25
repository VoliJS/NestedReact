# NestedReact • [TodoMVC](http://todomvc.com)

This TodoMVC application is written to demonstrate how powerful and expressive declarative OO data layer can be in React.

It features pure unidirectional data flow (which is common for Flux applications) achieved with conventional OO design
technique.

## Comparison and Analysis

Solution appears to be twice shorter than with common React approach,
and is on par with Angular.

![TodoMVC SLOC size comparison](SLOC-comparison.jpg)

The question is - why?  

### JSX is twice smaller than usual

So, why?

1. We're using our [advanced React Links](https://github.com/Volicon/NestedReact#two-way-data-binding) for [two-way data binding](/docs/databinding.md).
2. Due to (1), we can describe the most of UI with [components defined as stateless functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)

These two techniques in combination will save you half of the work in JSX, and make it much cleaner.
Remember - the best code is the code you avoided to write. :) You might wonder how it looks like.
Typically, like this:

![](pure-components.jpg)

Since our links are framework neutral and available as [separate dependency-free package](https://github.com/Volicon/valuelink),
any React system can benefit from this style. 

### JS (data layer) is 2-3 times smaller

Our data layer size is several times smaller than
in other React examples following facebook's suggestions for "good architecture".
Still, we have same "unidirectional data flow", and ["pure render"](https://github.com/Volicon/NestedReact#props-specs-and-pure-render-optimization)
optimization. For free.

And the more complex application will become, the more noticeable this difference in size will be. 

Reason is that our data layer is mostly defined with declarative spec.
All you have to do, is to describe the structure of your data, 
and use our smart Links to [bind it to UI](/docs/databinding.md).
It will work most of the time, [no matter, how complex your data are](https://github.com/Volicon/NestedTypes/blob/master/docs/RelationsGuide.md).

In TodoMVC, however, data layer is rather rudimentary to see the full power of approach, so
we're on par with other conventional OO data layers, such in react-backbone,
  Angular, or Ember. 

## Resources

- [NestedReact docs](https://github.com/Volicon/NestedReact)
- [Post-backbone models](https://github.com/Volicon/NestedTypes): 10x more performance, type safety, aggregation and relations right out of box. 
- [Used by](http://www.volicon.com/)

##FAQ
### What does `editing : ToDo.from( '^props.todos' )` from `todolist.jsx` mean?

This is NestedTypes type annotation, which literally means "`editing` is the model of `ToDo` type which is taken from 
collection in my parent's (`^`) `props.todos` property". In case of React component's `state` definition, 
'parent' is the React component holding the state, so `^props.todos` refers to its props. 

In NestedReact, component's state is managed with NestedTypes model, and being defined declaratively using 
attribute type specs. So, every state member becomes model attribute, which may have complex type like another
 model or collection. While it's nice by itself to have declarative spec for state, it gives you a lot more. NestedTypes observes and detects all
changes in nested model and collection tree, and triggers UI update for you automatically. For you, it mostly looks as if
   you'd work with plain objects.

Models in attributes can be _aggregated_ (thus they are inherent part of the model, and that what would happen if you just state `ToDo`
in the example above), or referenced with _relation_ (so, they are taken from some other collection). In the second case,
you add `ModelType.from( path )` for to-one relation, and `CollectionType.subsetOf( path )` for to-many relation.  

`path` in `Model.from( path )` - is the simple dot-separated path to property taken relative to model `this`. `^` is the 
shortcut for `getOwner()`, thus `^props.todos` is being translated to `this.getOwner().props.todos`.

Relation differs to aggregation in many aspects, for example:
 - relations are being serialized as referenced model ids, not as nested JSON.
 - relations are always shallow copied, even if owner is deep copied.
 - deep changes in referenced models doesn't trigger attribute's holder change.

Relations is one of the most powerful NestedTypes features. For more information, please 
check [NestedTypes Relations Guide](https://github.com/Volicon/NestedTypes/blob/master/docs/RelationsGuide.md)

## Credit

Created by Vlad Balin & [Volicon](http://www.volicon.com/)
