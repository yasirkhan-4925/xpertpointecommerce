import React, { useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertDisplay from './AlertDisplay';
import CheckoutStep from './CheckoutStep';
import { Link } from 'react-router-dom';
import { createOrder } from '../Actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector(state => state.orderCreate)

    const {order , error, success , loading} = orderCreate
  const userLogin = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 5000 ? 0 : 250;
  cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice);
  if (!userLogin) {
    history.push('/login');
  }

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice:cart.totalPrice
      })
    );
    };
    
    useEffect(() => {
        if (success) {
               history.push(`/order/${order._id}`)
           }
       }, [history, success])
  return (
    <>
      
      <CheckoutStep step1 step2 step3 step4 />

      {loading && <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> }

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address} , {cart.shippingAddress.city} ,{' '}
                {cart.shippingAddress.postalCode} ,{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong> Method: {cart.paymentMethod} </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <AlertDisplay variant='warning' error={'Your cart is empty'} />
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                          {item.quantity} x Rs{item.price} = Rs
                          {item.quantity * item.price}
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
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>Rs {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping Price</Col>
                <Col>Rs {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>Rs {cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                style={{ width: '100%' }}
                onClick={placeOrderHandler}
                className=' btn-block'
                disabled={cart.cartItems.length === 0}
                type='button'
                variant='dark'
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
