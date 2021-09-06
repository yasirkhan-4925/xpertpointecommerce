import {
  PRODUCTLIST_ERROR,
  PRODUCTLIST_SUCCESS,
  PRODUCTLIST_REQUEST,
  PRODUCTDETAILS_ERROR,
  PRODUCTDETAILS_REQUEST,
  PRODUCTDETAILS_SUCCESS,
} from '../types/productTypes.js';
import axios from 'axios';

export const listProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCTLIST_REQUEST });
      const res = await axios.get('/api/products');

      dispatch({ type: PRODUCTLIST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: PRODUCTLIST_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const productDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCTDETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCTDETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCTDETAILS_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};