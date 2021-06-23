import { React } from 'react'


import { Row, Col} from 'react-bootstrap'
import product from '../products'
import  Product from '../components/Product'




const Home = () => {
     
    return (
        <>
                
            <h1>
                Lattest Products
            </h1>

            <Row>
                  
                {product.map((product) => (
                    <Col key={product._id} sm={6}  md={6}  lg={3}>
                        <Product product={ product}/>
                        
                    </Col>
                ))}
                
            </Row>


            

        
        </>
    )
   
}

export default Home;

