import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Home from './components/Home'
import OneProduct from './components/OneProduct'
import CartScreen from './components/CartScreen'
import LoginScreen from './components/LoginScreen';



import { BrowserRouter as Router, Route } from 'react-router-dom'




const  App  = () => {
  return (
    <Router>
    
     
      <Header />
     
      <main className='py-3'>
          <Container>
        
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={OneProduct} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          
      
       
            
 
        </Container>
      
      </main>

      <Footer/>
     
      
      
      </Router>
  );
}

export default App;
