// this is 1st step to create redux store package needed : redux , react-redux , redux-thunk , redux-devtools-extension

import { combineReducers, createStore, applyMiddleware } from 'redux';
import {productListReducer , productDetailsReducer} from './reducers/productReducers.js'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer  } from './reducers/cartReducers.js';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart:cartReducer
  
});

const itemsFromLocaStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart:{cartItems:itemsFromLocaStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
