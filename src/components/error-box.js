import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

export const ErrorBox = ({ errorMessage }) => {
    return (
        <Alert variant='danger' style={{ marginTop: '16px' }}>
            <Alert.Heading>{'Oh no, thats bad'}</Alert.Heading>
            <p>
                There was an error fetching the weather, read below for details:
            </p>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {errorMessage}
            </pre>
        </Alert>
    )
}

ErrorBox.propTypes = {
    errorMessage: PropTypes.string.isRequired,
}
