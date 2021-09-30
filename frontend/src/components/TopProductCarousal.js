import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import AlertDisplay from './AlertDisplay';

import { Carousel, Image, Spinner  , Container } from 'react-bootstrap';
import { listTopProducts } from '../Actions/productActions';

import { useDispatch, useSelector } from 'react-redux';
import '../index.css'

const TopProductCarousal = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);

  const { loading, error, products } = topProducts;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner
      className='spinner'
      style={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '120px',
      }}
      animation='border'
    />
  ) : error ? (
    <AlertDisplay variant='danger' error={error} />
  ) : (
              <>
                  <Container fluid >
                  <Carousel pause='hover' className='bg-light'>
                      
                      { products && products.length > 0  && products.map((product => (
                          <Carousel.Item key={product._id}>
                             
                                  <Link to={`/product/${product._id}`}>
                                  <Image fluid src={ product.image} alt={product.name} />
                              </Link>
                                  <Carousel.Caption> <h2>{ product.name  } Price: Rs{product.price} </h2></Carousel.Caption>
                             
                              

                              

                          </Carousel.Item>
                      )))}

                  </Carousel>
                  </Container>
                  
                 
              </>
  );
};

export default TopProductCarousal;
