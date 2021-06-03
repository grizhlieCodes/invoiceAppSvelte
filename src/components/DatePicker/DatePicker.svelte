<script>
  import { onMount } from 'svelte'
  import pickedDate from '../../stores/pickedDate.js'

  let backwards,
    monthYearEl,
    directionButtonPressed,
    changingYear,
    dateInput,
    form,
    logStuff

  //dateInput doesnt exist. We need to link this to button and then transform date with function
  let cal

  const goBack = () => {
    backwards = true
    directionButtonPressed = true
    traverseMonth()
    backwards = null
    directionButtonPressed = null
  }

  const goForward = () => {
    directionButtonPressed = true
    backwards = false
    traverseMonth()
    backwards = null
    directionButtonPressed = null
  }

  function setMonthYear() {
    let year = dateYear
    let month = monthName.substring(0, 3)
    monthYearEl = `${month} ${year}`
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const weekDayNames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  //                       0   1   2   3   4   5   6   7   8   9   10  11
  const totalDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let mainDate = new Date() //today
  let dateYear = mainDate.getFullYear() //2021
  let monthIndex = mainDate.getMonth() //04
  let monthName = monthNames[monthIndex] //May
  let originalDayIndex = mainDate.getDay() - 1 //monday = 0 => sunday = 0, monday = 1
  let dayIndex = originalDayIndex == -1 ? 6 : NaN //Sunday = 0 - 1 = broken -1, 6
  let dayName = weekDayNames[dayIndex] //Monday
  let origFirstDayIndexOfMonth =
    new Date(mainDate.getFullYear(), mainDate.getMonth(), 1).getDay() - 1 //5
  let firstDayIndexOfMonth =
    origFirstDayIndexOfMonth === -1 ? 6 : origFirstDayIndexOfMonth //5
  let firstDayName = weekDayNames[firstDayIndexOfMonth] //Saturday
  let selectedDayNumber = null
  let selectedDayMonth = null
  let selectedDayElement = null

  function updateDate(direction, newDate) {
    checkIfOtherYear()
    if (direction && (newDate === undefined || newDate === null)) {
      if (!changingYear) {
        monthIndex = monthIndex + direction
        mainDate = new Date(dateYear, monthIndex, 1)
      }
      monthName = monthNames[monthIndex]
      originalDayIndex = mainDate.getDay() - 1
      dayIndex = originalDayIndex == -1 ? 6 : NaN
      dayName = weekDayNames[dayIndex]
      origFirstDayIndexOfMonth =
        new Date(mainDate.getFullYear(), mainDate.getMonth(), 1).getDay() - 1
      firstDayIndexOfMonth =
        origFirstDayIndexOfMonth === -1 ? 6 : origFirstDayIndexOfMonth
      firstDayName = weekDayNames[firstDayIndexOfMonth]
      changingYear = false
    } else if (newDate) {
      monthIndex = newDate.getMonth()
      dateYear = newDate.getFullYear()
      mainDate = new Date(dateYear, monthIndex, 1)
      monthName = monthNames[monthIndex]
      originalDayIndex = mainDate.getDay() - 1
      dayIndex = originalDayIndex == -1 ? 6 : NaN
      dayName = weekDayNames[dayIndex]
      origFirstDayIndexOfMonth =
        new Date(mainDate.getFullYear(), mainDate.getMonth(), 1).getDay() - 1
      firstDayIndexOfMonth =
        origFirstDayIndexOfMonth === -1 ? 6 : origFirstDayIndexOfMonth
      firstDayName = weekDayNames[firstDayIndexOfMonth]
      changingYear = false
    }
  }

  function checkIfOtherYear() {
    if (directionButtonPressed) {
      if (monthIndex === 11 && backwards === false) {
        changingYear = true
        dateYear = dateYear + 1
        monthIndex = 0
        mainDate = new Date(dateYear, monthIndex, 1)
      } else if (monthIndex === 0 && backwards === true) {
        changingYear = true
        dateYear = dateYear - 1
        monthIndex = 11
        mainDate = new Date(dateYear, monthIndex, 1)
      } else {
        // console.log("checkIfOtherYear has an unconsidered scenario");
      }
    }
  }

  function traverseMonth() {
    if (backwards) {
      updateDate(-1)
      renderCalDays()
    } else if (!backwards) {
      updateDate(1)
      renderCalDays()
    }
  }

  function renderCalDays() {
    cal.innerHTML = ''
    setMonthYear()

    let prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1
    let totalDaysPrevMonth = totalDayInMonth[prevMonthIndex]
    let totalDaysToLoop = totalDaysPrevMonth - firstDayIndexOfMonth //31 - 6 = 25

    //RenderPreviousMonthDays
    for (let i = totalDaysPrevMonth; i > totalDaysToLoop; i--) {
      //31 days, decrement by 1 until you hit 26.
      let day = document.createElement('p')
      day.classList.add('prev-month')
      day.textContent = i
      cal.prepend(day)
    }

    //renderCurrentMonthDays
    for (let i = 1; i <= totalDayInMonth[monthIndex]; i++) {
      let day = document.createElement('p')
      day.classList.add('cur-month')
      day.textContent = i
      if (i == selectedDayNumber && selectedDayMonth == monthIndex) {
        //10, 04
        selectedDayElement = day
        day.classList.add('selected')
      }
      cal.append(day)
    }

    //renderNextMonthDays
    let lastDayOfMonth = new Date(
      mainDate.getFullYear(),
      mainDate.getMonth() + 1,
      0,
    ).getDay() //1
    let totalDaysToLoopFront = 7 - lastDayOfMonth

    for (let i = 1; i <= totalDaysToLoopFront; i++) {
      let day = document.createElement('p')
      day.classList.add('next-month')
      day.textContent = i
      cal.append(day)
    }
  }

  window.addEventListener("click", (e) => {
  //remove class from previous selection
  //add targetEl as a global variable
  //add class to it for styling (selection)
  let targetEl = e.target.closest("p");
  if (targetEl && targetEl.classList.contains("cur-month")) {
    let targetElIsCurrentMonth = targetEl.classList.contains("cur-month");

    if (targetElIsCurrentMonth) {
      let currentMonthDay = parseInt(targetEl.textContent, 10);
      selectedDayMonth = mainDate.getMonth();
      selectedDayNumber = currentMonthDay;
      renderCalDays();
      let dateInputValue = new Date(
        mainDate.getFullYear(),
        mainDate.getMonth(),
        currentMonthDay
      );
      let newDate = `${currentMonthDay}/${
        dateInputValue.getMonth() + 1
      }/${dateInputValue.getFullYear()}`;

      pickedDate.updateSelectedDate(newDate)
    } else {
      console.log("DatePicker, unexpected scenario, panik!!!!!");
    }
  }
});

  onMount(async () => {
    cal = document.querySelector('.cal')
    renderCalDays()
  })
</script>

<style lang="scss">
  .calendar {
    margin-top: 1rem;
    background: v(datePicker-bg);
    width: 240px;
    height: 270px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 15px 15px 1fr;
    row-gap: 20px;
    grid-template-areas:
      'top top top top top top top'
      'weekDay weekDay weekDay weekDay weekDay weekDay weekDay'
      'cal cal cal cal cal cal cal';
    padding: 1rem;
    border-radius: 0.8rem;
    transition: background 200ms ease;

    .white {
      color: white;
      transition: color 200ms ease;
    }
    .accent {
      color: v(datePicker-accent);
      transition: color 200ms ease;
    }

    .top {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      grid-area: top;

      .arrow {
        cursor: pointer;
        background: none;
        outline: none;
        border: none;
      }
    }

    .weekDayNames {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      grid-area: weekDay;

      .dayName {
        font-size: 10px;
        color: v(light);
        transition: color 200ms ease;
        text-align: center;
        width: 100%;
        color: white;
        //this
      }
    }

    .cal {
      grid-area: cal;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 15px;
      grid-auto-flow: row;
      place-items: center;
      row-gap: 16px;

      p {
        margin: 0;
        padding: 0;
        text-align: center;
        cursor: pointer;
        width: 100%;

        &.cur-month {
          color: v(light);
          transition: color 200ms ease;
        }

        &.cur-month.selected {
          position: relative;
          z-index: 5;

          &:hover {
            color: white;
          }
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            bottom: 0;
            height: 175%;
            width: 100%;
            transform: translateY(-58%);
            background: v(calSelected);
            transition: background 200ms ease;
            z-index: -1;
            border-radius: 5px;
          }
        }

        &.prev-month,
        &.next-month {
          color: #343853;
        }

        &:hover {
          color: v(accent);
          transition: color 200ms ease;
        }
      }
    }
  }
</style>

<div class="calendar">
  <div class="top">
    <button type="button" class="back-arrow arrow accent" on:click={goBack}>
      <img src="./assets/icon-arrow-left.svg" alt="" />
    </button>
    <p class="selectedMonthYear white">{monthYearEl}</p>
    <button
      type="button"
      class="forward-arrow arrow accent"
      on:click={goForward}>
      <img src="./assets/icon-arrow-right.svg" alt="" />
    </button>
  </div>
  <div class="weekDayNames">
    <p class="dayName">M</p>
    <p class="dayName">T</p>
    <p class="dayName">W</p>
    <p class="dayName">T</p>
    <p class="dayName">F</p>
    <p class="dayName">S</p>
    <p class="dayName">S</p>
  </div>
  <div class="cal">test</div>
</div>
