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
          <div
            style="margin-top: 32px;"
          >
            <form
              class=""
            >
              <div
                class="justify-content-md-center row"
              >
                <div
                  class="col-8"
                  offset="2"
                >
                  <input
                    aria-label="location input"
                    class="form-control form-control-lg"
                    placeholder="Try \\"Barcelona\\" or \\"Buenos Aires\\"..."
                    type="text"
                    value=""
                  />
                </div>
                <div
                  class="col-2"
                >
                  <button
                    aria-label="get weather"
                    class="btn btn-primary btn-lg"
                    type="submit"
                  >
                    Get weather!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    `)
})

test('renders the location form', async () => {
    const locationFormProps = {
        onSubmit: jest.fn(),
    }

    const { getByPlaceholderText } = render(
        <LocationForm {...locationFormProps} />,
    )

    expect(locationFormProps.onSubmit).not.toHaveBeenCalled()

    const searchInput = getByPlaceholderText(
        /Try "Barcelona" or "Buenos Aires".../,
    )

    userEvent.type(searchInput, 'la plata')
    fireEvent.submit(searchInput)

    expect(locationFormProps.onSubmit).toHaveBeenCalledTimes(1)
    expect(locationFormProps.onSubmit).toHaveBeenCalledWith('la plata')
})
