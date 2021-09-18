import { ADD_TO_CART , REMOVE_FROM_CART , ADD_SHIPPING_ADDRESS_TO_CART, ADD_PAYMENT_METHOD_TO_CART } from '../types/cartTypes'



export const cartReducer = (state = { cartItems: [] , shippingAddress:{} }, action) => {
    
    switch (action.type) {
        
        case ADD_TO_CART:

            const item = action.payload

            const itemExist = state.cartItems.find((cartItem) => item.id === cartItem.id)
            
            if (itemExist) {
                return {
                    ...state,
                    cartItems:state.cartItems.map((cartItem)=> cartItem.id === itemExist.id ? item : cartItem)
                }
            }
            else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems:state.cartItems.filter((item)=> item.id!==action.payload)
            }
        
        case ADD_SHIPPING_ADDRESS_TO_CART:
            return {
                ...state,
                shippingAddress:action.payload
            }
        
        case ADD_PAYMENT_METHOD_TO_CART:
            return {
                ...state,
                paymentMethod:action.payload
            }
        
       
        case 'RESET_CART_ITEMS':
            return {
                ...state,
                cartItems:[]
            }
            
         
        default:
            return state
    }
    
}