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

const createDateArray = (givenDate) => {
    console.log(givenDate)
    const array = givenDate.split('-')
    return array
}


const dateFormat = (givenDate) => {
    //yyyy-dd-mm
    const dateArray = createDateArray(givenDate)
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]
    const monthText = monthNames[month - 1].substring(0,3);
    return `${day} ${monthText} ${year}`
}

export default dateFormat