import { writable } from 'svelte/store'
import dateFormat from '../helpers/dateFormat.js'

const selectedDate = writable()

const customSelectedDate = {
    subscribe: selectedDate.subscribe,
    nullify: () => {
        selectedDate.set('')
    },
    visualiseDate: (date) => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const dateArray = date.split('/')
        const dateDay = dateArray[0]
        const dateMonth = dateArray[1] - 1
        const dateYear = dateArray[2]

        const selectedDate = new Date(dateYear, dateMonth, dateDay)


        const day = selectedDate.getDate();
        const month = monthNames[selectedDate.getMonth()].substring(0, 3);
        const year = selectedDate.getFullYear();
        const visualDate = `${day} ${month} ${year}`
        return visualDate

    },
    updateSelectedDate: (date) => {
        selectedDate.set(customSelectedDate.visualiseDate(date))
    }
}

function convertDateToString(date){
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let day = date.getDate()
    let month = monthNames[date.getMonth()].substring(0,3)
    let year = date.getFullYear()
    return `${day} ${month} ${year}`
}

selectedDate.set(convertDateToString(new Date()))

export default customSelectedDate