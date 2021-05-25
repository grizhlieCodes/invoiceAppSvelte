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

        const day = date.getDate();
        const month = monthNames[date.getMonth()].substring(0, 3);
        const year = date.getFullYear();
        const visualDate = `${day} ${month} ${year}`
        return visualDate

    },
    updateSelectedDate: (date) => {
        selectedDate.set(date)
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

// selectedDate.set(convertDateToString(new Date()))

export default customSelectedDate