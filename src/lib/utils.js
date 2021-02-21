export const getDelta = (yesterdayTemp, todayTemp) => {
    return Math.trunc(todayTemp - yesterdayTemp)
}

export const getHue = (yesterdayTemp, todayTemp) => {
    const delta = getDelta(yesterdayTemp, todayTemp)

    if (delta === 0) {
        return 100
    }

    return delta > 0 ? 360 : 200
}

export const sortDays = days => {
    return days.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
}
