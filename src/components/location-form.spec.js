import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { LocationForm } from './location-form'

test('renders the location form', async () => {
    const locationFormProps = {
        onSubmit: jest.fn(),
    }

    const { container } = render(<LocationForm {...locationFormProps} />)

    expect(container).toMatchInlineSnapshot(`
        <div>
          <form
            class=""
            role="search"
            style="margin-top: 32px;"
          >
            <div
              class="justify-content-md-center row"
            >
              <div
                class="col-md-6 col-8 offset-md-2"
              >
                <input
                  aria-label="location input"
                  class="form-control form-control-lg"
                  placeholder="Try \\"Barcelona\\" or \\"Berlin\\"..."
                  type="text"
                  value=""
                />
              </div>
              <div
                class="col"
              >
                <button
                  aria-label="get weather"
                  class="btn btn-dark btn-lg"
                  type="submit"
                >
                  Get weather!
                </button>
              </div>
            </div>
          </form>
        </div>
    `)
})

test('searches for the location when submitted', async () => {
    const locationFormProps = {
        onSubmit: jest.fn(),
    }

    const { getByPlaceholderText } = render(
        <LocationForm {...locationFormProps} />,
    )

    expect(locationFormProps.onSubmit).not.toHaveBeenCalled()

    const searchInput = getByPlaceholderText(/Try "Barcelona" or "Berlin".../)

    userEvent.type(searchInput, 'la plata', { skipClick: true })
    fireEvent.submit(searchInput)

    expect(locationFormProps.onSubmit).toHaveBeenCalledTimes(1)
    expect(locationFormProps.onSubmit).toHaveBeenCalledWith('la plata')
})
