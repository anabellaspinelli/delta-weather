import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Bar, Line } from 'react-chartjs-2'

import { ReactComponent as Telegram } from './assets/telegram.svg'
import { ReactComponent as Twitter } from './assets/twitter.svg'

const NEGATIVE_TEMP_BG_COLOR = 'rgba(0, 220, 220, 0.15)'
const NEGATIVE_TEMP_BORDER_COLOR = 'rgba(0, 220, 220, 0.9)'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import { getHue, getBarChartData, getChartOptions } from '../lib/utils'

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

const ShareIcons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    width: 100px;
    margin-bottom: 20px;
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

const ChartContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: auto;
    margin-top: 80px;
    height: 250px;
    width: 450px;

    @media (max-width: 768px) {
        display: none;
    }
`

const BarChart = styled(Bar)`
    height: 250px;
`

const LineChart = styled(Line)`
    height: 250px;
`

const ChartLegends = styled.div`
    display: flex;
    padding: 0 100px;
    font-size: 13px;
    font-weight: bold;
    color: #666;
`

const Legend = styled.div`
    width: 50%;
`

const MinTemp = styled.strong`
    color: ${({ hasNegativeTemps }) => {
        return hasNegativeTemps ? 'rgba(30, 144, 255, 0.7)' : '#ec9f0f'
    }};
`

const MaxTemp = styled.strong`
    color: ${({ hasNegativeTemps }) => {
        return hasNegativeTemps ? NEGATIVE_TEMP_BORDER_COLOR : '#d22500'
    }};
`

export const WeatherBox = ({ days, locationName, searchText }) => {
    const hasNegativeTemps = React.useMemo(
        () => days.find(day => day.temp < 0),
        [days],
    )
    const hasPositiveTemps = React.useMemo(
        () => days.find(day => day.temp > 0),
        [days],
    )

    const prettySearchText = React.useMemo(
        () => (searchText.charAt(0).toUpperCase() + searchText.slice(1)).trim(),
        [searchText],
    )

    return (
        <WeatherContainer hue={getHue(hasNegativeTemps, hasPositiveTemps)}>
            <WeatherTitle>
                The temperature on this day in <br />
                <strong>{locationName}</strong> was
            </WeatherTitle>
            <div>Share these results</div>
            <ShareIcons>
                <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                        window.location,
                    )}&text=${encodeURIComponent(
                        `I just saw what the temperature was on this day in ${prettySearchText} in the past 5 decades with Hack The Weather! Try it yourself! ➡️`,
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Telegram
                        width={18}
                        height={18}
                        target='_blank'
                        rel='noopener noreferrer'
                    />
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `I just saw what the temperature was on this day in ${prettySearchText} in the past 5 decades with Hack The Weather! Try it yourself! ➡️`,
                    )}&url=${encodeURIComponent(window.location)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Twitter width={18} height={18} />
                </a>
            </ShareIcons>
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
                                <Temperature>
                                    {day.temp !== null
                                        ? `${day.temp} ºC`
                                        : 'No data'}
                                </Temperature>
                                <MinMaxWrapper>
                                    <MinMax>
                                        {`Max ${
                                            day.tempmax !== null
                                                ? day.tempmax + 'ºC'
                                                : 'No data'
                                        }`}
                                    </MinMax>
                                    <MinMax>
                                        {`Min ${
                                            day.tempmin !== null
                                                ? day.tempmin + 'ºC'
                                                : 'No data'
                                        }`}
                                    </MinMax>
                                </MinMaxWrapper>
                            </Day>
                        </Tippy>
                    ) : (
                        <Day key={day.datetime} temp={day.temp}>
                            <Year>{new Date(day.datetime).getFullYear()}</Year>
                            <Temperature>
                                {day.temp !== null
                                    ? `${day.temp} ºC`
                                    : 'No data'}
                            </Temperature>
                            <MinMaxWrapper>
                                <MinMax>
                                    {`Max ${
                                        day.tempmax !== null
                                            ? day.tempmax + 'ºC'
                                            : 'No data'
                                    }`}
                                </MinMax>
                                <MinMax>
                                    {`Min ${
                                        day.tempmin !== null
                                            ? day.tempmin + 'ºC'
                                            : 'No data'
                                    }`}
                                </MinMax>
                            </MinMaxWrapper>
                        </Day>
                    ),
                )}
            </DaysSection>

            <ChartContainer>
                <BarChart
                    options={getChartOptions({
                        legend: { display: false },
                    })}
                    data={getBarChartData(days)}
                />
                <LineChart
                    data={{
                        labels: days.map(d =>
                            new Date(d.datetime).getFullYear(),
                        ),
                        datasets: [
                            {
                                data: days.map(d => d.tempmax),
                                label: 'maxtemp',
                                fill: 1,
                                borderColor: hasNegativeTemps
                                    ? NEGATIVE_TEMP_BORDER_COLOR
                                    : '#d22500',
                                backgroundColor: hasNegativeTemps
                                    ? NEGATIVE_TEMP_BG_COLOR
                                    : 'rgba( 226, 111, 45, 0.3)',
                            },
                            {
                                data: days.map(d => d.tempmin),
                                fill: false,
                                label: 'mintemp',
                                borderColor: hasNegativeTemps
                                    ? 'rgba(30, 144, 255, 0.7)'
                                    : '#ec9f0f',
                            },
                        ],
                        tooltips: {
                            xPadding: 10,
                            yPadding: 10,
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `${tooltipItem.value}°C`
                                },
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        fontStyle: 'bold',
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        fontStyle: 'bold',
                                        callback: function (value) {
                                            return `${value} °C`
                                        },
                                    },
                                },
                            ],
                        },
                    }}
                    options={getChartOptions({ legend: { display: false } })}
                />
            </ChartContainer>

            <ChartLegends>
                <Legend>Average Temperature for this day, per year</Legend>

                <Legend style={{ paddingLeft: '50px' }}>
                    <MinTemp hasNegativeTemps={hasNegativeTemps}>Min</MinTemp>{' '}
                    and{' '}
                    <MaxTemp hasNegativeTemps={hasNegativeTemps}>Max</MaxTemp>{' '}
                    temperatures per year
                </Legend>
            </ChartLegends>
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
    locationName: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
}
