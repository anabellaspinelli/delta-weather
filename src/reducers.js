export const initialState = {
    status: 'idle',
    days: null,
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
            const { days, locationName } = action

            // if ((!today && today !== 0) || (!yesterday && yesterday !== 0)) {
            //     return {
            //         ...state,
            //         status: 'errored',
            //         error: {
            //             message: `Invalid temperature. Today: ${today}, yesterday: ${yesterday}`,
            //         },
            //     }
            // }

            return {
                ...state,
                status: 'resolved',
                days,
                locationName,
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
