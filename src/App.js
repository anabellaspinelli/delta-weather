import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import { ReactComponent as Telegram } from './assets/telegram.svg'
import { ReactComponent as Twitter } from './assets/twitter.svg'
import { ErrorBox } from './components/error-box'
import { LocationForm } from './components/location-form'
import { getAllWeathers } from './lib/transport'
import { initialState, temperatureReducer } from './reducers'
import { WeatherBox } from './components/weather-box'
import { sortDays } from './lib/utils'

const FHContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
`

const PageTitle = styled.h1`
    text-align: center;
    font-size: 6rem;
    background-image: -webkit-linear-gradient(#ff0, #c00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 4px 2px rgb(50, 130, 250, 70%);
    font-weight: 700;
    position: relative;
    -webkit-text-stroke: 1.5px #0f9;

    @media (max-width: 768px) {
        font-size: 3.5rem;
    }
`

const Intro = styled.p`
    color: gray;
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
`

const MobileMessage = styled.p`
    margin-top: 20px;
    color: gray;
    font-style: italic;

    @media (min-width: 768px) {
        display: none;
    }
`

const Paragraph = styled.p`
    color: gray;
    margin: 0 auto;
    justify: center;
`

const Share = styled.div`
    margin-bottom: 10px;
`

const ShareIcons = styled.div`
    display: flex;
    margin: 0 auto;
`

const Footer = styled.footer`
    width: 100%;
    text-align: center;
    color: gray;
    margin-top: 24px;
`

const App = () => {
    const [state, dispatch] = React.useReducer(temperatureReducer, initialState)
    const [searchText, setSearchText] = React.useState('')
    const [cleanSearchText, setCleanSearchText] = React.useState('')

    React.useEffect(() => {
        const cleaned = (
            searchText.charAt(0).toUpperCase() + searchText.slice(1)
        ).trim()

        setCleanSearchText(cleaned)
    }, [searchText])

    const handleFormSubmit = async () => {
        dispatch({ type: 'started' })

        const weathers = await getAllWeathers(searchText)
        if (weathers.error) {
            dispatch({ type: 'error', error: weathers.error })
            return
        }

        const days = sortDays(weathers.days).map(day => ({
            datetime: day.datetime,
            temp: day.temp,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
        }))

        dispatch({
            type: 'resolved',
            days,
            locationName: weathers.address,
        })
    }

    return (
        <FHContainer className='App'>
            <div>
                <PageTitle data-text='Hack The Weather'>
                    Hack The Weather
                </PageTitle>
                <Intro>
                    {
                        "This application can be used to query the historical records for temperature on the current date in the past 5 decades. It is meant as a proof of concept on what we can observe when we're provided with data thats closer to our own day-to-day experience, rather than scientific information that often seems distant and hard to relate to."
                    }
                </Intro>
                <LocationForm
                    onSubmit={handleFormSubmit}
                    setLocation={setSearchText}
                    location={searchText}
                />

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
                    <>
                        <WeatherBox
                            days={state.days}
                            locationName={state.locationName}
                        />
                        <MobileMessage>
                            To see graphs about this data ☝🏻 view this page on a
                            computer.
                        </MobileMessage>
                        <section>
                            <h3 style={{ marginTop: '48px' }}>Resources</h3>
                            <Paragraph>
                                Read more about global warming and climate
                                change:
                            </Paragraph>
                            <ul>
                                <li>
                                    <a
                                        href='https://www.bbc.com/news/science-environment-24021772'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        What is climate change? A really simple
                                        guide – BBC
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://climate.nasa.gov/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Global Climate Change – NASA
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://www.nrdc.org/stories/global-warming-101'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Global Warming 101
                                    </a>
                                </li>
                            </ul>
                            <h3 style={{ marginTop: '48px' }}>
                                Acknowledgments
                            </h3>
                            <Paragraph>
                                This app was built using data from the{' '}
                                <a
                                    href='https://www.visualcrossing.com/weather-data'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Visual Crossing Weather API
                                </a>{' '}
                                which was incredibly helpful and easy to use.
                                The free plan is enough for any experiment or
                                personal project.
                            </Paragraph>
                        </section>
                        <section>
                            <Share>
                                <h3 style={{ marginTop: '48px' }}>
                                    Share this page
                                </h3>
                                <ShareIcons>
                                    <a
                                        href={`https://t.me/share/url?url=${encodeURIComponent(
                                            window.location,
                                        )}&text=${encodeURIComponent(
                                            `I just saw the temperature for this day at ${cleanSearchText} on the past 5 decades with Hack The Weather! Try it yourself!`,
                                        )}`}
                                    >
                                        <Telegram
                                            width={30}
                                            height={30}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                            `I just saw the temperature for this day at ${cleanSearchText} on the past 5 decades with Hack The Weather! Try it yourself!`,
                                        )}&url=${encodeURIComponent(
                                            window.location,
                                        )}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        style={{ marginLeft: '10px' }}
                                    >
                                        <Twitter width={30} height={30} />
                                    </a>
                                </ShareIcons>
                            </Share>
                        </section>
                    </>
                )}
            </div>

            <Footer>
                <div>Built with ❤️ in Cornellà & Barcelona</div>
            </Footer>
        </FHContainer>
    )
}

export default App
