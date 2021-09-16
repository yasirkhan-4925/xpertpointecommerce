

import React, { useEffect} from 'react'
import FormContainer from './FormContainer'
import {  Button, Form } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from './CheckoutStep'



import { Formik,  } from 'formik'
import * as Yup from 'yup'
import { addShippingAddress } from '../Actions/cartAction'



const schema = Yup.object({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('city is required'),
    postalCode: Yup.string().required('postal code is required'),
    country: Yup.string().required('country is required')
    
})


const ShippingScreen = ({location , history}) => {
    
   
     
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart
      
    const userLogin = useSelector(state => state.userLogin.user)

    useEffect(() => {
        if (!userLogin) {
              history.push('/')
          }
    },[userLogin , history])

    return (
         
        
          
        <FormContainer>

            <CheckoutStep  />
         
              <h1>Shipping</h1>
            
            <Formik  validateOnChange={false} validateOnBlur={false} validationSchema={schema} initialValues={{
                address :shippingAddress.address,
                city: shippingAddress.city,
                postalCode:shippingAddress.postalCode,
                country: shippingAddress.country
            }} onSubmit={(data, { setSubmitting})=> {
                 
             
                const { address, city, postalCode, country } = data
                dispatch(addShippingAddress({address, city , postalCode ,country}))
                history.push('/payment')
               
              
                  
            }}>
            
            {({values,handleChange, handleSubmit  , touched, errors, isSubmitting, isValid}) => {
                    return (
                       
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group controlId='address'>

                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder='Enter Address'  isInvalid={ errors.address } type='text' value={values.address} onChange={ handleChange}  name='address'/>

                            <Form.Control.Feedback type='invalid' >{errors.address}</Form.Control.Feedback>

                        </Form.Group>


                         <Form.Group controlId='city'>

                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder='Enter City'  isInvalid={ errors.city} type='text' value={values.city} onChange={ handleChange}  name='city'/>

                            <Form.Control.Feedback type='invalid' >{errors.city}</Form.Control.Feedback>

                        </Form.Group>


                         <Form.Group controlId='postalCode'>

                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control  placeholder='Enter Postal Code' isInvalid={ errors.postalCode} type='text' value={values.postalCode} onChange={ handleChange}  name='postalCode'/>

                            <Form.Control.Feedback type='invalid' >{errors.postalCode}</Form.Control.Feedback>

                        </Form.Group>
                          
                          <Form.Group controlId='country'>

                            <Form.Label>Country</Form.Label>
                            <Form.Control placeholder='Enter Country' isInvalid={ errors.country} type='text' value={values.country} onChange={ handleChange}  name='country'/>

                            <Form.Control.Feedback type='invalid' >{errors.country}</Form.Control.Feedback>

                        </Form.Group>
                        <Button  style={{ marginTop: '10px' }} type='submit' variant='primary'>Continue</Button>
                        
                        
                    
                    </Form>
                    

                )
            }}
            

            </Formik>
            
          
            </FormContainer>
           
    )


}


export default ShippingScreen;