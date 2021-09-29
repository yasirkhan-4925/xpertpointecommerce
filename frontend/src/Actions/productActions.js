import {
  PRODUCT_ADD_REVIEW_REQUEST , PRODUCT_ADD_REVIEW_ERROR , PRODUCT_ADD_REVIEW_SUCCESS,
  PRODUCTLIST_ERROR,
  PRODUCTLIST_SUCCESS,
  PRODUCTLIST_REQUEST,
  PRODUCTDETAILS_ERROR,
  PRODUCTDETAILS_REQUEST,
  PRODUCTDETAILS_SUCCESS,
  PRODUCT_DELETE_ERROR, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_ERROR, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_ERROR, PRODUCT_UPDATE_REQUEST ,PRODUCT_UPDATE_SUCCESS , PRODUCT_UPDATE_RESET 
  
} from '../types/productTypes.js';
import axios from 'axios';
import { DateSchema } from 'yup';


export const listProduct = (keyword='' , pageNumber='') => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCTLIST_REQUEST });
      
      const res = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

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
        payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};



export const deleteProduct = (id) => {
  return async (dispatch,getState) => {
    try {
    
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const config = {
        headers: {
        
            Authorization:`Bearer ${getState().userLogin.user.token}`
            
        }
    }
     await axios.delete(`/api/products/${id}`, config);
      
      dispatch({ type: PRODUCT_DELETE_SUCCESS });

      dispatch(listProduct())

      setTimeout(function () { dispatch({type:'PRODUCT_DELETE_RESET'}) }, 3000);

    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};






export const createProduct = () => {
  return async (dispatch,getState) => {
    try {
    
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const config = {
        headers: {
        
            Authorization:`Bearer ${getState().userLogin.user.token}`
            
        }
    }
     const {data} =  await axios.post(`/api/products`, {}, config);
      
      dispatch({ type: PRODUCT_CREATE_SUCCESS , payload:data });

     

   

    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};





export const updateProduct = ( id, product) => {
  return async (dispatch,getState) => {
    try {
    
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const config = {
        headers: {
             'Content-Type':'application/json',
            Authorization:`Bearer ${getState().userLogin.user.token}`
            
        }
    }
     const {data} =  await axios.put(`/api/products/${id}`,product, config);
      
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });


      dispatch({ type: PRODUCT_UPDATE_RESET })

   

    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};



export const createReview = ( id, review) => {
  return async (dispatch,getState) => {
    try {
    
      dispatch({ type: PRODUCT_ADD_REVIEW_REQUEST });
      const config = {
        headers: {
             'Content-Type':'application/json',
            Authorization:`Bearer ${getState().userLogin.user.token}`
            
        }
    }
   
      await axios.post(`/api/products/${id}/review`, review, config);
      
      dispatch({ type: PRODUCT_ADD_REVIEW_SUCCESS });


    

   

    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_REVIEW_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
