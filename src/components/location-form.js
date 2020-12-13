import PropTypes from 'prop-types'
import React, { createRef, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

export const LocationForm = ({ onSubmit }) => {
    const [location, setLocation] = useState('')
    const inputRef = createRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(location)
    }

    return (
        <Form
            onSubmit={handleSubmit}
            role='search'
            style={{ marginTop: '32px' }}
        >
            <Row className='justify-content-md-center'>
                <Col md={{ span: 6, offset: 2 }} xs={{ span: 8 }}>
                    <Form.Control
                        type='text'
                        placeholder='Try "Barcelona" or "Berlin"...'
                        size='lg'
                        aria-label='location input'
                        onChange={event => setLocation(event.target.value)}
                        value={location}
                        ref={inputRef}
                    />
                </Col>
                <Col>
                    <Button
                        size='lg'
                        variant='dark'
                        type='submit'
                        aria-label='get weather'
                        onClick={handleSubmit}
                    >
                        Get weather!
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

LocationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
