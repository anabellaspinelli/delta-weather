import { render } from '@testing-library/react'
import React from 'react'
import { Delta } from './delta'

test('renders a positive delta', async () => {
    const deltaProps = {
        temperatures: {
            today: 4,
            yesterday: 2,
        },
    }

    const { getByText } = render(<Delta {...deltaProps} />)

    expect(getByText(/2ºC above yesterday's/))
})

test('renders a negative delta', async () => {
    const deltaProps = {
        temperatures: {
            today: 2,
            yesterday: 4,
        },
    }

    const { getByText } = render(<Delta {...deltaProps} />)

    expect(getByText(/2ºC below yesterday's/))
})

test('renders an insignificant delta', async () => {
    const deltaProps = {
        temperatures: {
            today: 2,
            yesterday: 2.2,
        },
    }

    const { getByText } = render(<Delta {...deltaProps} />)

    expect(getByText(/mostly the same as yesterday/))
})
