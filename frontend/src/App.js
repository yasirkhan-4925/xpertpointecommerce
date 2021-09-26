import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Home from './components/Home'
import OneProduct from './components/OneProduct'
import CartScreen from './components/CartScreen'
import LoginScreen from './components/LoginScreen';
import Register from './components/Register';
import ProfileScreen from './components/ProfileScreen'
import ShippingScreen from './components/ShippingScreen'
import PaymentScreen from './components/PaymentScreen'
import PlaceOrderScreen from './components/PlaceOrderScreen';
import history from './history';
import OrderScreen from './components/OrderScreen';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit'
import ProductsList from './components/ProductsList';
import ProductEdit from './components/ProductEdit';


import {  Router, Route } from 'react-router-dom'




const  App  = () => {
  return (
    <Router history={history}>
    
     
      <Header />
     
      <main className='py-3'>
          <Container>
        
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={OneProduct} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/placeorder' component={PlaceOrderScreen} exact />
          <Route path='/order/:id' component={OrderScreen} exact />
          <Route path='/admin/userslist' component={UserList} exact />
          <Route path='/user/:id/edit' component={UserEdit} exact />
          <Route path='/admin/productslist' component={ProductsList} exact />
          <Route path='/product/:id/edit' component={ProductEdit} exact />
          
      
       
            
 
        </Container>
      
      </main>

      <Footer/>
     
      
      
      </Router>
  );
}

export default App;
