import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'


const Product = ({product}) => {
    

    return (
         <>
            <Card  border='dark' variant='top'className='my-1 p-2 rounded' >
                <Card.Img src={product.image} />

                <Card.Body>
                    <a  className='text-dark text-decoration-none' href={`/prodcut/${product._id}`}> <Card.Title as='div'>  <strong>{product.name}</strong> </Card.Title></a>
                   
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