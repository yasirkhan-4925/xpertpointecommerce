import React, { useEffect , useState}from 'react'
import FormContainer from './FormContainer'
import { Row, Col, Button, Form , Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Actions/userActions'
import AlertDisplay from './AlertDisplay'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import history from '../history'






const LoginScreen = ({location  })=>{
  

  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
   
   
    const dispatch = useDispatch()
    // const userRegister = useSelector(state => state.userRegister)
    // const { user, loading, error } = userRegister
    const userLogin = useSelector(state => state.userLogin)
    const { user, error, loading } = userLogin
    const  redirect = location.search ? location.search.split('=')[1] : '/'
     
    
  


    useEffect(() => {
        console.log(`redirect = ${redirect}`)
       
       

           
        
        if (user) {
            if (redirect === '/') {
                history.push('/')
            }
            else if (redirect === 'shipping') {
                history.push('/shipping')
            } else {
                history.push('/')
            }
         
    
        }
          
           
        
    },[ user , history ,  redirect])
      
   

    const onSubmitHandler = (e) => {
        e.preventDefault();
       
  
    dispatch(login(email,password))

    }


    return (
        <>
           
        <FormContainer>
            <h1>Sign In</h1>
            {error && <AlertDisplay variant='danger' error={error} />}
            {loading && <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> }
            <Form    onSubmit={onSubmitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control required onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter an email' value={email}>

                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control required onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter password' value={password}>

                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button style={{ marginTop:'15px'}} type='submit' variant='primary'>Sing In</Button>
            </Form>

            <Row >
                <Col>
                    Dont Have An Account  ? <Link style={{color:'black'}} to={redirect ? `/register?redirect=${redirect} ` : '/register'}>Register Here</Link>
            </Col>
            </Row>
            </FormContainer>
            </>
    )
}

export default withRouter(LoginScreen)