import PropTypes from 'prop-types'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
    background-color: aliceblue;
    height: 100px;
    padding: 16px;
    margin-top: 16px;
`

export const WeatherBox = ({ temperatures }) => {
    return (
        <StyledContainer
            style={{ backgroundColor: 'aliceblue', height: '100px' }}
        >
            <Row>
                <Col xs={6}>
                    <h2>Yesterdays Weather</h2>
                    <h3>{`Temperature ${temperatures.yesterday} Cº`}</h3>
                </Col>
                <Col xs={6}>
                    <h2>Todays Weather</h2>
                    <h3>{`Temperature ${temperatures.today} Cº`}</h3>
                </Col>
            </Row>
        </StyledContainer>
    )
}

WeatherBox.propTypes = {
    temperatures: PropTypes.shape({
        yesterday: PropTypes.number.isRequired,
        today: PropTypes.number.isRequired,
    }).isRequired,
}
