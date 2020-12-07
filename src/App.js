import React, { useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ErrorBox } from './components/error-box'
import { WeatherBox } from './components/weather-box'
import { getAllWeathers } from './lib/transport'
import { temperatureReducer, initialState } from './reducer'

const App = () => {
    const [location, setLocation] = useState('')
    const [state, dispatch] = React.useReducer(temperatureReducer, initialState)

    const handleSubmit = async event => {
        event.preventDefault()

        dispatch({ type: 'started' })
        const weathers = await getAllWeathers(location)
        if (weathers.error) {
            dispatch({ type: 'error', error: weathers.error })
            return
        }

        dispatch({
            type: 'success',
            temperatures: {
                yesterday: weathers.yesterday.location.values[0].temp,
                today: weathers.today.location.values[0].temp,
            },
        })
    }

    return (
        <Container className='App justify-content-xs-center'>
            <h1>Yesterday Once More Weather</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formLocation'>
                    <Form.Control
                        type='text'
                        placeholder='Try "Barcelona" or "Buenos Aires"...'
                        size='lg'
                        aria-label='location input'
                        onChange={event => setLocation(event.target.value)}
                        value={location}
                    />
                </Form.Group>
                <Button
                    size='lg'
                    variant='primary'
                    type='submit'
                    aria-label='get weather'
                    onClick={handleSubmit}
                >
                    Get weather!
                </Button>
            </Form>

            {state.status === 'errored' && (
                <ErrorBox errorMessage={state.error.message} />
            )}

            {state.status === 'pending' && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading the weather...</span>
                </Spinner>
            )}

            {state.status === 'resolved' && (
                <WeatherBox temperatures={state.temperatures} />
            )}
        </Container>
    )
}

export default App
