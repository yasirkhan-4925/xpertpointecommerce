import React from 'react';
import { Navbar, Nav, Container , NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userActions';
import '../index.css'




const Header = () => {
  

  const userLogin = useSelector(state => state.userLogin);
  
  const { user } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand > Xpert.Point</Navbar.Brand>
          </LinkContainer>
         
         
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className=' nav'>

           
            {user ? <NavDropdown title={user.name} id='username'>
             
             <NavDropdown.Item ><Link className='profileLink' to='/profile' style={{textDecoration:'none' , color:'grey'}}>Profile</Link></NavDropdown.Item> 
               <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            
              
              </NavDropdown> : <LinkContainer to='/login'>
              <Nav.Link >
                <i class='fas fa-user'></i> Sign In
              </Nav.Link></LinkContainer> }

             


              <LinkContainer to='/cart'>
              <Nav.Link >
                {' '}
                <i class='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              </LinkContainer>


              {user && user.isAdmin && (
                <LinkContainer to='/admin/userslist'>
                <Nav.Link >
                   Users List
                </Nav.Link>
                </LinkContainer>
              )}


             
             
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
