// {
//     status: 'idle',
//     temperatures: null,
//     locationName: null,
//     error: null,
// }

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
            temperatures: null,
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
            temperatures: {
                today: 24,
                yesterday: 22,
            },
        }
        const expectedState = {
            status: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 24,
                yesterday: 22,
            },
            error: null,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })

    test('action type: resolved, with null values', () => {
        const prevState = { ...initialState }
        const action = {
            type: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 24,
                yesterday: null,
            },
        }
        const expectedState = {
            status: 'errored',
            locationName: null,
            temperatures: null,
            error: {
                message: 'Invalid temperature. Today: 24, yesterday: null',
            },
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })

    test('action type: resolved, with zero today value', () => {
        const prevState = { ...initialState }
        const action = {
            type: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 0,
                yesterday: 24,
            },
        }
        const expectedState = {
            status: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 0,
                yesterday: 24,
            },
            error: null,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })

    test('action type: resolved, with zero yesterday value', () => {
        const prevState = { ...initialState }
        const action = {
            type: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 12,
                yesterday: 0,
            },
        }
        const expectedState = {
            status: 'resolved',
            locationName: 'Buenos Aires, Argentina',
            temperatures: {
                today: 12,
                yesterday: 0,
            },
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
            temperatures: null,
            error: null,
        }

        expect(temperatureReducer(prevState, action)).toEqual(expectedState)
    })
})
