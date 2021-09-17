import { ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST } from '../types/orderTypes.js'



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
        default:
            return state
      }
}