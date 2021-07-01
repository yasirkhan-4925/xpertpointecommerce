import { React  , useEffect , useState} from 'react'

import axios from 'axios'
import { Row, Col} from 'react-bootstrap'
import Product from './Product'





const Home = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const getProducts = async () => {
              
            const res = await axios.get('/api/products')
              console.log('these are our products' + res)
            setProduct(res.data);
             
        }
        getProducts();
      
    }, [])
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

