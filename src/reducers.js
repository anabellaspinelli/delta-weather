export const initialState = {
    status: 'idle',
    temperatures: null,
    locationName: null,
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

        case 'resolved': {
            const { temperatures, locationName } = action
            const { yesterday, today } = temperatures

            if (!today || !yesterday) {
                return {
                    ...state,
                    status: 'errored',
                    error: {
                        message: `Invalid temperature. Today: ${today}, yesterday: ${yesterday}`,
                    },
                }
            }

            return {
                ...state,
                status: 'resolved',
                temperatures: temperatures,
                locationName: locationName,
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
