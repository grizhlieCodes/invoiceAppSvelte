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
    const day = date.getDate();
    const month = monthNames[date.getMonth()].substring(0,3);
    const year = date.getFullYear();
    const visualDate = `${day} ${month} ${year}`
    return visualDate
  }
  
export default returnVisualDate
  