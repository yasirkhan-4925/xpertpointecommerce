import React from 'react'

import { Col, Row, Container } from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={23} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}


export default FormContainer;