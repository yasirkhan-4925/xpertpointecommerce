// this is 1st step to create redux store package needed : redux , react-redux , redux-thunk , redux-devtools-extension

import { combineReducers, createStore, applyMiddleware } from 'redux';
import {productListReducer , productDetailsReducer} from './reducers/productReducers.js'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers.js';
import {userLoginReducer}from './reducers/userReducers.js'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin:userLoginReducer
  
});

const itemsFromLocaStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
  cart: { cartItems: itemsFromLocaStorage },
  userLogin: {user:userFromLocalStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
