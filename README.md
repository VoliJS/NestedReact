# NestedReact

React application architecture with [classical OO models](https://github.com/volicon/nestedtypes) in the data layer.

Feature list:

- First-class support for mutable models and collections in props, state, and context.
    - Unidirectional data flow and safe *pure render optimization*.
    - Two-way data binding ([Guide to Data Binding Use Cases](/docs/databinding.md))
    - Optional local component subtree updates.     
- Lightweight type annotations for props, *state*, and context as a replacement for `PropTypes`.
- Gradual transition procedure for backbone applications ([Backbone Migration Guide](/docs/BackboneViews.md)):
    - Complete interoperation with existing Backbone Views allowing you to reuse existing code and avoid upfront application rewrite.
    - Any type of application refactoring strategy is possible - top-to-bottom, bottom-to-top, and random parts at the middle.  
    - Support for Backbone events and jQuery accessors in React components simplifies View refactoring. 

NestedReact is build around the idea of productivity, not ideology. When compared to common React practices, NestedReact allows you to write twice less code, being on par with AngularJS.

You can compare solution size and complexity to other approaches on [TodoMVC](/examples/todomvc/) and [flux-comparison](/examples/flux-comparison) examples. 

![todomvc](/examples/todomvc/SLOC-comparison.jpg) ![flux-comparison](/examples/flux-comparison/sloc-comparison.png)


## Installation and Requirements

It's packed as single UMD, thus grab the module or use `npm` to install.
	`npm install --save nestedreact`

It has [NestedTypes model framework](http://volicon.github.io/NestedTypes/) and [React](http://facebook.github.io/react/) as strong dependencies.

Module extends React namespace (without modifying original React), and its
safe to use it as a replacement for `react`.
    `import React from 'nestedreact'`
    
If you're migrating from backbone-based frameworks such as `ChaplinJS` or `Marionette`,
you need to do following things to make convergence layer work properly:

- Make sure that frameworks includes `nestedtypes` instead of `backbone`.
- On application start, tell `nestedreact` to use proper base class for the View.
	`React.useView( Chaplin.View )`
	
## How To

- Introduction:
    - [State Management 101](/docs/State Management 101.md).
    - [Form Validation 101](/docs/Form Validation 101.md)
- Advanced topics:
    - [Managing Complex State](/docs/Advanced State Management.md)
    - [Data Binding Guide](/docs/Advanced Performance Topics.md)
    - [Performance Optimizations](/docs/Advanced Performance Topics.md)
- Intergations:
    - [Using jQuery plugins](/docs/Using jQuery Plugins.md)
    - [Integration with Backbone Views](/docs/Integration with Backbone.md)

## Comparison and Examples

## API Specs

listenToProps : 'p1 p2 p3'

listenToProps : {
    p1 : 'event1 event2'
    p2 : 'event1 event2'
}

listenToProps : {
    p1 : {
        'event1' : function(){ ... } 
    },

    p2 : 'event1 event2'
}
