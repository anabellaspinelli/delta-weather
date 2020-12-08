export const initialState = {
    status: 'idle',
    temperatures: null,
    error: null,
}

export const temperatureReducer = (state, action) => {
    switch (action.type) {
        case 'error': {
            return {
                ...state,
                status: 'errored',
                error: action.error,
            }
        }

        case 'success': {
            return {
                ...state,
                status: 'resolved',
                temperatures: action.temperatures,
            }
        }

        case 'started': {
            return {
                ...initialState,
                status: 'pending',
            }
        }

        default: {
            throw new Error(`Unknown action type: ${action.type}`)
        }
    }
}