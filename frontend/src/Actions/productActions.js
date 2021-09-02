import { PRODUCTLIST_ERROR, PRODUCTLIST_SUCCESS, PRODUCTLIST_REQUEST } from '../types/productTypes.js'
import axios from 'axios'



export const listProduct = () => {
    return async (dispatch) => {

        try {
            dispatch({ type: PRODUCTLIST_REQUEST })
            const res = await axios.get('/api/products')
          
            dispatch({type: PRODUCTLIST_SUCCESS, payload: res.data})
        }
        catch(error) {
            dispatch({
                type: PRODUCTLIST_ERROR,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
          
        }

    }
}