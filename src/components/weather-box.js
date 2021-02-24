import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import { getHue } from '../lib/utils'

const WeatherContainer = styled.div`
    text-align: center;
    margin-top: 32px;
    border-radius: 16px;
    padding: 16px 0 32px 0;
    background: linear-gradient(
        20deg,
        hsl(${props => props.hue}, 60%, 80%, 0.5),
        hsl(${props => props.hue - 305}, 64%, 80%, 0.5)
    );

    @media (max-width: 768px) {
        margin-top: 16px;
        padding: 0 16px 32px; 16px;
    }
`

const DaysSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    @media (max-width: 768px) {
        justify-content: space-around;
    }
`

const WeatherTitle = styled.p`
    font-size: 2rem;
    padding-top: 32px;
`

const Day = styled.div`
    border: 3px solid white;
    border-radius: 15px;
    padding: 12px;
    margin-top: 12px;
    background: rgba(
        ${({ temp }) => {
            const opacity = Math.min(Math.abs(temp / 100), 1)
            const color = temp > 0 ? '255, 0, 0' : '30, 144, 255'

            return `${color}, ${opacity}`
        }}
    );

    @media (max-width: 768px) {
        flex-grow: 1;
        margin: 12px 6px;
    }
`

const Temperature = styled.p`
    font-size: 2rem;
    font-weight: 900;

    ${'' /* @media (max-width: 768px) {
        font-size: 4rem;
    } */}
`

const Year = styled.h3`
    font-size: 1rem;
    font-weight: 500;
`

const MinMaxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MinMax = styled.div`
    font-size: 1rem;
    flex: 1 1 auto;
    font-weight: 300;
    border-radius: 8px;
`

export const WeatherBox = ({ days, locationName }) => {
    return (
        <WeatherContainer hue={getHue(days)}>
            <WeatherTitle>
                The temperature for this day in <br />
                <strong>{locationName}</strong> was
            </WeatherTitle>
            <DaysSection>
                {days.map((day, index) =>
                    index === days.length - 1 ? (
                        <Tippy
                            visible={true}
                            placement='bottom'
                            content='You are here'
                            key={day.datetime}
                        >
                            <Day temp={day.temp}>
                                <Year>
                                    {new Date(day.datetime).getFullYear()}
                                </Year>
                                <Temperature>{`${day.temp} ºC`}</Temperature>
                                <MinMaxWrapper>
                                    <MinMax>{`Min ${day.tempmin} ºC`}</MinMax>
                                    <MinMax>{`Max ${day.tempmax} ºC`}</MinMax>
                                </MinMaxWrapper>
                            </Day>
                        </Tippy>
                    ) : (
                        <Day key={day.datetime} temp={day.temp}>
                            <Year>{new Date(day.datetime).getFullYear()}</Year>
                            <Temperature
                                key={day.datetime}
                            >{`${day.temp} ºC`}</Temperature>
                            <MinMaxWrapper>
                                <MinMax>{`Min ${day.tempmin} ºC`}</MinMax>
                                <MinMax>{`Max ${day.tempmax} ºC`}</MinMax>
                            </MinMaxWrapper>
                        </Day>
                    ),
                )}
            </DaysSection>
        </WeatherContainer>
    )
}

WeatherBox.propTypes = {
    days: PropTypes.arrayOf(
        PropTypes.shape({
            datetime: PropTypes.string,
            tempmax: PropTypes.number,
            tempmin: PropTypes.number,
        }),
    ).isRequired,
    locationName: PropTypes.string,
}
