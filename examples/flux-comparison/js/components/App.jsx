import React           from 'nestedreact'

import ProductsContainer from './ProductsContainer.jsx'
import CartContainer     from './CartContainer.jsx'

import Cart from '../models/Cart'
import Product from '../models/Product'

const App = React.createClass( {
    // Declare application's state
    // UI will be updated automatically on every state,
    // deep changes will be detected too.
    state : {
        cart     : Cart,
        products : Product.Collection
    },

    componentWillMount(){
        // fetch data on application start...
        this.state.products.fetch();
    },

    render(){
        const { state } = this;
        return (
            <div>
                <ProductsContainer products={ state.products }
                                   addToCart={ product => state.cart.add( product ) }/>

                <CartContainer cart={ state.cart }/>
            </div>
        );
    }
} );

export default App;
