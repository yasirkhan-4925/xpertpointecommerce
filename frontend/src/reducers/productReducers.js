import { PRODUCT_CREATE_ERROR , PRODUCT_CREATE_REQUEST , PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_ERROR , PRODUCT_DELETE_REQUEST , PRODUCT_DELETE_SUCCESS, PRODUCTLIST_ERROR , PRODUCTLIST_SUCCESS , PRODUCTLIST_REQUEST , PRODUCTDETAILS_ERROR , PRODUCTDETAILS_REQUEST, PRODUCTDETAILS_SUCCESS, PRODUCT_CREATE_RESET } from '../types/productTypes.js'



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


export const productDeleteReducer = (state={}, action) => {
    switch (action.type) {

        case PRODUCT_DELETE_REQUEST:
            return {
                loading:true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case PRODUCT_DELETE_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        case 'PRODUCT_DELETE_RESET':
            return {}
        default:
            return state

     }
}






export const productCreateReducer = (state={}, action) => {
    switch (action.type) {

        case PRODUCT_CREATE_REQUEST:
            return {
                loading:true
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product :action.payload
            }
        case PRODUCT_CREATE_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state

     }
}


