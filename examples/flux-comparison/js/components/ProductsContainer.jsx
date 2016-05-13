import React           from 'nestedreact'

import CProductItem    from '../../../common/components/ProductItem.jsx'
import CProductsList   from '../../../common/components/ProductsList.jsx'

const ProductsContainer = ( { products, addToCart } ) =>(
    <CProductsList title="Flux Shop Demo (NestedReact)">
        { products.map( product => (
            <CProductItem key={ product.id }
                          product={ product.toJSON() } // just for the case, convert model to plain object
                          onAddToCartClicked={ addToCart }/>
        ) )}
    </CProductsList>
);

export default ProductsContainer;
