export const getDelta = (yesterdayTemp, todayTemp) => {
    return Math.trunc(todayTemp - yesterdayTemp)
}

export const getHue = days => {
    const hasNegativeTemps = days.find(day => day.temp < 0)
    const hasPositiveTemps = days.find(day => day.temp > 0)

    if (hasNegativeTemps && hasPositiveTemps) {
        return 100
    }

    if (hasPositiveTemps) {
        return 360
    }

    return 200
}

export const sortDays = days => {
    return days.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
}
