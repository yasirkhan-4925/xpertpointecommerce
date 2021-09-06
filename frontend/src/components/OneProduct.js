import { React, useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../Actions/productActions.js';
import { Spinner } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';
import '../index.css'

const OneProduct = ({ match , history }) => {
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;

  useEffect(() => {
    dispatch(productDetails(match.params.id));
  }, [dispatch]);


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
      )}
    </>
  );
};

export default OneProduct;
