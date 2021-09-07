import axios from 'axios'
import { ADD_TO_CART , REMOVE_FROM_CART} from '../types/cartTypes'


export const addToCart = (id, quantity) => {
      
    return async (dispatch ,getState) => {
           
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: ADD_TO_CART,
            payload: {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity:quantity
            }
        })
        localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
             
    }
    
    
}


export const removeFromCart = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
        localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
    }

    
}