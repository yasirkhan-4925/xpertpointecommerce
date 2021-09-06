// this is 1st step to create redux store package needed : redux , react-redux , redux-thunk , redux-devtools-extension

import { combineReducers, createStore, applyMiddleware } from 'redux';
import {productListReducer , productDetailsReducer} from './reducers/productReducers.js'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail:productDetailsReducer
  
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
