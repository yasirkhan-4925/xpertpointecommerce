import React, { useEffect , useState , useRef}from 'react'

import { Row, Col, Button, Form , Spinner ,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetails , updateProfile } from '../Actions/userActions'

import AlertDisplay from './AlertDisplay'
import { Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'



const schema = Yup.object({
    name: Yup.string(),
    email: Yup.string().email('Enter Valid Email Address'),
    password: Yup.string().min(6, 'Password should at least 6 characters long'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Passwords not matched')
    
})





const ProfileScreen = ({ history , location}) => {
    
   
    
    const formRef = useRef();
    const dispatch = useDispatch();
    const userIsLogin = useSelector(state => state.userLogin.user)

    const { user, error, loading } = useSelector(state => state.userDetails)
    const {success} = useSelector(state => state.updateUserProfile)
    
    
    
    
    
    useEffect(() => {
        
      
        if (!userIsLogin) {
            history.push('/login')
        }
        else {
            if (!user.name && user) {

                dispatch(getUserDetails())
              
                
            }
            else {
                if (formRef.current){
                    formRef.current.setFieldValue('name',user.name)
                    formRef.current.setFieldValue('email',user.email)
                     
                }
               
            }
        }

       
       
        
        
        
      
     },[userIsLogin , history , user ,dispatch])
    return (
          
        <>
            <Container>
            <Row>
                
                <Col sm={12} md={4}>
                        <h2>My Profile</h2>
                        { console.log(error)}
                        {success && <AlertDisplay variant='success' error={'Profile Updated '} />}
                    {error && <AlertDisplay variant='danger' error={error} />}
                    {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : <Formik  innerRef={formRef}  validationSchema={schema} initialValues={{
                name: '',
                email: '',
                passowrd: '',
                confirmPassword: ''
            }} onSubmit={(data, { setSubmitting})=> {
                 
                const { name ,email, password} = data
                dispatch(updateProfile({id:userIsLogin._id, name ,email, password}))
                console.log(data)
               

              
                  
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
                        <Button  style={{ marginTop: '10px' }} type='submit' variant='primary'>Update</Button>
                        
                        
                    
                    </Form>
                    

                )
            }}
            

       </Formik>  }
                           
                    
                        

                </Col>

                <Col sm={12} md={8}>
                   <h2>My Orders</h2>
                </Col>

              </Row>
           </Container>
           
           
           
            </>


   )



}


export default ProfileScreen;