import { render } from '@testing-library/react'
import React from 'react'
import { ErrorBox } from './error-box'

test('renders the error box', async () => {
    const errorBoxProps = {
        errorMessage: 'Ooops testing error',
    }

    const { container } = render(<ErrorBox {...errorBoxProps} />)

    expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="fade alert alert-danger show"
            role="alert"
            style="margin-top: 16px;"
          >
            <div
              class="alert-heading h4"
            >
              Oh no, thats bad
            </div>
            <p>
              There was an error fetching the weather, read below for details:
            </p>
            <pre
              style="white-space: pre-wrap;"
            >
              Ooops testing error
            </pre>
          </div>
        </div>
    `)
})
