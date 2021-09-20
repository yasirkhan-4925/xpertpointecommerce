import React, { useEffect } from 'react'
import { usersList } from '../Actions/userActions'
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
import { deleteUser } from '../Actions/userActions';





const UserList = ({ history }) => {
      

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    const userList = useSelector(state => state.userList)
    const { users, error, loading } = userList
    const success = useSelector(state => state.userDelete.success)
     

   

    useEffect(() => {

        if (user && user.isAdmin) {
            dispatch(usersList())
        }
        else {
            history.push('/')
        }
      
    }, [dispatch , history])


    if (!user) {
         history.push('/login')
    }
    
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    
    return (
        <>
            { success && <AlertDisplay variant='success' error={'User Removed'} /> }
            {loading ? <Spinner className='spinner' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '120px' }} animation="border" /> : error ? <AlertDisplay variant='danger' error={error} /> : error ? <AlertDisplay variant='danger' error={error} /> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr ket={user._id}>
                                <td>{user._id }</td>
                                <td>{user.name }</td>
                                <td><a style={{color:'black'}} href={`mailto:${user.email}`}>{ user.email}</a></td>
                                <td>{user.isAdmin ? <i style={{ color: 'green' }} className='fas fa-check'> </i> : <i style={{ color: 'red' }} className='fas fa-times'> </i>}</td>
                                <td>
                                    {!user.isAdmin && ( <> <LinkContainer to={`/user/${user._id}/edit` }>
                                    
                                    <Button variant='light' className='btn-sm'><i  className='fas fa-edit'> </i></Button>

                                </LinkContainer>
                                    <Button onClick={()=>deleteUserHandler(user._id)} variant='danger' className='btn-sm'> <i  className='fas fa-trash'> </i> </Button> </>)}
                                </td>
                            </tr>

                        ))}
                    </tbody>
            </Table>
        )}
    
   </>
    )
        
        
    



}



export default UserList