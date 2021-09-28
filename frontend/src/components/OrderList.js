import React, { useEffect } from 'react'
import { getOrders } from '../Actions/orderActions'

import { useDispatch, useSelector } from 'react-redux'

import {
    
    Button,
  
    Spinner,
    Container,
    Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'

import AlertDisplay from './AlertDisplay';



const OrdersList = ({history}) => {

    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.allOrders);
    const { loading: orderLoading, error: orderError, orders } = allOrders;
    const userLogin = useSelector(state => state.userLogin)
  const {user} = userLogin  
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrders())
        }
        else {
            history.push('/')
        }
    
    },[dispatch , history , user])
    
    return (
        <>
            <Container>
            <h2> Orders List</h2>
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
                  {orders.map((order) => (
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
                          
                          <td><LinkContainer to={`/admin/order/${order._id}`} >
                              <Button  className='btn-sm' variant='light'>Details</Button>
                          </LinkContainer></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
             </Container>
            </>
   
   )
 

}

export default OrdersList