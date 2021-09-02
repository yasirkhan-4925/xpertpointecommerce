import { PRODUCTLIST_ERROR , PRODUCTLIST_SUCCESS , PRODUCTLIST_REQUEST } from '../types/productTypes.js'



export const productListReducer = (state = {products:[]} , action)=>{
     
    switch (action.type) {

        case PRODUCTLIST_REQUEST:
            return {
                loading: true,
                products:[]
            }
        case PRODUCTLIST_SUCCESS:
            return {
                loading: false,
                products:action.payload
                
            }
        case PRODUCTLIST_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
    

}