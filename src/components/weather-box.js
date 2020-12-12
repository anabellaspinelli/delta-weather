import PropTypes from 'prop-types'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
    background-color: aliceblue;
    height: 500px;
    padding: 32px;
    margin-top: 16px;
    text-align: center;
    border-radius: 8px;
`

export const WeatherBox = ({ temperatures }) => {
    return (
        <StyledContainer>
            <Row className='justify-content-xs-center'>
                <Col xs={6}>
                    <h3>Yesterdays Weather</h3>
                    <h4>{`Temperature ${temperatures.yesterday} Cº`}</h4>
                </Col>
                <Col xs={6}>
                    <h3>Todays Weather</h3>
                    <h4>{`Temperature ${temperatures.today} Cº`}</h4>
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
