import React from 'react'
import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
 

const CheckoutStep = ({step1,step2, step3 ,step4}) => {
       
   
      
    return (
        <>

           
        <Nav className='justify-content-center mb-4'>
              
            

                
                <Nav.Item>

                    {step1 ?  <Link className='text-light' style={{textDecoration:'none'}} to='/login'> <Nav.Link style={{ color:'black' , fontWeight:'bolder'}}>Sign In</Nav.Link>   </Link>  : <Nav.Link disabled>Sign In</Nav.Link> }

                </Nav.Item>


                <Nav.Item>

{step2 ?  <Link className='text-light' style={{textDecoration:'none'}} to='/shipping'> <Nav.Link style={{ color:'black' , fontWeight:'bolder'}}>Shipping</Nav.Link>   </Link>  : <Nav.Link disabled>Shipping</Nav.Link> }

</Nav.Item>

                



<Nav.Item>

{step3 ?  <Link className='text-light' style={{textDecoration:'none'}} to='/payment'> <Nav.Link style={{ color:'black' , fontWeight:'bolder'}}>Payment</Nav.Link>   </Link>  : <Nav.Link disabled>Payment</Nav.Link> }

                </Nav.Item>
                

                <Nav.Item>

{step4 ?  <Link className='text-light' style={{textDecoration:'none'}} to='/confirmorder'> <Nav.Link style={{ color:'black' , fontWeight:'bolder'}}>Confirm Order</Nav.Link>   </Link>  : <Nav.Link disabled>Confirm Order</Nav.Link> }

</Nav.Item>

          


            </Nav>
            </>
    )
    
}


export default CheckoutStep