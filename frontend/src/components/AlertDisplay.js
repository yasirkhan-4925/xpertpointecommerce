import React from 'react'
import {Alert} from 'react-bootstrap'


const AlertDisplay = (props) => {
    return (
     
        <>
             <Alert   transition='fade' variant={props.variant}>
                { props.error}
   
    
  </Alert>
    

            </>


    )
}

export default AlertDisplay