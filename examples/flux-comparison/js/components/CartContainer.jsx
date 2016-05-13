import React           from 'nestedreact'
import CCart           from '../../../common/components/Cart.jsx'

const CartContainer = ( { cart } ) => (
    <CCart products={ cart.toJSON() } // this component assumes it receive an array,
           total={ cart.length }
           onCheckoutClicked={ () => cart.checkout() }/> // But likely for us, cart is not an array.
);

export default CartContainer;
