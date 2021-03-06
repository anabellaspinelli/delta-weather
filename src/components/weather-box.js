import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { getHue } from '../lib/utils'
import { Delta } from './delta'

const WeatherTitle = styled.p`
    font-size: 2rem;
    padding-top: 32px;
`

const Temperature = styled.p`
    font-size: 6rem;
    font-weight: 900;

    @media (max-width: 768px) {
        font-size: 5rem;
    }
`

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

export const WeatherBox = ({ temperatures, locationName }) => {
    return (
        <WeatherContainer
            hue={getHue(temperatures.yesterday, temperatures.today)}
        >
            <WeatherTitle>
                The temperature for <strong>{locationName}</strong> is
            </WeatherTitle>
            <Temperature>{`${temperatures.today} ºC`}</Temperature>
            <Delta temperatures={temperatures} />
        </WeatherContainer>
    )
}

WeatherBox.propTypes = {
    temperatures: PropTypes.shape({
        yesterday: PropTypes.number.isRequired,
        today: PropTypes.number.isRequired,
    }).isRequired,
    locationName: PropTypes.string,
}
