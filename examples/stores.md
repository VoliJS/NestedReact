- stores are needed to resolve id references in models. This is kind of `database`.
- there's one default global store.
- they may be used to bulk or lazy data loading when UI updates not needed. No other use cases.
- stores must be defined on the top level, and elements must be passed down as props.
- some components may borrow store elements to its model attributes. Rare pattern.
- some components may add or override upper store. Rare pattern.
- components model may be defined as store, to be included in lookup algorithm.
    it won't be visible to its children. Very rare pattern.

```javascript
var Top = React.createClass({
    // members fetched on first access, no updates on changes
    useStore : LazyStore.defaults({
        users : User.Collection,
        roles : Role.Collection,
        channelSets : ChannelSet.Collection
        _api : MasterStore.take( api ).merge() // create proxy native props accessors
    }),

    attributes : {
        role : Role.from( 'store.roles' ) // render on instance replace
    },

    render(){
        var store = this.getStore(),
            model = this.model;

        return (
            <div>
                <Roles collection={ store.roles } selected={ ( role ) => model.role = role } />
                <Role model={ model.role } />
            </div>
        );
    }
});

var Roles = React.createClass({
    // render only if prop values change
    isolated : true, // same as mixins : [ PureRenderMixin ],

    attributes : {
        roles : Collection.take( 'props.collection' ), // -> this._owner.props.collection
        selected : Role.from( 'roles' ).onChange( 'props.selected' ) // ->
        /* install hook .set( function( value ){
                            this._owner.props.selected( value );
                            return value;
                        }) */
    },

    render(){
        var model = this.model;
        return (...);
    }
});

var Role = React.createClass({
    updateOnProps : 'model',

    render(){
        var model = this.model;
        return (
            <Tabs>
                <TabsHeader>
                { this.tabs.map( ( x, i ) =>
                    <div key={ i }>
                        ...
                    </div>
                )}
                </TabsHeader>

                <TabsBody>
                { this.tabs.map( x => ... )}
                </TabsBody>
            </Tabs>);
    },

    tabs : [{
        Title : 'Permissions',
        Component : Permissions
    },{
        Title : 'Roles',
        Component : UserRoles
    }]
});





var Top = React.createClass({
    // when `useStore` is function
    getChildContext : function(){
        return { store : this.getStore() };
    },

    childContextTypes : {
        store : React.PropTypes.object // mix it in
    },

    // When `model` or `useStore`
    contextTypes : {
        store : React.PropTypes.object // mix it in
    },

    getStore : function(){
        var upperStore = this.context.store;

        if( !this._store ){    
            if( typeof this.useStore === 'function' ){
                this._store = new this.useStore();
                if( upperStore ) this._store._owner = upperStore;
            }
            else{
                this._store = upperStore || Nested.store;
            }
        }

        return this._store;
    },

    render(){
        return ();
    }
});

```
