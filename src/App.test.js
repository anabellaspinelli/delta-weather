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
        const hasText = node => node.textContent === 'DeltaWeather'
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
        yesterday: { location: { values: [{ temp: 10 }] } },
        today: { location: { values: [{ temp: 15 }] } },
    })

    const { getByText, getByPlaceholderText } = render(<App />)
    const searchInput = getByPlaceholderText(/Try "Barcelona" or "Berlin".../)
    userEvent.type(searchInput, 'la plata', { skipClick: true })

    await act(async () => {
        fireEvent.submit(searchInput)
    })

    expect(getByText("5ºC above yesterday's"))
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
