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
            const { temperatures } = action
            const { yesterday, today } = temperatures

            if (!today || !yesterday) {
                return {
                    ...state,
                    status: 'errored',
                    error: {
                        message: `Invalid temperature:  ${JSON.stringify(
                            {
                                yesterday,
                                today,
                            },
                            null,
                            4,
                        )}`,
                    },
                }
            }

            return {
                ...state,
                status: 'resolved',
                temperatures: action.temperatures,
                locationName: action.locationName,
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
