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
  
  
  function returnVisualDate(date) {
    const givenDate = new Date(date)
    const day = givenDate.getDate();
    const month = monthNames[givenDate.getMonth()].substring(0,3);
    const year = givenDate.getFullYear();
    const visualDate = `${day} ${month} ${year}`
    return visualDate
  }
  
export default returnVisualDate
  