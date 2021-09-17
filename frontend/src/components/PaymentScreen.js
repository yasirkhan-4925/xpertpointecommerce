import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutStep from './CheckoutStep';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Col, Button } from 'react-bootstrap'
import { addPaymentMethod } from '../Actions/cartAction';

const schema = Yup.object({
  paymentMethod: Yup.string().required('payment method is required')
});



const PaymentScreen = ({ history }) => {
    
    const cart = useSelector(state => state.cart);
    const userLogin = useSelector(state=> state.userLogin.user)
    const { shippingAddress } = cart
    const dispatch = useDispatch();

    if (!shippingAddress) {
        history.push('/shipping')
    }

    if (!userLogin) {
        history.push('/login')
    }


    return (
        <>
            <CheckoutStep step1 step2 step3 />
            

            <h1>Payment Method</h1>


            <Formik  validateOnChange={false}
        validateOnBlur={false}
                validationSchema={schema} initialValues={{
            paymentMethod:'paypal'
                }} onSubmit={(data) => {
                    
                    dispatch(addPaymentMethod(data.paymentMethod))
                    history.push('/placeorder')
        }}>
                {({values, handleChange , handleSubmit , errors}) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group>

                            <Form.Label as='lagend'>Select Payment Method</Form.Label>

                                <Col>
                                    <Form.Check checked  type='radio' label='paypal or credit card' name='paymentMethod' value='paypal' onChange={handleChange}  >
                                        
                                    </Form.Check>
                                    
                                    <Form.Check  type='radio' label='cash on delivery' name='paymentMethod' value='cash on delivery' onChange={handleChange}  >
                                        
                                     </Form.Check>
                                </Col>

                            </Form.Group>


                            

                            <Button
                style={{ marginTop: '10px' }}
                type='submit'
                variant='primary'
              >
                Continue
              </Button>
                      </Form>
                   ) 
                }}


             </Formik>

            </>
     )



}


export default PaymentScreen;