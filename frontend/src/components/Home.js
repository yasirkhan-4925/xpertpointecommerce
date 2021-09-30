import { React, useEffect} from 'react'
import { connect } from 'react-redux'
import { listProduct} from '../Actions/productActions'
 import {useSelector} from 'react-redux'
import axios from 'axios'
import { Row, Col , Container} from 'react-bootstrap'
import Product from './Product'
import { Spinner } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay'
import SearchBar from './SearchBar'
import Paginate from './Paginate'
import TopProductCarousal from './TopProductCarousal'








const Home = ({ product ,listProduct , loading,error  ,match , history}) => {
      
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const productList = useSelector(state => state.productList)
    
    const {page , pages} = productList

    useEffect(() => {
        
        listProduct(keyword , pageNumber)
       
    }, [listProduct , keyword , pageNumber])
    return  (
        <>
            {!keyword && <TopProductCarousal />}
           
            <h1 className='mt-4'>
                Lattest Products
            </h1>

            <Row className='mb-5'>
                <Col md={4}>
                <SearchBar history={history} />
                </Col>
            </Row>

            {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger'  error={ error}/>  : (<> <Row>
                  
                  {product.map((product) => (
                      <Col key={product._id} sm={6}  md={6}  lg={3}>
                          <Product product={ product}/>
                          
                      </Col>
                  ))}
                  
            </Row>
            <Paginate pages={pages} page={page} keyword={ keyword ? keyword :''}  />
            </>)}
        
            

                

           


            

        
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

