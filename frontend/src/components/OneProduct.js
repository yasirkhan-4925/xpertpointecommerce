import { React, useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button , Form} from 'react-bootstrap';
import axios from 'axios';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../Actions/productActions.js';
import { Spinner } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';
import '../index.css'
import { createReview } from '../Actions/productActions.js';

import { PRODUCT_ADD_REVIEW_RESET } from '../types/productTypes'
import Meta from './Meta'


const OneProduct = ({ match , history }) => {
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;

  const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin

  const productAddReview = useSelector(state => state.productAddReview)
  const { success, error: reviewError } = productAddReview
  
    
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  useEffect(() => {
    if (success) {
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_ADD_REVIEW_RESET})

    }
    dispatch(productDetails(match.params.id));
  }, [dispatch , success , match]);


  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity+1)
  }

  const decreaseQuantity = () => {
    setQuantity(quantity-1)
  }

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  const onSubmitHandler = (e) => {
     e.preventDefault()

     dispatch(createReview(match.params.id, {rating ,comment}))
  }

  return (
    <>
      <Link className='btn btn-light my-3 ' to='/'>
        Go Back
      </Link>

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

            <>
              <Meta title={product.name} />
        <Row>
          <Col sm={6} md={6} lg={6} >
            <Image src={product.image} alt='product image' fluid />
          </Col>
          <Col sm={6}  md={6} lg={3}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: Rs {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col  sm={12}  md={12} lg={3}>
            <Card border='light' className='p-3'>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {' '}
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Available:</Col>
                      <Col>
                        <strong>{product.countInStock}</strong>
                      </Col>
                    </Row>

                       
                  </ListGroup.Item>
                )}

{product.countInStock > 0 && (
                  <ListGroup.Item>
                   

                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <div style={{display:'flex' , justifyContent:'space-evenly' , padding:'0px' }}>
                              <button  disabled={quantity==1} onClick={decreaseQuantity} className='qtyButton'>-</button>
                              <h5 >{ quantity}</h5>
                              <button disabled={quantity==product.countInStock} onClick={ increaseQuantity} className='qtyButton' >+</button>
                            </div>
                          </Col>
                        </Row>
                  </ListGroup.Item>
                )}

                    <Button
                  
                  className='btn-block'
                  disabled={product.countInStock === 0}
                      variant='outline-dark'
                      onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </ListGroup>
            </Card>
          </Col>
              </Row>
              <Row className='mt-5'>
              <Col md={6}>
                  <ListGroup>
                  <ListGroup.Item>
                        { reviewError && <AlertDisplay variant='danger' error={reviewError} /> }
                          <h2>Write your review</h2>
                          {user ? (
                             <>

                               <Form onSubmit={onSubmitHandler}>
                                  <Form.Group controlId='rating'>
                                   
                                  <Form.Label>
                                    Rating
                                  </Form.Label>
                                  <Form.Control required as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                  <option value = '' >Select</option>
                                   <option value = '1' >1</option>
                                   <option value = '2' >2</option>
                                   <option value = '3' >3</option>
                                   <option value = '4' >4</option>
                                   <option value = '5' >5</option>
                                  </Form.Control>
                                  
                                  </Form.Group>
       
                                <Form.Group controlId='comment'>
                                <Form.Label>
                                    Add Comment
                                  </Form.Label>
                                       <Form.Control required as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value) }  >  </Form.Control>
                                 

                                </Form.Group>

                                <Button className='mt-3' type='submit' variant='primary'  > Add Review </Button>  
                              </Form>
                             </>
                           )  : <p>  please <Link to='/login'> login </Link> to write your reivew </p> }
                        </ListGroup.Item>
                        
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h2>Reviews</h2>
                
                  {product.reviews && product.reviews.length === 0 ? <AlertDisplay variant='secondary' error={'No reviews for this product'} /> : (
                    <>
                      <ListGroup variant='flush'> 
                        {
                          product.reviews &&  product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <p>{review.createdAt.substring(0,10)}</p>
                              <p>{review.comment}</p>
                         </ListGroup.Item>
                          ))
                         

                          }

                        
                          
                      </ListGroup>

                    </>
                  ) }
                </Col>
               
              </Row>

   </>
            
      )}
    </>
  );
};

export default OneProduct;
