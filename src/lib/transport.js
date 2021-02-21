const DELTA_WEATHER_PROXY_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://delta-weather-proxy.herokuapp.com'

const getWeather = async location => {
    const url = new URL(`${DELTA_WEATHER_PROXY_BASE_URL}/weather`)
    const params = {
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
        const response = await getWeather(location)

        if (response.errorCode) {
            return { error: response }
        }

        return response
    } catch (error) {
        return { error }
    }
}
