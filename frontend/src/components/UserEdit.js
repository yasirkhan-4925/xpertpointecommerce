
import React, { useEffect , useRef } from 'react'
import FormContainer from './FormContainer'
import { Row, Col, Button, Form , Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AlertDisplay from './AlertDisplay'
import { Formik,  } from 'formik'
import * as Yup from 'yup'
import { singleUserDetails  , singleUserUpdate} from '../Actions/userActions'


const schema = Yup.object({
    name: Yup.string(),
    email: Yup.string().email('Enter Valid Email Address'),
   
  });


const UserEdit = ({ history , match}) => {
    const formRef = useRef();
     const dispatch = useDispatch()
    const user = useSelector(state => state.userLogin.user)
    const singleUserDetail = useSelector(state => state.singleUserDetail)
    const { loading, singleUser, error } = singleUserDetail
    const singleUserEdit = useSelector(state => state.singleUserEdit)
    const { loading:editLoading , error:editError , success} = singleUserEdit
     
    useEffect(() => {
          
        if (success) {
            history.push('/admin/userslist')
        }
   

        if (user && user.isAdmin) {
            
            if (!singleUser.name || singleUser._id !== match.params.id)
            {
                dispatch(singleUserDetails(match.params.id))
            } else {
                if (formRef.current) {
                    formRef.current.setFieldValue('name', singleUser.name);
                    formRef.current.setFieldValue('email', singleUser.email);
                    formRef.current.setFieldValue('isAdmin', singleUser.isAdmin);

                  }
            }
           
           
        }
        else {
            history.push('/')
        }
      

    },[user , history , dispatch , singleUser , match.params.id ,success])
     
    if (!user) {
        history.push('/login')
   }
   
    return (
       <>
            <FormContainer>
                { editLoading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : editError ? <AlertDisplay variant='danger' error={editError} /> : ''  }

                {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger' error={error} /> : (
                    <>
                        <Link className='btn btn-light my-3 ' to='/admin/userslist'>
        Go Back
      </Link>
                 <h1>Edit User</h1>
                 
                 <Formik  innerRef={formRef} validationSchema={schema} validateOnChange={false}  initialValues={{
                     name: '',
                     email: '',
                     isAdmin:false
                        }} onSubmit={(data) => {
                            const {name , email , isAdmin} = data
                         dispatch(singleUserUpdate(match.params.id ,{_id:singleUser._id , name ,email ,isAdmin}))
                     }}  >
                     
 
                     {({ values , touched ,  handleChange , handleSubmit , errors}) => {
                         return (
                             <Form noValidate onSubmit={handleSubmit}>
                             <Form.Group controlId='name'>
                               <Form.Label>Name</Form.Label>
                               <Form.Control
                                 placeholder='Enter Name'
                                         isInvalid={errors.name}
                                         isValid={touched.firstName && !errors.firstName }
                                 type='text'
                                 value={values.name}
                                 onChange={handleChange}
                                 name='name'
                               />
       
                               <Form.Control.Feedback type='invalid'>
                                 {errors.name}
                               </Form.Control.Feedback>
                             </Form.Group>
       
                             <Form.Group controlId='email'>
                               <Form.Label>Email</Form.Label>
                               <Form.Control
                                 placeholder='Enter An Email'
                                 isInvalid={errors.email}
                                 type='text'
                                 value={values.email}
                                 onChange={handleChange}
                                 name='email'
                               />
       
                               <Form.Control.Feedback type='invalid'>
                                 {errors.email}
                               </Form.Control.Feedback>
                             </Form.Group>
       
                             <Form.Group className="mb-3">
             <Form.Check
               required
               name="isAdmin"
               label="Make User Admin"
               onChange={handleChange}
               isInvalid={!!errors.isAdmin}
               feedback={errors.isAdmin}
               id="validationFormik0"
             />
           </Form.Group>
                              
       
                             
                              
                             <Button
                               style={{ marginTop: '10px' }}
                               type='submit'
                               variant='primary'
                             >
                               Update
                             </Button>
                           </Form>
                          )
                     } }
 
                    </Formik>
                    </>
                ) }
                

              </FormContainer>

            </>
   )

}



export default UserEdit;


