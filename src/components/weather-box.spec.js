import { render } from '@testing-library/react'
import React from 'react'
import { WeatherBox } from './weather-box'

test('loads and displays greeting', async () => {
    const weatherBoxProps = {
        temperatures: {
            today: 24,
            yesterday: 22,
        },
    }

    const { container } = render(<WeatherBox {...weatherBoxProps} />)

    expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="sc-bdfBwQ fpWbVe container"
          >
            <div
              class="justify-content-xs-center row"
            >
              <div
                class="col-6"
              >
                <h3>
                  Yesterdays Weather
                </h3>
                <h4>
                  Temperature 22 Cº
                </h4>
              </div>
              <div
                class="col-6"
              >
                <h3>
                  Todays Weather
                </h3>
                <h4>
                  Temperature 24 Cº
                </h4>
              </div>
            </div>
          </div>
        </div>
    `)
})
