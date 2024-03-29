// this is 1st step to create redux store package needed : redux , react-redux , redux-thunk , redux-devtools-extension

import { combineReducers, createStore, applyMiddleware } from 'redux';
import {productListReducer , productDetailsReducer} from './reducers/productReducers.js'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers.js';
import { getMyOrdersReducer,orderCreateReducer , orderDetailsReducer , orderPayReducer , allOrdersReducer , orderDeliveredReducer } from './reducers/orderReducer.js'
import { singleUserEditReducer ,singleUserDetailReducer, userDeleteReducer,userLoginReducer , userRegisterReducer , userDetailsReducer,updateUserProfileReducer, userListReducer}from './reducers/userReducers.js'

import { topProductsReducer, productAddReviewReducer, productDeleteReducer , productCreateReducer  , productUpdateReducer} from './reducers/productReducers.js';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay: orderPayReducer,
  getMyOrders: getMyOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  singleUserDetail: singleUserDetailReducer,
  singleUserEdit: singleUserEditReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  allOrders: allOrdersReducer,
  orderDelivered: orderDeliveredReducer,
  productAddReview: productAddReviewReducer,
  topProducts:topProductsReducer
  
});

const itemsFromLocaStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
  cart: { cartItems: itemsFromLocaStorage , shippingAddress:shippingAddressFromLocalStorage , paymentMethod:paymentMethodFromLocalStorage },
  userLogin: {user:userFromLocalStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
