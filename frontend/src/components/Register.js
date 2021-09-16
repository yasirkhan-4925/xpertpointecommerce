

import React, { useEffect , useState}from 'react'
import FormContainer from './FormContainer'
import { Row, Col, Button, Form , Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AlertDisplay from './AlertDisplay'
import { Formik,  } from 'formik'
import * as Yup from 'yup'
import { register } from '../Actions/userActions'


const schema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Enter Valid Email Address'),
    password: Yup.string().required('Password is required').min(6, 'Password should at least 6 characters long'),
    confirmPassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password'), null],'Passwords not matched')
    
})


const Register = ({location , history}) => {
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {  loading, error } = userRegister
    const userLogin = useSelector(state => state.userLogin.user)
    
     

    useEffect(() => {
        if (userLogin) {
            history.push(redirect)
          
           
        }
    },[ history , redirect,  userLogin])

    return (

        <FormContainer>
              <h1>Register</h1>
             {error && <AlertDisplay variant='danger' error={error} />}
                        {loading && <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> }
            <Formik validateOnChange={false} validateOnBlur={false} validationSchema={schema} initialValues={{
                name: '',
                email: '',
                passowrd: '',
                confirmPassword: ''
            }} onSubmit={(data, { setSubmitting})=> {
                 
             
                 
                // dispatch
                const { name, email, password } = data
                
                dispatch(register(name, email , password))
                

              
                  
            }}>
            
            {({values,handleChange, handleSubmit  , touched, errors, isSubmitting, isValid}) => {
                    return (
                       
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group controlId='name'>

                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder='Enter Name'  isInvalid={ errors.name } type='text' value={values.name} onChange={ handleChange}  name='name'/>

                            <Form.Control.Feedback type='invalid' >{errors.name}</Form.Control.Feedback>

                        </Form.Group>


                         <Form.Group controlId='email'>

                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder='Enter An Email'  isInvalid={ errors.email} type='text' value={values.email} onChange={ handleChange}  name='email'/>

                            <Form.Control.Feedback type='invalid' >{errors.email}</Form.Control.Feedback>

                        </Form.Group>


                         <Form.Group controlId='password'>

                            <Form.Label>Password</Form.Label>
                            <Form.Control  placeholder='Enter Password' isInvalid={ errors.password} type='password' value={values.password} onChange={ handleChange}  name='password'/>

                            <Form.Control.Feedback type='invalid' >{errors.password}</Form.Control.Feedback>

                        </Form.Group>
                          
                          <Form.Group controlId='confirmPassword'>

                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control placeholder='Confirm Password' isInvalid={ errors.confirmPassword} type='password' value={values.confirmPassword} onChange={ handleChange}  name='confirmPassword'/>

                            <Form.Control.Feedback type='invalid' >{errors.confirmPassword}</Form.Control.Feedback>

                        </Form.Group>
                        <Button  style={{ marginTop: '10px' }} type='submit' variant='primary'>Register</Button>
                        
                        <Row >
                <Col>
                    Already Have an Account  ? <Link style={{color:'black'}} to={redirect ? `/login?redirect=${redirect} ` : '/login'}>Login Here</Link>
            </Col>
            </Row>
                    
                    </Form>
                    

                )
            }}
            

       </Formik>
       </FormContainer>
    )


}


export default Register;