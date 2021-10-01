import React, { useEffect, useState, useRef } from 'react';

import {
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Container,
  Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails, updateProfile } from '../Actions/userActions';
import { getAllOrders } from '../Actions/orderActions';
import moment from 'moment'

import AlertDisplay from './AlertDisplay';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email('Enter Valid Email Address'),
  phoneNo:Yup.string().max(11,'Phone nubmer should not contain more than 11 digits').matches(/^[0-9]+$/, "Must be only digits"),
  password: Yup.string().min(6, 'Password should at least 6 characters long'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords not matched'
  ),
});

const ProfileScreen = ({ history, location }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const userIsLogin = useSelector((state) => state.userLogin.user);

  const { user, error, loading } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.updateUserProfile);

  const getMyOrders = useSelector((state) => state.getMyOrders);
  const { loading: orderLoading, error: orderError, myOrders } = getMyOrders;

  useEffect(() => {
    if (!userIsLogin) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getAllOrders());
        dispatch(getUserDetails());
      } else {
        if (formRef.current) {
          formRef.current.setFieldValue('name', user.name);
          formRef.current.setFieldValue('email', user.email);
          formRef.current.setFieldValue('phoneNo', user.phoneNo);
         
        }
      }
    }
  }, [userIsLogin, history, user, dispatch , user.name , myOrders ]);
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <h2>My Profile</h2>
            {console.log(error)}
            {success && (
              <AlertDisplay variant='success' error={'Profile Updated '} />
            )}
            {error && <AlertDisplay variant='danger' error={error} />}
            {loading ? (
              <Spinner
                className='spinner'
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '120px',
                }}
                animation='border'
              />
            ) : (
                <Formik
                validateOnChange={false}
                innerRef={formRef}
                validationSchema={schema}
                initialValues={{
                  name: '',
                  email: '',
                  passowrd: '',
                  confirmPassword: '',
                  phoneNo:''
                }}
                onSubmit={(data, { setSubmitting }) => {
                  const { name, email, password  , phoneNo} = data;
                  dispatch(
                    updateProfile({
                      id: userIsLogin._id,
                      name,
                      email,
                      phoneNo:phoneNo.toString(),
                      password,
                    })
                  );
                  
                }}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  touched,
                  errors,
                  isSubmitting,
                  isValid,
                }) => {
                  return (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          placeholder='Enter Name'
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


                      <Form.Group controlId='phoneNo'>
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control
                          placeholder='Enter Phone No'
                          isInvalid={errors.phoneNo}
                          type='text'
                          value={values.phoneNo}
                          onChange={handleChange}
                          name='phoneNo'
                        />

                        <Form.Control.Feedback type='invalid'>
                          {errors.phoneNo}
                        </Form.Control.Feedback>
                      </Form.Group>
                     
                     
                     
                     

                      <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          placeholder='Enter Password'
                          isInvalid={errors.password}
                          type='password'
                          value={values.password}
                          onChange={handleChange}
                          name='password'
                        />

                        <Form.Control.Feedback type='invalid'>
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          placeholder='Confirm Password'
                          isInvalid={errors.confirmPassword}
                          type='password'
                          value={values.confirmPassword}
                          onChange={handleChange}
                          name='confirmPassword'
                        />

                        <Form.Control.Feedback type='invalid'>
                          {errors.confirmPassword}
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
            )}
          </Col>

          <Col sm={12} md={8}>
            <h2>My Orders</h2>
            {orderLoading ? (
              <Spinner
                className='spinner'
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '120px',
                }}
                animation='border'
              />
            ) : orderError ? (
              <AlertDisplay variant='danger' error={orderError} />
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                                              <th>Delivered</th>
                                              <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map((order) => (
                    <tr key={order._id}>
                          <td>{ order._id}</td>
                          <td>{ moment(order.createdAt).format('MMM Do YY') }</td>
                          <td>{ order.totalPrice}</td>
                          <td>{order.isPaid ? <i style={{color:'green'}} class="fas fa-check"></i> : order.paymentMethod !== 'cash on delivery' ? (
                              <i className='fas fa-times' style={{color:'red'}}> </i>
                          ) : 'cash on delivery'}</td>

<td>{order.isDelivered ? <i style={{color:'green'}} class="fas fa-check"></i> : (
                              <i className='fas fa-times' style={{color:'red'}}> </i>
                          )}</td>
                          
                          <td><LinkContainer to={`/order/${order._id}`} >
                              <Button  className='btn-sm' variant='light'>Details</Button>
                          </LinkContainer></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
