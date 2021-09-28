import React from 'react'
import { Card, Button ,Row , Col  } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'



const Product = ({product , history }) => {
     
    const userLogin = useSelector(state => state.userLogin.user)
    
   
    return (
         <>
            <Card  border='dark' variant='top'className='my-1 p-2 rounded' >
                <Card.Img src={product.image} />

                <Card.Body>
                    < Link className=' productLink text-dark ' to={`/product/${product._id}`}> <Card.Title as='div'>  <strong>{product.name}</strong> </Card.Title></Link>
                   
                    <Card.Text as='div'>
                        <div>
                            <Rating value={ product.rating}  text={`${product.numReviews} Reviews`} />
                        </div>
                    </Card.Text>

                    <Card.Text className='py-1' as='h3'>Rs { product.price}</Card.Text>
                     
                    
                    
                   
                </Card.Body>
                
              

               </Card>

            </>
     ) 
   

}


export default Product;