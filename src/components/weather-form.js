import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

export const WeatherForm = ({ onSubmit }) => {
    const [location, setLocation] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(event.target.value, location)
    }

    return (
        <div style={{ marginTop: '32px' }}>
            <Form onSubmit={handleSubmit}>
                <Row className='justify-content-md-center'>
                    <Col xs={8} offset={2}>
                        <Form.Control
                            type='text'
                            placeholder='Try "Barcelona" or "Buenos Aires"...'
                            size='lg'
                            aria-label='location input'
                            onChange={event => setLocation(event.target.value)}
                            value={location}
                        />
                    </Col>
                    <Col xs={2}>
                        <Button
                            size='lg'
                            variant='primary'
                            type='submit'
                            aria-label='get weather'
                            onClick={handleSubmit}
                        >
                            Get weather!
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

WeatherForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
