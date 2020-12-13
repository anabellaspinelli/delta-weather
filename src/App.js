import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { ErrorBox } from './components/error-box'
import { LocationForm } from './components/location-form'
import { getAllWeathers } from './lib/transport'
import { initialState, temperatureReducer } from './reducers'
import { Delta } from './components/delta'
import { getHue } from './lib/utils'

const WeatherBox = styled.div`
    text-align: center;
    margin-top: 32px;
    border-radius: 16px;
    padding: 16px 0 32px 0;
    background: linear-gradient(
        20deg,
        hsl(${props => props.hue}, 60%, 65%, 0.5),
        hsl(${props => props.hue - 305}, 64%, 60%, 0.5)
    );
`

const WeatherTitle = styled.p`
    font-size: 20pt;
    padding-top: 32px;
`

const Temperature = styled.h2`
    font-size: 60pt;
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
                <strong>Delta</strong>Weather
            </h1>
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
                    hue={getHue(
                        state.temperatures.yesterday,
                        state.temperatures.today,
                    )}
                >
                    <WeatherTitle>
                        The temperature for{' '}
                        <strong>{state.locationName}</strong> is
                    </WeatherTitle>
                    <Temperature>{`${state.temperatures.today} ºC`}</Temperature>
                    <Delta temperatures={state.temperatures} />
                </WeatherBox>
            )}
        </Container>
    )
}

export default App
