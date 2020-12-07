const WEATHER_API_URL =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata'

const getWeather = async (location, period = 'today') => {
    const url = new URL(`${WEATHER_API_URL}/history`)
    const params = {
        aggregateHours: 24,
        locationMode: 'single',
        period,
        contentType: 'json',
        unitGroup: 'metric',
        // eslint-disable-next-line no-undef
        key: process.env.REACT_APP_WEATHER_API_KEY,
        locations: location,
    }

    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url)
    const body = await response.json()
    return body
}

export const getAllWeathers = async location => {
    try {
        const yesterday = await getWeather(location, 'yesterday')
        const today = await getWeather(location, 'today')

        if (yesterday.errorCode) {
            return { error: yesterday }
        }

        if (today.errorCode) {
            return { error: today }
        }

        return { yesterday, today }
    } catch (error) {
        return { error }
    }
}
