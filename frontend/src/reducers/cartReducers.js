import { ADD_TO_CART , REMOVE_FROM_CART } from '../types/cartTypes'



export const cartReducer = (state = { cartItems: [] }, action) => {
    
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
         
        default:
            return state
    }
    
}