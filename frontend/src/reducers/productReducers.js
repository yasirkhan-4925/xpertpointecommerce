import { TOP_PRODUCTS_ERROR ,TOP_PRODUCTS_REQUEST , TOP_PRODUCTS_SUCCESS  ,PRODUCT_ADD_REVIEW_REQUEST , PRODUCT_ADD_REVIEW_ERROR , PRODUCT_ADD_REVIEW_SUCCESS , PRODUCT_ADD_REVIEW_RESET, PRODUCT_UPDATE_ERROR, PRODUCT_UPDATE_REQUEST ,PRODUCT_UPDATE_SUCCESS , PRODUCT_UPDATE_RESET ,  PRODUCT_CREATE_ERROR , PRODUCT_CREATE_REQUEST , PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_ERROR , PRODUCT_DELETE_REQUEST , PRODUCT_DELETE_SUCCESS, PRODUCTLIST_ERROR , PRODUCTLIST_SUCCESS , PRODUCTLIST_REQUEST , PRODUCTDETAILS_ERROR , PRODUCTDETAILS_REQUEST, PRODUCTDETAILS_SUCCESS, PRODUCT_CREATE_RESET } from '../types/productTypes.js'



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
            
                products: action.payload.products,
                pages: action.payload.pages,
                page:action.payload.page
                
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
                ...state,
                loading: true,
                product:{}
            }
        case PRODUCTDETAILS_SUCCESS:
            return {
                loading: false,
                success:true,
                product:action.payload
            }
        case PRODUCTLIST_ERROR:
            return {
                ...state,
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





export const productUpdateReducer = (state={product:{}}, action) => {
    switch (action.type) {

        case PRODUCT_UPDATE_REQUEST:
            return {
                loading:true
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product :action.payload
            }
        case PRODUCT_UPDATE_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state

     }
}



export const productAddReviewReducer = (state={}, action) => {
    switch (action.type) {

        case PRODUCT_ADD_REVIEW_REQUEST:
            return {
                loading:true
            }
        case PRODUCT_ADD_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            
            }
        case PRODUCT_ADD_REVIEW_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        case PRODUCT_ADD_REVIEW_RESET:
            return {}
        default:
            return state

     }
}


export const topProductsReducer = (state={}, action) => {
    switch (action.type) {

        case TOP_PRODUCTS_REQUEST:
            return {
                loading:true
            }
        case TOP_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products:action.payload
            
            }
        case TOP_PRODUCTS_ERROR:
            return {
                loading: false,
                error:action.payload
            }
      
        default:
            return state

     }
}
