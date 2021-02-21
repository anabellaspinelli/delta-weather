import PropTypes from 'prop-types'
import React, { createRef, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const ResponsiveButton = styled(Button)`
    @media (max-width: 768px) {
        width: 100%;
        margin-top: 16px;
    }
`

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
                <Col md={{ span: 6, offset: 2 }} xs={{ span: 12 }}>
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
                    <ResponsiveButton
                        size='lg'
                        variant='dark'
                        type='submit'
                        aria-label='get weather'
                        onClick={handleSubmit}
                    >
                        Search!
                    </ResponsiveButton>
                </Col>
            </Row>
        </Form>
    )
}

LocationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
