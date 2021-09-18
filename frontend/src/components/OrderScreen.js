import React, { useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getOrderDetails, resetCreatedOrder } from '../Actions/orderActions';
import { resetCart } from '../Actions/cartAction';

import AlertDisplay from './AlertDisplay';

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const userLogin = useSelector((state) => state.userLogin.user);
    const { error, loading, order } = orderDetails;
 
 
    if (!userLogin) {
      history.push('/login');
    }
     
  
    

    
    
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);
    

    const backToHomeHandler = () => {
           
        history.push('/')
        dispatch(resetCreatedOrder())
        dispatch(resetCart())
    
        

    }

    if (!userLogin) {
        history.push('/login')
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
                <h5>Shipping Address</h5>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address} , {order.shippingAddress.city} ,{' '}
                  {order.shippingAddress.postalCode} ,{' '}
                  {order.shippingAddress.country}
                </p>
                                  </ListGroup.Item>
                                  

                                  { order.isDelivered ?  <AlertDisplay variant='success' error={`Delivered on ${order.deliveredAt}`} />  :  <AlertDisplay variant='danger' error='Not Delivered' />  }

              <ListGroup.Item>
                <h5>Payment Method</h5>
                <strong> Method: {order.paymentMethod} </strong>
              </ListGroup.Item>

              { order.isPaid && order.paymentMethod === 'paypal' ?  <AlertDisplay variant='success' error={`Paid at  ${order.paidAt}`} />  : !order.isPaid && order.paymentMethod === 'paypal' ?  <AlertDisplay variant='danger' error='Not Paid' /> : '' }

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

                          <Col md={4}> <p> {item.quantity} x Rs{item.price} = Rs
                            {item.quantity * item.price}</p>
                           
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
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
