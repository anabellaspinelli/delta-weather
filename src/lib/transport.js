const DELTA_WEATHER_PROXY_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://delta-weather-proxy.herokuapp.com'

const getWeather = async (location, period = 'today') => {
    const url = new URL(`${DELTA_WEATHER_PROXY_BASE_URL}/weather`)
    const params = {
        period,
        location,
    }

    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url)
    const body = await response.json()

    if (process.env.NODE_ENV === 'development') {
        console.log({ body })
    }

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
