import { initialState, temperatureReducer } from './reducers'

describe('temperature reducer', () => {
    test('action type: error', () => {
        const prevState = { ...initialState }
        const theError = new Error('an error')
        const action = {
            type: 'error',
            error: theError,
        }
        const expectedState = {
            locationName: null,
            days: null,
            status: 'errored',
            error: theError,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })

    test('action type: resolved', () => {
        const prevState = { ...initialState }
        const action = {
            type: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            days: [
                { datetime: '1973-02-21', temp: 15 },
                { datetime: '1981-02-21', temp: 14 },
                { datetime: '1991-02-21', temp: 13 },
                { datetime: '2001-02-21', temp: 12 },
                { datetime: '2011-02-21', temp: 11 },
                { datetime: '2021-02-21', temp: 10 },
            ],
        }
        const expectedState = {
            status: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            days: [
                { datetime: '1973-02-21', temp: 15 },
                { datetime: '1981-02-21', temp: 14 },
                { datetime: '1991-02-21', temp: 13 },
                { datetime: '2001-02-21', temp: 12 },
                { datetime: '2011-02-21', temp: 11 },
                { datetime: '2021-02-21', temp: 10 },
            ],
            error: null,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })

    test('action type: started', () => {
        const prevState = { ...initialState }
        const action = {
            type: 'started',
            locationName: 'Buenos Aires, Argentina',
        }
        const expectedState = {
            status: 'pending',
            locationName: null,
            days: null,
            error: null,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })
})
