import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { act } from 'react-dom/test-utils'
import App from './App'
import { getAllWeathers } from './lib/transport'

jest.mock('./lib/transport')

test('renders the title', () => {
    const { getByText } = render(<App />)

    const title = getByText((content, node) => {
        const hasText = node => node.textContent === 'HistoWeather'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child),
        )

        return nodeHasText && childrenDontHaveText
    })

    expect(title).toBeInTheDocument()
})

test('shows the temperature result in the given location', async () => {
    getAllWeathers.mockResolvedValue({
        address: 'La Plata',
        days: [
            { datetime: '2021-02-21', temp: 10 },
            { datetime: '2011-02-21', temp: 11 },
            { datetime: '2001-02-21', temp: 12 },
            { datetime: '1991-02-21', temp: 13 },
            { datetime: '1981-02-21', temp: 14 },
            { datetime: '1973-02-21', temp: 15 },
        ],
    })

    const { getByText, getByPlaceholderText } = render(<App />)
    const searchInput = getByPlaceholderText(/Try "Barcelona" or "Berlin".../)
    userEvent.type(searchInput, 'la plata', { skipClick: true })

    await act(async () => {
        fireEvent.submit(searchInput)
    })

    expect(getByText('10 ºC'))
    expect(getByText('11 ºC'))
    expect(getByText('12 ºC'))
    expect(getByText('13 ºC'))
    expect(getByText('14 ºC'))
    expect(getByText('15 ºC'))
})

test('shows a pending state while searching', async () => {
    getAllWeathers.mockImplementation(() => new Promise(() => {}))

    const { getByRole, getByPlaceholderText } = render(<App />)
    const searchInput = getByPlaceholderText(/Try "Barcelona" or "Berlin".../)
    userEvent.type(searchInput, 'la plata', { skipClick: true })

    await act(async () => {
        fireEvent.submit(searchInput)
    })

    expect(getByRole('status')).toHaveTextContent('Loading the weather...')
})

test('shows an error if the call failed', async () => {
    getAllWeathers.mockImplementation(
        () =>
            new Promise(resolve =>
                resolve({ error: new Error('oops an error') }),
            ),
    )

    const { getByText, getByPlaceholderText } = render(<App />)
    const searchInput = getByPlaceholderText(/Try "Barcelona" or "Berlin".../)
    userEvent.type(searchInput, 'la plata', { skipClick: true })

    await act(async () => {
        fireEvent.submit(searchInput)
    })

    expect(
        getByText(
            'There was an error fetching the weather, read below for details:',
        ),
    )

    expect(getByText('oops an error'))
})
