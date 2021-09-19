import { ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST , ORDER_DETAILS_ERROR , ORDER_DETAILS_SUCCESS , ORDER_DETAILS_REQUEST , ORDER_PAY_ERROR ,ORDER_PAY_REQUEST , ORDER_PAY_RESET , ORDER_PAY_SUCCESS, GET_MY_ORDERS_ERROR, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS } from '../types/orderTypes.js'
import axios from 'axios'
import { resetCart } from './cartAction.js'


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


export const getOrderDetails = (id) => {
    return async (dispatch ,getState) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST })
            

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }

            const { data } = await axios.get(`/api/orders/${id}`,  config)

          
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
            dispatch(getAllOrders())
            dispatch(resetCart())
            localStorage.removeItem('cartItems')
           
        }
        catch (error) {
            dispatch({
                type: ORDER_DETAILS_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
       
    }
}


export const payOrder = (id, paymentResult) => {
    return async (dispatch ,getState) => {
        try {
            dispatch({ type: ORDER_PAY_REQUEST })
            

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }

            const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult , config)

          
            dispatch({type:ORDER_PAY_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: ORDER_PAY_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
       
    }
}



export const resetCreatedOrder = () => {
    
    return (dispatch) => {
        dispatch({type:'RESET_CREATED_ORDER'})
     }
}



export const getAllOrders  = () =>{


    return async (dispatch , getState) => {
        try {
            dispatch({ type: GET_MY_ORDERS_REQUEST })


            const config = {
                headers: {
                    
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }

            const { data } = await axios.get(`/api/users/myorders`,  config)

            dispatch({type:GET_MY_ORDERS_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: GET_MY_ORDERS_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
    }
    
    }















