export const getDelta = (yesterdayTemp, todayTemp) => {
    return Math.trunc(todayTemp - yesterdayTemp)
}

export const getHue = (hasNegativeTemps, hasPositiveTemps) => {
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

export const getBgColor = temp => {
    const opacity = Math.min(Math.abs(temp / 100), 1)
    const color = temp > 0 ? '255, 0, 0' : '30, 144, 255'

    return `rgba(${color}, ${opacity})`
}

export const getBorderColor = temp => {
    const opacity = Math.min(Math.abs(temp / 100), 1)
    const color = temp > 0 ? '255, 0, 0' : '30, 144, 255'

    return `rgba(${color}, ${opacity + 0.4})`
}

export const getBarChartData = days => {
    const data = {
        labels: days.map(d => new Date(d.datetime).getFullYear()),
        datasets: [
            {
                backgroundColor: days.map(d => getBgColor(d.temp)),
                borderColor: days.map(d => getBorderColor(d.temp)),
                hoverBackgroundColor: days.map(d => getBorderColor(d.temp)),
                borderWidth: 1,
                data: days.map(d => d.temp),
            },
        ],
    }

    return data
}

export const getChartOptions = ({ title, legend }) => {
    return {
        title,
        maintainAspectRatio: false,
        legend,
        tooltips: {
            xPadding: 10,
            yPadding: 10,
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.value}°C`
                },
            },
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontStyle: 'bold',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontStyle: 'bold',
                        callback: function (value) {
                            return `${value}°C`
                        },
                    },
                },
            ],
        },
    }
}
