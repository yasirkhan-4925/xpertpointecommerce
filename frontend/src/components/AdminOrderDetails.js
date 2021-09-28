import React, { useEffect, useState } from 'react';
import {
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';
import moment from 'moment'


import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_CREATE_ERROR, ORDER_PAY_RESET } from '../types/orderTypes';

import { getOrderDetails } from '../Actions/orderActions';
import { setOrderDelivered } from '../Actions/orderActions';


import AlertDisplay from './AlertDisplay';

const AdminOrderDetails = ({ match, history }) => {


  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
    const userLogin = useSelector((state) => state.userLogin);
    const {user} = userLogin
  const { error, loading, order } = orderDetails;

  const orderDelivered =  useSelector(state => state.orderDelivered)

  const { success } = orderDelivered
    


 

 

  useEffect(() => {
       
      if (user && user.isAdmin === true) {
        if (success) {
            dispatch({type:ORDER_CREATE_ERROR})
            dispatch(getOrderDetails(match.params.id));
          }
          dispatch(getOrderDetails(match.params.id));
          
      }
      else {
          history.push('/')
      }
   
  }, [dispatch, match.params.id ,success , user ]);

  const backToHomeHandler = () => {
    history.push('/');
    
    
  };

  if (!userLogin) {
    history.push('/login');
  }

    const orderDeliveredHandler = () => {
        dispatch(setOrderDelivered(match.params.id))
  }
  return (
    <>
      {loading ? (
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
        <Row>
          <Col md={8}>
            <h4>Order {order._id}</h4>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                                      <h5>Shipping </h5>
                                      <p>
                  <strong>Name: </strong>
                    {order.user.name}
                </p>

                <p>
                  <strong>Email: </strong>
                    {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address} , {order.shippingAddress.city}{' '}
                  , {order.shippingAddress.postalCode} ,{' '}
                  {order.shippingAddress.country}
                </p>
              </ListGroup.Item>

              {order.isDelivered ? (
                <AlertDisplay
                  variant='success'
                  error={`Delivered on ${order.deliveredAt}`}
                />
              ) : (
                <AlertDisplay variant='danger' error='Not Delivered' />
              )}

              <ListGroup.Item>
                <h5>Payment Method</h5>
                <strong> Method: {order.paymentMethod} </strong>
              </ListGroup.Item>

              {order.isPaid && order.paymentMethod === 'paypal' ? (
                <AlertDisplay
                  variant='success'
                  error={`Paid at  ${moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}`}
                />
              ) : !order.isPaid && order.paymentMethod === 'paypal' ? (
                <AlertDisplay variant='danger' error='Not Paid' />
              ) : (
                ''
              )}

              <ListGroup.Item>
                <h5>Order Items</h5>
                {order.orderItems.length === 0 ? (
                  <AlertDisplay
                    variant='warning'
                    error={'Your order is empty'}
                  />
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link
                              style={{ color: 'black' }}
                              to={`/product/${item.id}`}
                            >
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {' '}
                            <p>
                              {' '}
                              {item.quantity} x Rs{item.price} = Rs
                              {item.quantity * item.price}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>Rs {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && (
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
                      )}
                      { !sdkReady ? ( <Spinner
                      className='spinner'
                      style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '120px',
                      }}
                      animation='border'
                      />) : <PaypalButton history={history} amount={order.totalPrice }/>  }
                </ListGroup.Item>
              )} */}
              <ListGroup.Item>
                <Button
                  onClick={backToHomeHandler}
                  style={{ width: '100%' }}
                  className=' btn-block'
                  type='button'
                  variant='dark'
                >
                  Back To Home
                </Button>
                                  </ListGroup.Item>

                                  { !order.isDelivered && (<ListGroup.Item>
                <Button
                  onClick={orderDeliveredHandler}
                  style={{ width: '100%' }}
                  className=' btn-block'
                  type='button'
                  variant='success'
                >
                  Mark as Delivered
                </Button>
                  </ListGroup.Item>
                 ) }
                                   
                 
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdminOrderDetails
