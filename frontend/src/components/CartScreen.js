import {React, useEffect , useState } from 'react'
import { addToCart } from '../Actions/cartAction';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col , ListGroup , Image , Button , Card } from 'react-bootstrap'
import AlertDisplay from '../components/AlertDisplay'
import {Link} from 'react-router-dom'
import { set } from 'mongoose';
import '../index.css'
import { removeFromCart } from '../Actions/cartAction';



const CartScreen = ({ match, location, history }) => {
    

    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    



   

   
    useEffect(() => {
        if (productId) {
           dispatch(addToCart(productId,quantity))
       }   
    }, [dispatch,productId, quantity  ])
    

    const removeCartHandler = (id) => {
         
        dispatch(removeFromCart(id))
    }


    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

 
    
 

    
    return (
        <Row>
           
            <Col md={8}>

            <Link className='btn btn-light my-3 ' to='/'>
        Go Back
      </Link>

                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? <AlertDisplay variant='warning' error={'Your cart is empty'} /> : (
                    <ListGroup>

                        {cartItems.map((item, index) => (<ListGroup.Item key={ index} >
                            <Row >
                                <Col md={2} sm={ 6} xs={6}>
                                    <Image src={ item.image}  rounded fluid/>
                                </Col>

                                <Col md={3} sm={3} xs={3}>
                                    <Link to={`product/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>{ item.name}</Link>
                                </Col>
                                <Col md={2} sm={3} xs={3}>
                                    {`Rs ${item.price}`}
                                </Col>

                                <Col md={3} sm={6} xs={6}>
                                    <Row>
                                    <Col>
                            <div style={{display:'flex' , justifyContent:'space-evenly' , padding:'0px' }}>
                              <button  disabled={item.quantity==1} onClick={()=>dispatch(addToCart(item.id,item.quantity-1))} className='qtyButton'>-</button>
                              <h5 >{item.quantity}</h5>
                              <button disabled={item.quantity===item.countInStock}  onClick={()=>dispatch(addToCart(item.id,item.quantity+1))} className='qtyButton' >+</button>
                            </div>
                          </Col>
                                    </Row>
                                   
                                </Col>
                                <Col md={2} sm={6} xs={6}>
                                    <Button onClick={()=>removeCartHandler(item.id)} type='button' variant='dark' >
                                    <i class="fas fa-times-circle" size='3x'></i>
                                </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>))}
                        
                        

                    </ListGroup>
                ) }

            </Col>


            <Col md={4}>
                <Card>

                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) Items</h3>
                            {`Rs ${ cartItems.reduce((acc,item) => acc + item.quantity*item.price , 0 )}`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                         <Button style={{width:'100%'}} onClick={checkoutHandler}  className=' btn-block' disabled={cartItems.length === 0} type='button' variant='dark'>Proceed To Checkout</Button>
                        </ListGroup.Item>
                  </ListGroup>
                </Card>
            </Col>
             
        

 

        </Row>
    )


}

export default CartScreen;