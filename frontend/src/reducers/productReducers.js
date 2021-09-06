import { PRODUCTLIST_ERROR , PRODUCTLIST_SUCCESS , PRODUCTLIST_REQUEST , PRODUCTDETAILS_ERROR , PRODUCTDETAILS_REQUEST, PRODUCTDETAILS_SUCCESS } from '../types/productTypes.js'



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


export const productDetailsReducer = (state = { product: {} }, action) => {
    
    switch (action.type) {
        case PRODUCTDETAILS_REQUEST:
            return {
                loading: true,
                product:{}
            }
        case PRODUCTDETAILS_SUCCESS:
            return {
                loading: false,
                product:action.payload
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