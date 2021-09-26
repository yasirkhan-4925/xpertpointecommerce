import React, { useEffect , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productDetails , updateProduct} from '../Actions/productActions';
import FormContainer from './FormContainer';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertDisplay from './AlertDisplay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PRODUCT_UPDATE_RESET } from '../types/productTypes';



const schema = Yup.object({
    name: Yup.string(),
   
            price: Yup.number(),
            image: Yup.string(),
            brand:  Yup.string(),
            category: Yup.string(),
            countInStock: Yup.number(),
            description: Yup.string(),
    
   
  });


const ProductEdit = ({ history, match }) => {
    const formRef = useRef();
  const dispatch = useDispatch();

  const productUpdate = useSelector(state => state.productUpdate)
  const {success , loading:editLoading , error:editError} = productUpdate
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  useEffect(() => {
    
    if (success) {

      history.push('/admin/productslist')
  }


    if (user && user.isAdmin) {
      if ( !product.name || product._id !== match.params.id) {
        
        dispatch(productDetails(match.params.id));
        
      } else {
        if (formRef.current) {
          console.log('else is running')
          console.log(product)
            formRef.current.setFieldValue('name', product.name);
            formRef.current.setFieldValue('price', product.price);
            formRef.current.setFieldValue('image', product.image);
            formRef.current.setFieldValue('brand', product.brand);
            formRef.current.setFieldValue('countInStock', product.countInStock);
            formRef.current.setFieldValue('category', product.category);
            formRef.current.setFieldValue('description', product.description);

          }
      }
    } else {
      history.push('/');
    }
  }, [dispatch , history , match.params.id ,user , product.name , success ]);

  return (
    <>
      <FormContainer>
      { editLoading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : editError ? <AlertDisplay variant='danger' error={editError} /> : ''  }
        {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger' error={error} /> : (
          <>
            <Link className='btn btn-light my-3 ' to='/admin/productslist'>
              Go Back
            </Link>
            <h1>Edit Product</h1>
            <Formik
              innerRef={formRef}
              validationSchema={schema}
              validateOnChange={false}
              initialValues={{
                name: '',
                price: '',
                image: '',
                brand: '',
                category: '',
                countInStock: '',
                description: '',
              }}
               
              onSubmit={(data) => {
                 
                const {name, price , image, brand ,category , countInStock , description} = data
                  
                dispatch(updateProduct(match.params.id, {_id:product._id , name ,price, image, brand ,countInStock, description }))


              }}
            >
              {({ values, touched, handleChange, handleSubmit, errors }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                      <Form.Label>Product name</Form.Label>
                      <Form.Control
                        placeholder='Enter product name'
                        isInvalid={errors.name}
                 
                        type='text'
                        value={values.name}
                        onChange={handleChange}
                        name='name'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>




                    <Form.Group controlId='price'>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        placeholder='Enter price'
                        isInvalid={errors.price}
                 
                        type='number'
                        value={values.price}
                        onChange={handleChange}
                        name='price'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='image'>
                      <Form.Label>Image Url</Form.Label>
                      <Form.Control
                        placeholder='Enter image url'
                        isInvalid={errors.image}
                 
                        type='text'
                        value={values.image}
                        onChange={handleChange}
                        name='image'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.image}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId='brand'>
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        placeholder='Enter Brand'
                        isInvalid={errors.brand}
                   
                        type='text'
                        value={values.brand}
                        onChange={handleChange}
                        name='brand'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.brand}
                      </Form.Control.Feedback>
                    </Form.Group>



                    <Form.Group controlId='category'>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        placeholder='Enter category '
                        isInvalid={errors.category}
                  
                        type='text'
                        value={values.category}
                        onChange={handleChange}
                        name='category'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId='countInStock'>
                      <Form.Label>Count in stock</Form.Label>
                      <Form.Control
                        placeholder='Enter count in stock '
                        isInvalid={errors.countInStock}
                   
                        type='number'
                        value={values.countInStock}
                        onChange={handleChange}
                        name='countInStock'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.countInStock}
                      </Form.Control.Feedback>
                    </Form.Group>

                
                    <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        placeholder='Enter description '
                        isInvalid={errors.description}
                    
                        type='text'
                        value={values.description}
                        onChange={handleChange}
                        name='description'
                      />

                      <Form.Control.Feedback type='invalid'>
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      style={{ marginTop: '10px' }}
                      type='submit'
                      variant='primary'
                    >
                      Update
                    </Button>

                  </Form>
                );
              }}
            </Formik>
          </>)}
        
      </FormContainer>
    </>
  );
};

export default ProductEdit;
