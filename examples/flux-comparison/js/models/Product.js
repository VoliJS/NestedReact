import { Model } from 'nestedtypes'
import shop from '../../../common/api/shop'

const Product = Model.extend( {
    attributes : {
        image     : String,
        title     : String,
        price     : Number,
        inventory : Number
    },

    collection : {
        fetch(){
            shop.getProducts( products => this.reset( products, { parse : true } ) );
        }
    }
} );

export default Product;
