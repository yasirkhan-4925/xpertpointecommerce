import React, { useState } from 'react'
import {Form , Button , Row ,Col} from 'react-bootstrap'




const SearchBar = ({ history }) => {
      
    const [keyword, setKeyword] = useState('')
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
          
        } else {
            history.push('/')
        }

    }
    return (
       <>

            
            <Form onSubmit={onSubmitHandler} >
                

                <Row >
                    
                    <Col md={8} sm={8} xs={8}> <Form.Control   className=''   placeholder='search....' type='text' name='q' onChange={(e) => setKeyword(e.target.value)} >

                    </Form.Control></Col>
                    <Col md={4} xs={4} sm={4}> <Button type='submit' className='' variant='outline-dark'>Search</Button></Col>
            
            </Row>
               

               
            </Form>
            </>
   )

}


export default SearchBar