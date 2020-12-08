import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { ErrorBox } from './components/error-box'
import { WeatherBox } from './components/weather-box'
import { WeatherForm } from './components/weather-form'
import './index.css'
import { getAllWeathers } from './lib/transport'
import { initialState, temperatureReducer } from './reducer'

const App = () => {
    const [state, dispatch] = React.useReducer(temperatureReducer, initialState)
    const handleSubmit = async (event, location) => {
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
        <Container className='App'>
            <h1 style={{ textAlign: 'center', fontSize: '60pt' }}>
                More or Less Weather
            </h1>
            <WeatherForm onSubmit={handleSubmit} />

            {state.status === 'errored' && (
                <ErrorBox errorMessage={state.error.message} />
            )}

            {state.status === 'pending' && (
                <div style={{ margin: '0 auto' }}>
                    <Spinner animation='border' role='status'>
                        <span className='sr-only'>Loading the weather...</span>
                    </Spinner>
                </div>
            )}

            {state.status === 'resolved' && (
                <WeatherBox temperatures={state.temperatures} />
            )}
        </Container>
    )
}

export default App
