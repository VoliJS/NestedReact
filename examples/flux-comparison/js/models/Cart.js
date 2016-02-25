import { Collection } from 'nestedtypes'
import Product from './Product'
import shop from '../../../common/api/shop'

const Cart = Collection.extend( {
    // Cart is a collection of products...
    model : Product,

    // ... which you can checkout.
    checkout(){
        shop.buyProducts( this.toJSON(), () => this.reset() );
    }
} );

export default Cart;
