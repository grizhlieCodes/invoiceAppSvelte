<script>
  import { onMount } from 'svelte'
  import pickedDate from '../../stores/pickedDate.js'
  import { fly } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let existingDate

  let calendar
  //Basic Data
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
  const totalDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  //Core Date Variables
  let date = existingDate ? existingDate : new Date()
  let selectedDate = $pickedDate ? $pickedDate : date
  $: year = selectedDate.getFullYear()
  $: monthIndex = selectedDate.getMonth()
  $: monthName = monthNames[monthIndex].substring(0, 3)
  $: firstDayIndexOfMonth = new Date(year, monthIndex, 1).getDay() - 1 //Adjust for Sun -> Mon
  $: normalFirstDayIndexOfMonth =
    firstDayIndexOfMonth === -1 ? 6 : firstDayIndexOfMonth //Adjust for Sun -> Mon
  $: prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1 //If Jan -> Dec, swap -1 with 11 for Dec.
  $: totalDaysPrevMonth = totalDayInMonth[prevMonthIndex]
  $: totalDaysToLoop = totalDaysPrevMonth - normalFirstDayIndexOfMonth //30 - 5 = 25
  $: lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDay() //1 (Sun -> Sat)
  $: totalDaysToLoopFront = 7 - lastDayOfMonth
  let clickedDate
  let chosenDateDay = selectedDate.getDate()
  let chosenDateMonthIndex = selectedDate.getMonth()

  function renderCalendar() {
    calendar.innerHTML = ''
    for (let i = totalDaysPrevMonth; i > totalDaysToLoop; i--) {
      let day = document.createElement('p')
      day.classList.add('prev-month')
      day.textContent = i
      calendar.prepend(day)
    }

    for (let i = 1; i <= totalDayInMonth[monthIndex]; i++) {
      let day = document.createElement('p')
      day.classList.add('cur-month')
      day.textContent = i
      if (i == chosenDateDay && chosenDateMonthIndex == monthIndex) {
        day.classList.add('selected')
      }
      calendar.append(day)
    }

    for (let i = 1; i <= totalDaysToLoopFront; i++) {
      let day = document.createElement('p')
      day.classList.add('next-month')
      day.textContent = i
      calendar.append(day)
    }
  }

  $: onMount(async () => {
    calendar = document.querySelector('.calendar')
    renderCalendar()

    calendar.addEventListener('click', (e) => {
      let el = e.target
      let elIsCurrentMonth = el.classList.contains('cur-month')

      if (elIsCurrentMonth) {
        chosenDateDay = parseInt(el.textContent, 10)
        // let chosenDateMonthIndex = monthIndex
        clickedDate = new Date(year, monthIndex, chosenDateDay)

        setTimeout(() => {
          renderCalendar()
        }, 0)

        pickedDate.updateSelectedDate(clickedDate)
        dispatch('updateInvoiceDate', {
          date: clickedDate,
        })
        dispatch('closeDatepicker')
      }
    })
  })

  const nextMonth = () => {
    let nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1
    let yearIndex = nextMonthIndex === 0 ? year + 1 : year
    selectedDate = new Date(yearIndex, nextMonthIndex, 1)
    setTimeout(() => {
      renderCalendar()
    }, 0)
  }

  const previousMonth = () => {
    let previousMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1
    let yearIndex = previousMonthIndex === 11 ? year - 1 : year
    selectedDate = new Date(yearIndex, previousMonthIndex, 1)
    setTimeout(() => {
      renderCalendar()
    }, 0)
  }
</script>

<style lang="scss">
  //Main Grid Area + Main container styling
  .calendar-container {
    background: v(datePicker-bg);
    width: 240px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: min-content min-content 1fr;
    grid-template-areas:
      'calHead calHead calHead calHead calHead calHead calHead'
      'weekDay weekDay weekDay weekDay weekDay weekDay weekDay'
      'cal cal cal cal cal cal cal';
    padding: 2.5rem 2rem;
    font-weight: v(font-bold);
    border-radius: 0.8rem;
    margin-top: 1.6rem;

    .calendar__header {
      grid-area: calHead;
    }
    .weekDays {
      grid-area: weekDay;
    }
    .calendar {
      grid-area: cal;
    }
  }

  .calendar__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    button {
      outline: none;
      background: none;
      border: none;
      cursor: pointer;
    }

    .selectedMonth {
      color: v(datePicker-normal-text-col);
    }
  }

  .weekDays {
    color: v(datePicker-normal-text-col);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    margin-bottom: 2.3rem;

    .dayName {
      width: 100%;
      text-align: center;
    }
  }

  .calendar {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: min-content;
    grid-auto-flow: row;
    place-items: center;
    // row-gap: 16px;
    color: v(datePicker-normal-text-col);

    :global(p.prev-month, p.next-month) {
      color: v(datePicker-grey-text-col);
    }

    :global(p.prev-month, p.next-month, p.cur-month) {
      margin: 0;
      // padding: 0;
      text-align: center;
      cursor: pointer;
      width: 100%;
      padding: 0.8rem 0 0.5rem;
      margin-bottom: 0.3rem;
      border-radius: 4px;
    }
    :global(p.cur-month.selected) {
      background: v(datePicker-accent);
      color: v(white);
    }
  }
</style>

<div class="calendar-container" transition:fly={{ y: -50, duration: 250 }}>

  <div class="calendar__header">
    <button type="button" class="back-arrow arrow" on:click={previousMonth}>
      <img src="./assets/icon-arrow-left.svg" alt="left arrow" />
    </button>
    <p class="selectedMonth">{monthName} {year}</p>
    <button type="button" class="forward-arrow arrow" on:click={nextMonth}>
      <img src="./assets/icon-arrow-right.svg" alt="right arrow" />
    </button>
  </div>

  <div class="weekDays">
    <p class="dayName">M</p>
    <p class="dayName">T</p>
    <p class="dayName">W</p>
    <p class="dayName">T</p>
    <p class="dayName">F</p>
    <p class="dayName">S</p>
    <p class="dayName">S</p>
  </div>
  <div class="calendar" />
</div>
