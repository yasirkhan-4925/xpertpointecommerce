import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Row,
    Col,
    Button,
    Form,
    Spinner,
    Container,
    Table,
} from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';
import { LinkContainer } from 'react-router-bootstrap'

import { listProduct , deleteProduct } from '../Actions/productActions';







const ProductsList = ({ history }) => {
      

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList
 

    const productDelete = useSelector(state => state.productDelete)
    const {loading:deleteLoading , success:deleteSuccess , error:deleteError} = productDelete
     

   

    useEffect(() => {

        if (user && user.isAdmin) {
            dispatch(listProduct())
        }
        else {
            history.push('/')
        }
      
    }, [dispatch , history , user])


    if (!user) {
         history.push('/login')
    }
    
    const deleteUserHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    
    return (
        <>
            <Row className='align-items-center'>
                <Col><h3>Products</h3></Col>
               

            </Row>
            <Row> <Col md={4}> <Button className='my-3'> <i className='fas fa-plus'></i>Create Product</Button> </Col></Row>
            { deleteSuccess && <AlertDisplay variant='success' error={'product Removed'} /> }
            { deleteError && <AlertDisplay variant='danger' error={deleteError} /> }
            {loading? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger' error={error} /> :   (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr ket={product._id}>
                                <td>{product._id }</td>
                                <td>{product.name }</td>
                                <td>Rs {product.price }</td>
                                <td>{ product.category }</td>
                                <td>{ product.brand }</td>
                                <td>
                                    <LinkContainer to={`/product/${product._id}/edit` }>
                                    
                                    <Button variant='light' className='btn-sm'><i  className='fas fa-edit'> </i></Button>

                                </LinkContainer>
                                    <Button onClick={()=>deleteUserHandler(product._id)} variant='danger' className='btn-sm'> <i  className='fas fa-trash'> </i> </Button> 
                                </td>
                            </tr>

                        ))}
                    </tbody>
            </Table>
        )}
    
   </>
    )
        
        
    



}



export default ProductsList