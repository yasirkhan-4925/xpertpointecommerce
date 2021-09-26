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

import { listProduct , deleteProduct , createProduct } from '../Actions/productActions';



import { PRODUCT_CREATE_RESET } from '../types/productTypes';



const ProductsList = ({ history }) => {
      

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList
 

    const productDelete = useSelector(state => state.productDelete)
    const {loading:deleteLoading , success:deleteSuccess , error:deleteError} = productDelete


    const productCreate = useSelector(state => state.productCreate)
    const {loading:createLoading , error:createError , success:createSuccess , product:createdProduct } = productCreate
     

   

    useEffect(() => {
         dispatch({type:PRODUCT_CREATE_RESET})
        if (!user.isAdmin) {
            history.push('/login')
        }

        if (createSuccess) {
            history.push(`/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(listProduct())
        }
        
      
    }, [dispatch , history , user , createSuccess , createdProduct])


    if (!user) {
         history.push('/login')
    }
    
    const deleteUserHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    
    return (
        <>
            <Row className='align-items-center'>
                <Col><h3>Products</h3></Col>
               

            </Row>
            <Row> <Col md={4}> <Button onClick={createProductHandler} className='my-3'> <i className='fas fa-plus'></i>Create Product</Button> </Col></Row>
            { deleteSuccess && <AlertDisplay variant='success' error={'product Removed'} /> }
            { deleteError && <AlertDisplay variant='danger' error={deleteError} /> }

            {/* { createSuccess && <AlertDisplay variant='success' error={'product created'} /> } */}
            { createError && <AlertDisplay variant='danger' error={createError} /> }
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