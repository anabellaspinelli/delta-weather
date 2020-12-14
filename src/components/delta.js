import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DeltaText = styled.p`
    font-size: 4rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`

export const Delta = ({ temperatures }) => {
    const delta = Math.trunc(temperatures.today - temperatures.yesterday)

    if (delta === 0) {
        return <DeltaText>mostly the same as yesterday</DeltaText>
    }

    const deltaText =
        delta > 0 ? "ºC above yesterday's" : "ºC below yesterday's"
    return <DeltaText>{`${Math.abs(delta)}${deltaText}`}</DeltaText>
}

Delta.propTypes = {
    temperatures: PropTypes.shape({
        yesterday: PropTypes.number.isRequired,
        today: PropTypes.number.isRequired,
    }).isRequired,
}
