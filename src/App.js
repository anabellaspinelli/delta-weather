import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { ErrorBox } from './components/error-box'
import { LocationForm } from './components/location-form'
import { getAllWeathers } from './lib/transport'
import { initialState, temperatureReducer } from './reducers'
import { WeatherBox } from './components/weather-box'

const PageTitle = styled.h1`
    text-align: center;
    font-size: 6rem;
    @media (max-width: 768px) {
        font-size: 3.5rem;
    }
`

const App = () => {
    const [state, dispatch] = React.useReducer(temperatureReducer, initialState)

    const handleFormSubmit = async location => {
        dispatch({ type: 'started' })
        const weathers = await getAllWeathers(location)
        if (weathers.error) {
            dispatch({ type: 'error', error: weathers.error })
            return
        }

        const temperatures = weathers.days.map(day => ({
            datetime: day.datetime,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
        }))

        dispatch({
            type: 'resolved',
            temperatures,
            locationName: weathers.resolvedAddress,
        })
    }

    return (
        <Container className='App'>
            <PageTitle>
                <strong>Delta</strong>Weather
            </PageTitle>
            <LocationForm onSubmit={handleFormSubmit} />

            {state.status === 'errored' && (
                <ErrorBox errorMessage={state.error.message} />
            )}

            {state.status === 'pending' && (
                <div className='d-flex justify-content-center m-5'>
                    <Spinner
                        animation='border'
                        role='status'
                        variant='primary'
                        aria-live='polite'
                    >
                        <span className='sr-only' name='loading'>
                            Loading the weather...
                        </span>
                    </Spinner>
                </div>
            )}

            {state.status === 'resolved' && (
                <WeatherBox
                    temperatures={state.temperatures}
                    locationName={state.locationName}
                />
            )}
        </Container>
    )
}

export default App
