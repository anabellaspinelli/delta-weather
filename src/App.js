import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { ErrorBox } from './components/error-box'
import { WeatherBox } from './components/weather-box'
import { LocationForm } from './components/location-form'
import './index.css'
import { getAllWeathers } from './lib/transport'
import { initialState, temperatureReducer } from './reducers'

const WeatherTitle = styled.p`
    font-size: 20pt;
    text-align: center;
    padding: 32px 0;
`

const App = () => {
    const [state, dispatch] = React.useReducer(temperatureReducer, initialState)
    const handleSubmit = async location => {
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
            locationName: weathers.today.location.name,
        })
    }

    return (
        <Container className='App'>
            <h1 style={{ textAlign: 'center', fontSize: '60pt' }}>
                More or Less Weather
            </h1>
            <LocationForm onSubmit={handleSubmit} />

            {state.status === 'errored' && (
                <ErrorBox errorMessage={state.error.message} />
            )}

            {state.status === 'pending' && (
                <div className='d-flex justify-content-center m-5'>
                    <Spinner animation='border' role='status' variant='primary'>
                        <span className='sr-only'>Loading the weather...</span>
                    </Spinner>
                </div>
            )}

            {state.status === 'resolved' && (
                <>
                    <WeatherTitle>
                        The temperature for{' '}
                        <strong>{state.locationName}</strong> is
                    </WeatherTitle>
                    <WeatherBox temperatures={state.temperatures} />
                </>
            )}
        </Container>
    )
}

export default App
