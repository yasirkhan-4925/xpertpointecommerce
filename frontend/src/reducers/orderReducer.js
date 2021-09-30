import { ORDER_CREATE_RESET , ORDER_DELIVERED_ERROR , ORDER_DELIVERED_REQUEST , ORDER_DELIVERED_SUCCESS , GET_ORDERS_ERROR , GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_MY_ORDERS_ERROR , GET_MY_ORDERS_REQUEST , GET_MY_ORDERS_SUCCESS , ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST , ORDER_DETAILS_ERROR ,ORDER_DETAILS_SUCCESS ,ORDER_DETAILS_REQUEST , ORDER_PAY_ERROR ,ORDER_PAY_SUCCESS , ORDER_PAY_REQUEST , ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../types/orderTypes.js'



export const orderCreateReducer = (state={}, action) => {
    switch (action.type) {

        case ORDER_CREATE_REQUEST:
            return {
                loading:true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order:action.payload
            }
        case ORDER_CREATE_ERROR:
            return {
                loading: false,
                error:action.payload
            }
            case 'RESET_CREATED_ORDER':
                return {
                    success: false,
                    order:{}
            }
            case ORDER_CREATE_RESET:
            return {}
        default:
            return state
      }
}



export const orderDetailsReducer = (state={ loading:true,orderItems:[] , shippingAddress:{}} ,action) => {
     
    switch (action.type) {
          
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                order:action.payload
                
            }
        case ORDER_DETAILS_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        
        default:
            return state
    }
}


export const orderPayReducer = (state={}, action) => {


    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {
                loading:true
            }
        case ORDER_PAY_SUCCESS: 
            return {
                loading:false,
                success:true
            }
        
        case ORDER_CREATE_ERROR:
            return{
                loading: false,
                error:action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
    
}


export const getMyOrdersReducer = (state={myOrders:[]}, action) => {


    switch(action.type){
        case GET_MY_ORDERS_REQUEST:
            return {
                loading:true
            }
        case GET_MY_ORDERS_SUCCESS: 
            return {
                loading:false,
                myOrders:action.payload
            }
        
        case GET_MY_ORDERS_ERROR:
            return{
                loading: false,
                error:action.payload
            }
        
        default:
            return state
    }
    
}



export const allOrdersReducer = (state={orders:[]}, action) => {


    switch(action.type){
        case GET_ORDERS_REQUEST:
            return {
                loading:true
            }
        case GET_ORDERS_SUCCESS: 
            return {
                loading:false,
                orders:action.payload
            }
        
        case GET_ORDERS_ERROR:
            return{
                loading: false,
                error:action.payload
            }
        
        default:
            return state
    }
    
}



export const orderDeliveredReducer = (state={}, action) => {


    switch(action.type){
        case ORDER_DELIVERED_REQUEST:
            return {
                loading:true
            }
        case ORDER_DELIVERED_SUCCESS: 
            return {
                loading:false,
                success:true
            }
        
        case ORDER_DELIVERED_ERROR:
            return{
                loading: false,
                error:action.payload
            }
        case ORDER_DELIVERED_RESET:
            return {}
        
        default:
            return state
    }
    
}