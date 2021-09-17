import { ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST } from '../types/orderTypes.js'
import axios from 'axios'


export const createOrder = (order) => {
    return async (dispatch ,getState) => {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST })
            

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }

            const { data } = await axios.post('/api/orders', order, config)

          
            dispatch({type:ORDER_CREATE_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: ORDER_CREATE_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
       
    }
}