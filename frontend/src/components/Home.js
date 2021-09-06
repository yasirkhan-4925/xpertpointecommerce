import { React, useEffect} from 'react'
import { connect } from 'react-redux'
import { listProduct} from '../Actions/productActions'
 
import axios from 'axios'
import { Row, Col} from 'react-bootstrap'
import Product from './Product'
import { Spinner } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay'








const Home = ({ product ,listProduct , loading,error}) => {
    
    useEffect(() => {
       
        listProduct()
      
    }, [listProduct])
    return (
        <>
          
            <h1>
                Lattest Products
            </h1>

            {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger'  error={ error}/>  :  <Row>
                  
                  {product.map((product) => (
                      <Col key={product._id} sm={6}  md={6}  lg={3}>
                          <Product product={ product}/>
                          
                      </Col>
                  ))}
                  
              </Row> }

           


            

        
        </>
    )
   
}

const mapStateToProps = (state) => (
    {
        product: state.productList.products,
        loading: state.productList.loading,
        error:state.productList.error
    }
    
)

export default connect(mapStateToProps, {listProduct})(Home);

