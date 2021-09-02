import { React, useEffect} from 'react'
import { connect } from 'react-redux'
import { listProduct} from '../Actions/productActions'
 
import axios from 'axios'
import { Row, Col} from 'react-bootstrap'
import Product from './Product'





const Home = ({ product ,listProduct , loading,error}) => {
    
    useEffect(() => {
       
        listProduct()
      
    }, [listProduct])
    return (
        <>
          
            <h1>
                Lattest Products
            </h1>

            {loading ? <h1>Loading....</h1> : error ? <h3>{error} </h3> :  <Row>
                  
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

