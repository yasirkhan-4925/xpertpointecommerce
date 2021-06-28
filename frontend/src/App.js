import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Home from './components/Home'
import singleProduct from './components/singleProduct'

import { BrowserRouter as Router, Route } from 'react-router-dom'



const  App  = () => {
  return (
    <Router>
    
     
      <Header />
     
      <main className='py-3'>
          <Container>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={singleProduct} exact />
      
       
            
 
        </Container>
      
      </main>

      <Footer/>
     
      
      
      </Router>
  );
}

export default App;
